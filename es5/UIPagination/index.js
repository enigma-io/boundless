'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UISegmentedControl = require('../UISegmentedControl');

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require('../UIArrowKeyNavigation');

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require('../UIUtils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A utility view for paging the display of many data items of varying sizes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPagination
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
            data: _this.props.data
        }, _this.mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Item.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    };

    Item.prototype.waitForContentIfNecessary = function waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.mounted && this.state.data === promise) {
                    this.setState({ data: value });
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    };

    Item.prototype.componentDidMount = function componentDidMount() {
        this.mounted = true;
        this.waitForContentIfNecessary();
    };

    Item.prototype.componentDidUpdate = function componentDidUpdate() {
        this.waitForContentIfNecessary();
    };

    Item.prototype.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;
    };

    Item.prototype.getClasses = function getClasses(extraClasses) {
        return (0, _classnames2.default)({
            'ui-pagination-item': true,
            'ui-pagination-item-even': this.props.even,
            'ui-pagination-item-odd': !this.props.even,
            'ui-pagination-item-loading': this.state.data instanceof Promise
        }) + (extraClasses ? ' ' + extraClasses : '');
    };

    Item.prototype.render = function render() {
        if (this.state.data instanceof Promise) {
            return _react2.default.createElement(
                'div',
                _extends({}, (0, _lodash2.default)(this.props, Item.internal_keys), { className: this.getClasses() }),
                this.props.loadingContent
            );
        }

        var jsx = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

        return _react2.default.cloneElement(jsx, _extends({}, (0, _lodash2.default)(this.props, Item.internal_keys), {
            className: this.getClasses(jsx.props.className),
            'data-index': this.props.index
        }));
    };

    return Item;
}(_react2.default.Component);

Item.propTypes = {
    even: _react.PropTypes.bool,
    data: _react.PropTypes.object,
    dataToJSXConverterFunc: _react.PropTypes.func,
    index: _react.PropTypes.number,
    loadingContent: _react.PropTypes.node
};
Item.internal_keys = Object.keys(Item.propTypes);

var UIPagination = function (_UIView) {
    _inherits(UIPagination, _UIView);

    function UIPagination() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this2), _this2.state = {
            currentPage: _this2.props.initialPage,
            targetIndex: (_this2.props.initialPage - 1) * _this2.props.numItemsPerPage
        }, _this2.currentPage = function () {
            return _this2.state.currentPage;
        }, _this2.getPageForIndex = function (index) {
            var itemsPerPage = arguments.length <= 1 || arguments[1] === undefined ? _this2.props.numItemsPerPage : arguments[1];
            return Math.ceil((index + 1) / itemsPerPage);
        }, _this2.totalPages = function () {
            return Math.ceil(_this2.props.totalItems / _this2.props.numItemsPerPage);
        }, _this2.firstVisibleItemIndex = function () {
            return (_this2.currentPage() - 1) * _this2.props.numItemsPerPage;
        }, _this2.pageToIndex = function (i) {
            if (i < 0 || i >= _this2.props.totalItems) {
                return new Error('Cannot page to invalid index ' + i + '.');
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(i),
                targetIndex: i
            });
        }, _this2.handleClick = function (value) {
            var nextTargetIndex = void 0;

            switch (value) {
                case UIPagination.controls.FIRST:
                    nextTargetIndex = 0;
                    break;
                case UIPagination.controls.PREVIOUS:
                    nextTargetIndex = _this2.firstVisibleItemIndex() - _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.NEXT:
                    nextTargetIndex = _this2.firstVisibleItemIndex() + _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.LAST:
                    nextTargetIndex = _this2.props.totalItems - 1;
                    break;
                default:
                    nextTargetIndex = parseInt(value, 10) * _this2.props.numItemsPerPage - 1;
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(nextTargetIndex),
                targetIndex: nextTargetIndex
            });
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    UIPagination.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.currentPage()) {
            (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
        }
    };

    UIPagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var nextTargetIndex = nextProps.identifier === this.props.identifier ? this.state.targetIndex : 0;

        this.setState({
            currentPage: this.getPageForIndex(nextTargetIndex, nextProps.numItemsPerPage),
            targetIndex: nextTargetIndex
        });
    };

    UIPagination.prototype.createPageButtonOptions = function createPageButtonOptions() {
        var options = [];
        var currentPage = this.currentPage();
        var numPageToggles = this.props.numPageToggles;
        var totalPages = this.totalPages();
        var startPage = currentPage - (currentPage - 1) % numPageToggles;
        var endPage = Math.min(startPage + numPageToggles - 1, totalPages);

        if (this.props.showPaginationState) {
            options.push({
                selected: false,
                content: typeof this.props.showPaginationState === 'function' ? this.props.showPaginationState(currentPage, totalPages) : currentPage + ' of ' + totalPages,
                value: '',
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-state'
            });
        }

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlContent,
                value: UIPagination.controls.FIRST,
                disabled: this.currentPage() === 1,
                className: 'ui-pagination-control ui-pagination-control-first'
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlContent,
            value: UIPagination.controls.PREVIOUS,
            disabled: this.currentPage() === 1,
            className: 'ui-pagination-control ui-pagination-control-previous'
        });

        for (var i = startPage; i <= endPage; i++) {
            options.push({
                className: 'ui-pagination-control',
                'data-page-number': i,
                selected: i === this.currentPage(),
                content: i,
                value: i
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlContent,
            value: UIPagination.controls.NEXT,
            disabled: this.currentPage() === totalPages,
            className: 'ui-pagination-control ui-pagination-control-next'
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlContent,
                value: UIPagination.controls.LAST,
                disabled: this.currentPage() === totalPages,
                className: 'ui-pagination-control ui-pagination-control-last'
            });
        }

        if (this.props.customControlContent) {
            options.push({
                selected: false,
                content: this.props.customControlContent,
                value: (0, _uuid2.default)(),
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-custom'
            });
        }

        return options;
    };

    UIPagination.prototype.generateItems = function generateItems() {
        var generatedItems = [];
        var firstItemIndex = this.firstVisibleItemIndex();
        var lastItemIndex = Math.min(this.props.totalItems, firstItemIndex + this.props.numItemsPerPage) - 1;

        for (var i = firstItemIndex; i <= lastItemIndex; i += 1) {
            generatedItems.push({ data: this.props.getItem(i) });
        }

        return generatedItems;
    };

    UIPagination.prototype.renderItems = function renderItems() {
        var _cx,
            _this3 = this;

        var props = this.props.listWrapperProps;
        var indexOffset = this.props.numItemsPerPage * (this.currentPage() - 1);

        return _react2.default.createElement(
            _UIArrowKeyNavigation2.default,
            _extends({}, props, {
                ref: 'itemList',
                className: (0, _classnames2.default)((_cx = {
                    'ui-pagination-items': true
                }, _cx[props.className] = !!props.className, _cx)) }),
            this.generateItems().map(function (item, index) {
                return _react2.default.createElement(Item, {
                    ref: 'item_' + index,
                    key: index,
                    data: item.data,
                    dataToJSXConverterFunc: _this3.props.itemToJSXConverterFunc,
                    even: index % 2 === 0,
                    index: indexOffset + index,
                    loadingContent: _this3.props.itemLoadingContent });
            })
        );
    };

    UIPagination.prototype.renderControls = function renderControls(position) {
        var _cx2;

        if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        var props = this.props.toggleWrapperProps;
        var position_lower = position.toLowerCase();
        var position_capitalized = position_lower[0].toUpperCase() + position_lower.slice(1);

        return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, props, {
            ref: 'segmentedControl' + position_capitalized,
            className: (0, _classnames2.default)((_cx2 = {
                'ui-pagination-controls': true
            }, _cx2['ui-pagination-controls-' + position_lower] = true, _cx2[props.className] = !!props.className, _cx2)),
            options: this.createPageButtonOptions(),
            onOptionSelected: this.handleClick }));
    };

    UIPagination.prototype.renderView = function renderView() {
        var props = this.props;

        var position = UIPagination.positions;

        return _react2.default.createElement(
            'div',
            {
                ref: 'paginatedView',
                className: 'ui-pagination' },
            props.position === position.ABOVE || props.position === position.BOTH ? this.renderControls(position.ABOVE) : _noop2.default,
            this.renderItems(),
            props.position === position.BELOW || props.position === position.BOTH ? this.renderControls(position.BELOW) : _noop2.default
        );
    };

    UIPagination.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UIPagination.internal_keys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-pagination-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

    return UIPagination;
}(_UIView3.default);

UIPagination.controls = {
    FIRST: 'FIRST',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    LAST: 'LAST'
};
UIPagination.positions = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BOTH: 'BOTH'
};
UIPagination.propTypes = {
    customControlContent: _react.PropTypes.node,
    getItem: _react.PropTypes.func,
    hidePagerIfNotNeeded: _react.PropTypes.bool,
    identifier: _react.PropTypes.string.isRequired,

    initialPage: function validateInitialPage(props) {
        if (!Number.isInteger(props.initialPage)) {
            return new Error('`initialPage` must be an integer.');
        }

        var numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.initialPage < 1 || props.initialPage > numberOfPages) {
            return new Error('`initialPage` must be between 1 and ' + numberOfPages + '.');
        }
    },

    itemLoadingContent: _react.PropTypes.node,
    itemToJSXConverterFunc: _react.PropTypes.func,
    jumpToFirstControlContent: _react.PropTypes.node,
    jumpToLastControlContent: _react.PropTypes.node,
    listWrapperProps: _react.PropTypes.object,
    nextPageControlContent: _react.PropTypes.node,

    numItemsPerPage: function validateNumItemsPerPage(props) {
        if (!Number.isInteger(props.numItemsPerPage)) {
            return new Error('`numItemsPerPage` must be an integer.');
        } else if (props.numItemsPerPage < 1) {
            return new Error('`numItemsPerPage` must be greater than zero.');
        }
    },

    numPageToggles: _react.PropTypes.number,
    position: _react.PropTypes.oneOf(Object.keys(UIPagination.positions)),
    previousPageControlContent: _react.PropTypes.node,
    showJumpToFirst: _react.PropTypes.bool,
    showJumpToLast: _react.PropTypes.bool,
    showPaginationState: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
    toggleWrapperProps: _react.PropTypes.object,
    totalItems: _react.PropTypes.number.isRequired
};
UIPagination.internal_keys = Object.keys(UIPagination.propTypes);
UIPagination.defaultProps = {
    getItem: _noop2.default,
    hidePagerIfNotNeeded: false,
    initialPage: 1,
    itemToJSXConverterFunc: function itemToJSXConverterFunc(data) {
        return data;
    },
    jumpToFirstControlContent: '« First',
    jumpToLastControlContent: 'Last »',
    listWrapperProps: {},
    nextPageControlContent: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    position: UIPagination.positions.ABOVE,
    previousPageControlContent: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    toggleWrapperProps: {}
};
exports.default = UIPagination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUGFnaW5hdGlvbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQWRBOzs7OztJQWdCTSxJOzs7Ozs7Ozs7Ozs7NEpBV0YsSyxHQUFRO0FBQ0osa0JBQU0sTUFBSyxLQUFMLENBQVc7QUFEYixTLFFBSVIsTyxHQUFVLEs7OzttQkFFVix5QixzQ0FBMEIsUyxFQUFXO0FBQ2pDLFlBQUksVUFBVSxJQUFWLEtBQW1CLEtBQUssS0FBTCxDQUFXLElBQWxDLEVBQXdDO0FBQ3BDLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQU0sVUFBVSxJQUFqQixFQUFkO0FBQ0g7QUFDSixLOzttQkFFRCx5Qix3Q0FBNEI7QUFDeEIsWUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLFlBQTJCLE9BQS9CLEVBQXdDO0FBQ3BDLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQXFCLFNBQVMscUJBQVQsQ0FBK0IsT0FBL0IsRUFBd0MsS0FBeEMsRUFBK0M7QUFDaEUsb0JBQUksS0FBSyxPQUFMLElBQWdCLEtBQUssS0FBTCxDQUFXLElBQVgsS0FBb0IsT0FBeEMsRUFBaUQ7QUFDN0MseUJBQUssUUFBTCxDQUFjLEVBQUMsTUFBTSxLQUFQLEVBQWQ7QUFDSCxpQkFIK0QsQ0FHOUQ7QUFDTCxhQUpvQixDQUluQixJQUptQixDQUlkLElBSmMsRUFJUixLQUFLLEtBQUwsQ0FBVyxJQUpILENBQXJCO0FBS0g7QUFDSixLOzttQkFFRCxpQixnQ0FBb0I7QUFDaEIsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUsseUJBQUw7QUFDSCxLOzttQkFFRCxrQixpQ0FBcUI7QUFDakIsYUFBSyx5QkFBTDtBQUNILEs7O21CQUVELG9CLG1DQUF1QjtBQUNuQixhQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0gsSzs7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bENLO0FBbUNmLGdDQUE0QixpQkFBVSxJQW5DdkI7QUFvQ2YscUJBQWlCLGlCQUFVLElBcENaO0FBcUNmLG9CQUFnQixpQkFBVSxJQXJDWDtBQXNDZix5QkFBcUIsaUJBQVUsU0FBVixDQUFvQixDQUNyQyxpQkFBVSxJQUQyQixFQUVyQyxpQkFBVSxJQUYyQixDQUFwQixDQXRDTjtBQTBDZix3QkFBb0IsaUJBQVUsTUExQ2Y7QUEyQ2YsZ0JBQVksaUJBQVUsTUFBVixDQUFpQjtBQTNDZCxDO0FBZEYsWSxDQTREVixhLEdBQWdCLE9BQU8sSUFBUCxDQUFZLGFBQWEsU0FBekIsQztBQTVETixZLENBOERWLFksR0FBZTtBQUNsQiwyQkFEa0I7QUFFbEIsMEJBQXNCLEtBRko7QUFHbEIsaUJBQWEsQ0FISztBQUlsQiw0QkFBd0I7QUFBQSxlQUFRLElBQVI7QUFBQSxLQUpOO0FBS2xCLCtCQUEyQixTQUxUO0FBTWxCLDhCQUEwQixRQU5SO0FBT2xCLHNCQUFrQixFQVBBO0FBUWxCLDRCQUF3QixRQVJOO0FBU2xCLHFCQUFpQixFQVRDO0FBVWxCLG9CQUFnQixDQVZFO0FBV2xCLGNBQVUsYUFBYSxTQUFiLENBQXVCLEtBWGY7QUFZbEIsZ0NBQTRCLFlBWlY7QUFhbEIscUJBQWlCLElBYkM7QUFjbEIsb0JBQWdCLElBZEU7QUFlbEIsd0JBQW9CO0FBZkYsQztrQkE5REwsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSB1dGlsaXR5IHZpZXcgZm9yIHBhZ2luZyB0aGUgZGlzcGxheSBvZiBtYW55IGRhdGEgaXRlbXMgb2YgdmFyeWluZyBzaXplcy5cbiAqIEBjbGFzcyBVSVBhZ2luYXRpb25cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSVNlZ21lbnRlZENvbnRyb2wgZnJvbSAnLi4vVUlTZWdtZW50ZWRDb250cm9sJztcbmltcG9ydCBVSUFycm93S2V5TmF2aWdhdGlvbiBmcm9tICcuLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgZXZlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGRhdGE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGRhdGFUb0pTWENvbnZlcnRlckZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgbG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoSXRlbS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgIH1cblxuICAgIG1vdW50ZWQgPSBmYWxzZVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IG5leHRQcm9wcy5kYXRhfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldEl0ZW1EYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91bnRlZCAmJiB0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1ldmVuJzogdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSxcbiAgICAgICAgfSkgKyAoZXh0cmFDbGFzc2VzID8gJyAnICsgZXh0cmFDbGFzc2VzIDogJycpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsX2tleXMpfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubG9hZGluZ0NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QganN4ID0gdGhpcy5wcm9wcy5kYXRhVG9KU1hDb252ZXJ0ZXJGdW5jKHRoaXMuc3RhdGUuZGF0YSwgdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChqc3gsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbF9rZXlzKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc2VzKGpzeC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiB0aGlzLnByb3BzLmluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUGFnaW5hdGlvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGNvbnRyb2xzID0ge1xuICAgICAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICAgICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgICAgIE5FWFQ6ICdORVhUJyxcbiAgICAgICAgTEFTVDogJ0xBU1QnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvbnMgPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQk9USDogJ0JPVEgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGN1c3RvbUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgICAgIGluaXRpYWxQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZUluaXRpYWxQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMuaW5pdGlhbFBhZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5pbml0aWFsUGFnZSA8IDEgfHwgcHJvcHMuaW5pdGlhbFBhZ2UgPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIG51bWJlck9mUGFnZXMgKyAnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGl0ZW1Mb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG5cbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMpKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGdldEl0ZW06IG5vb3AsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBmYWxzZSxcbiAgICAgICAgaW5pdGlhbFBhZ2U6IDEsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IGRhdGEgPT4gZGF0YSxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogJ8KrIEZpcnN0JyxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiAnTGFzdCDCuycsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiAnTmV4dCDigLonLFxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgICAgICBudW1QYWdlVG9nZ2xlczogNSxcbiAgICAgICAgcG9zaXRpb246IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMuQUJPVkUsXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiAn4oC5IFByZXZpb3VzJyxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogdHJ1ZSxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UsXG4gICAgICAgIHRhcmdldEluZGV4OiAodGhpcy5wcm9wcy5pbml0aWFsUGFnZSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UgPSAoKSA9PiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlXG4gICAgZ2V0UGFnZUZvckluZGV4ID0gKGluZGV4LCBpdGVtc1BlclBhZ2UgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT4gTWF0aC5jZWlsKChpbmRleCArIDEpIC8gaXRlbXNQZXJQYWdlKVxuICAgIHRvdGFsUGFnZXMgPSAoKSA9PiBNYXRoLmNlaWwodGhpcy5wcm9wcy50b3RhbEl0ZW1zIC8gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpXG5cbiAgICBmaXJzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiAodGhpcy5jdXJyZW50UGFnZSgpIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmIChwcmV2U3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuY3VycmVudFBhZ2UoKSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGNvbnN0IG5leHRUYXJnZXRJbmRleCA9IG5leHRQcm9wcy5pZGVudGlmaWVyID09PSB0aGlzLnByb3BzLmlkZW50aWZpZXIgPyB0aGlzLnN0YXRlLnRhcmdldEluZGV4IDogMDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgsIG5leHRQcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFnZVRvSW5kZXggPSBpID0+IHtcbiAgICAgICAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBDYW5ub3QgcGFnZSB0byBpbnZhbGlkIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChpKSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UoKTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy50b3RhbFBhZ2VzKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCB0b3RhbFBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAgIHR5cGVvZiB0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZShjdXJyZW50UGFnZSwgdG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2N1cnJlbnRQYWdlfSBvZiAke3RvdGFsUGFnZXN9YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1zdGF0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5jdXJyZW50UGFnZSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1dWlkKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1jdXN0b20nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnByb3BzLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV4dFRhcmdldEluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSAtIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMucHJvcHMudG90YWxJdGVtcyAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHBhcnNlSW50KHZhbHVlLCAxMCkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBpbmRleE9mZnNldCA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdlbmVyYXRlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUb0pTWENvbnZlcnRlckZ1bmM9e3RoaXMucHJvcHMuaXRlbVRvSlNYQ29udmVydGVyRnVuY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4T2Zmc2V0ICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0NvbnRlbnQ9e3RoaXMucHJvcHMuaXRlbUxvYWRpbmdDb250ZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbl9sb3dlciA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uX2NhcGl0YWxpemVkID0gcG9zaXRpb25fbG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uX2xvd2VyLnNsaWNlKDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17YHNlZ21lbnRlZENvbnRyb2wke3Bvc2l0aW9uX2NhcGl0YWxpemVkfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wYWdpbmF0aW9uLWNvbnRyb2xzLSR7cG9zaXRpb25fbG93ZXJ9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBhZ2luYXRpb24uaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19