'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isinteger');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.omit');

var _lodash4 = _interopRequireDefault(_lodash3);

var _UISegmentedControl = require('../UISegmentedControl');

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require('../UIArrowKeyNavigation');

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

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
                _extends({}, (0, _lodash4.default)(this.props, Item.internalKeys), { className: this.getClasses() }),
                this.props.loadingContent
            );
        }

        var jsx = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

        return _react2.default.cloneElement(jsx, _extends({}, (0, _lodash4.default)(this.props, Item.internalKeys), {
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
Item.internalKeys = Object.keys(Item.propTypes);

var UIPagination = function (_React$PureComponent) {
    _inherits(UIPagination, _React$PureComponent);

    function UIPagination() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this2), _this2.state = {
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

    UIPagination.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        var _this3 = this;

        var oldProps = this.props;

        // use transactional `setState()` syntax to ensure that pending state updates are honored,
        // like those from `pageToIndex()`
        this.setState(function (state, props) {
            // NOTE: `props` here is technically the `nextProps` you'd receive from the first cWRP argument
            // so that's why we're caching `oldProps` outside the `setState`
            if (props.identifier !== oldProps.identifier) {
                return {
                    currentPage: 1,
                    targetIndex: 0
                };
            }

            return {
                currentPage: _this3.getPageForIndex(state.targetIndex, props.numItemsPerPage),
                targetIndex: state.targetIndex
            };
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
                content: (0, _isFunction2.default)(this.props.showPaginationState) ? this.props.showPaginationState(currentPage, totalPages) : currentPage + ' of ' + totalPages,
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
            _this4 = this;

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
                    dataToJSXConverterFunc: _this4.props.itemToJSXConverterFunc,
                    even: index % 2 === 0,
                    index: indexOffset + index,
                    loadingContent: _this4.props.itemLoadingContent });
            })
        );
    };

    UIPagination.prototype.renderControls = function renderControls(position) {
        var _cx2;

        if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        var props = this.props.toggleWrapperProps;
        var positionLower = position.toLowerCase();
        var positionCapitalized = positionLower[0].toUpperCase() + positionLower.slice(1);

        return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, props, {
            ref: 'segmentedControl' + positionCapitalized,
            className: (0, _classnames2.default)((_cx2 = {
                'ui-pagination-controls': true
            }, _cx2['ui-pagination-controls-' + positionLower] = true, _cx2[props.className] = !!props.className, _cx2)),
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
            _extends({}, (0, _lodash4.default)(this.props, UIPagination.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-pagination-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

    return UIPagination;
}(_react2.default.PureComponent);

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
        if ((0, _lodash2.default)(props.initialPage) === false) {
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
        if ((0, _lodash2.default)(props.numItemsPerPage) === false) {
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
UIPagination.internalKeys = Object.keys(UIPagination.propTypes);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUGFnaW5hdGlvbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJJdGVtIiwic3RhdGUiLCJkYXRhIiwicHJvcHMiLCJtb3VudGVkIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInNldFN0YXRlIiwid2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSIsIlByb21pc2UiLCJ0aGVuIiwiY2F1dGlvdXNseVNldEl0ZW1EYXRhIiwicHJvbWlzZSIsInZhbHVlIiwiYmluZCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJnZXRDbGFzc2VzIiwiZXh0cmFDbGFzc2VzIiwiZXZlbiIsInJlbmRlciIsImludGVybmFsS2V5cyIsImxvYWRpbmdDb250ZW50IiwianN4IiwiZGF0YVRvSlNYQ29udmVydGVyRnVuYyIsImluZGV4IiwiY2xvbmVFbGVtZW50IiwiY2xhc3NOYW1lIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiYm9vbCIsIm9iamVjdCIsImZ1bmMiLCJudW1iZXIiLCJub2RlIiwiT2JqZWN0Iiwia2V5cyIsIlVJUGFnaW5hdGlvbiIsImN1cnJlbnRQYWdlIiwiaW5pdGlhbFBhZ2UiLCJ0YXJnZXRJbmRleCIsIm51bUl0ZW1zUGVyUGFnZSIsImdldFBhZ2VGb3JJbmRleCIsIml0ZW1zUGVyUGFnZSIsIk1hdGgiLCJjZWlsIiwidG90YWxQYWdlcyIsInRvdGFsSXRlbXMiLCJmaXJzdFZpc2libGVJdGVtSW5kZXgiLCJwYWdlVG9JbmRleCIsImkiLCJFcnJvciIsImhhbmRsZUNsaWNrIiwibmV4dFRhcmdldEluZGV4IiwiY29udHJvbHMiLCJGSVJTVCIsIlBSRVZJT1VTIiwiTkVYVCIsIkxBU1QiLCJwYXJzZUludCIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsInJlZnMiLCJpdGVtXzAiLCJmb2N1cyIsIm9sZFByb3BzIiwiaWRlbnRpZmllciIsImNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zIiwib3B0aW9ucyIsIm51bVBhZ2VUb2dnbGVzIiwic3RhcnRQYWdlIiwiZW5kUGFnZSIsIm1pbiIsInNob3dQYWdpbmF0aW9uU3RhdGUiLCJwdXNoIiwic2VsZWN0ZWQiLCJjb250ZW50IiwiZGlzYWJsZWQiLCJzaG93SnVtcFRvRmlyc3QiLCJqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50IiwicHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQiLCJuZXh0UGFnZUNvbnRyb2xDb250ZW50Iiwic2hvd0p1bXBUb0xhc3QiLCJqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQiLCJjdXN0b21Db250cm9sQ29udGVudCIsImdlbmVyYXRlSXRlbXMiLCJnZW5lcmF0ZWRJdGVtcyIsImZpcnN0SXRlbUluZGV4IiwibGFzdEl0ZW1JbmRleCIsImdldEl0ZW0iLCJyZW5kZXJJdGVtcyIsImxpc3RXcmFwcGVyUHJvcHMiLCJpbmRleE9mZnNldCIsIm1hcCIsIml0ZW0iLCJpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jIiwiaXRlbUxvYWRpbmdDb250ZW50IiwicmVuZGVyQ29udHJvbHMiLCJwb3NpdGlvbiIsImhpZGVQYWdlcklmTm90TmVlZGVkIiwidG9nZ2xlV3JhcHBlclByb3BzIiwicG9zaXRpb25Mb3dlciIsInRvTG93ZXJDYXNlIiwicG9zaXRpb25DYXBpdGFsaXplZCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJyZW5kZXJWaWV3IiwicG9zaXRpb25zIiwiQUJPVkUiLCJCT1RIIiwiQkVMT1ciLCJQdXJlQ29tcG9uZW50Iiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsInZhbGlkYXRlSW5pdGlhbFBhZ2UiLCJudW1iZXJPZlBhZ2VzIiwidmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UiLCJvbmVPZiIsIm9uZU9mVHlwZSIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQWZBOzs7OztJQWlCTUEsSTs7Ozs7Ozs7Ozs7OzRKQVdGQyxLLEdBQVE7QUFDSkMsa0JBQU0sTUFBS0MsS0FBTCxDQUFXRDtBQURiLFMsUUFJUkUsTyxHQUFVLEs7OzttQkFFVkMseUIsc0NBQTBCQyxTLEVBQVc7QUFDakMsWUFBSUEsVUFBVUosSUFBVixLQUFtQixLQUFLQyxLQUFMLENBQVdELElBQWxDLEVBQXdDO0FBQ3BDLGlCQUFLSyxRQUFMLENBQWMsRUFBQ0wsTUFBTUksVUFBVUosSUFBakIsRUFBZDtBQUNIO0FBQ0osSzs7bUJBRURNLHlCLHdDQUE0QjtBQUN4QixZQUFJLEtBQUtQLEtBQUwsQ0FBV0MsSUFBWCxZQUEyQk8sT0FBL0IsRUFBd0M7QUFDcEMsaUJBQUtSLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQlEsSUFBaEIsQ0FBcUIsU0FBU0MscUJBQVQsQ0FBK0JDLE9BQS9CLEVBQXdDQyxLQUF4QyxFQUErQztBQUNoRSxvQkFBSSxLQUFLVCxPQUFMLElBQWdCLEtBQUtILEtBQUwsQ0FBV0MsSUFBWCxLQUFvQlUsT0FBeEMsRUFBaUQ7QUFDN0MseUJBQUtMLFFBQUwsQ0FBYyxFQUFDTCxNQUFNVyxLQUFQLEVBQWQ7QUFDSCxpQkFIK0QsQ0FHOUQ7QUFDTCxhQUpvQixDQUluQkMsSUFKbUIsQ0FJZCxJQUpjLEVBSVIsS0FBS2IsS0FBTCxDQUFXQyxJQUpILENBQXJCO0FBS0g7QUFDSixLOzttQkFFRGEsaUIsZ0NBQW9CO0FBQ2hCLGFBQUtYLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBS0kseUJBQUw7QUFDSCxLOzttQkFFRFEsa0IsaUNBQXFCO0FBQ2pCLGFBQUtSLHlCQUFMO0FBQ0gsSzs7bUJBRURTLG9CLG1DQUF1QjtBQUNuQixhQUFLYixPQUFMLEdBQWUsS0FBZjtBQUNILEs7O21CQUVEYyxVLHVCQUFXQyxZLEVBQWM7QUFDckIsZUFBTywwQkFBRztBQUNOLGtDQUFzQixJQURoQjtBQUVOLHVDQUEyQixLQUFLaEIsS0FBTCxDQUFXaUIsSUFGaEM7QUFHTixzQ0FBMEIsQ0FBQyxLQUFLakIsS0FBTCxDQUFXaUIsSUFIaEM7QUFJTiwwQ0FBOEIsS0FBS25CLEtBQUwsQ0FBV0MsSUFBWCxZQUEyQk87QUFKbkQsU0FBSCxLQUtEVSxlQUFlLE1BQU1BLFlBQXJCLEdBQW9DLEVBTG5DLENBQVA7QUFNSCxLOzttQkFFREUsTSxxQkFBUztBQUNMLFlBQUksS0FBS3BCLEtBQUwsQ0FBV0MsSUFBWCxZQUEyQk8sT0FBL0IsRUFBd0M7QUFDcEMsbUJBQ0k7QUFBQTtBQUFBLDZCQUFTLHNCQUFLLEtBQUtOLEtBQVYsRUFBaUJILEtBQUtzQixZQUF0QixDQUFULElBQThDLFdBQVcsS0FBS0osVUFBTCxFQUF6RDtBQUNLLHFCQUFLZixLQUFMLENBQVdvQjtBQURoQixhQURKO0FBS0g7O0FBRUQsWUFBTUMsTUFBTSxLQUFLckIsS0FBTCxDQUFXc0Isc0JBQVgsQ0FBa0MsS0FBS3hCLEtBQUwsQ0FBV0MsSUFBN0MsRUFBbUQsS0FBS0MsS0FBTCxDQUFXdUIsS0FBOUQsQ0FBWjs7QUFFQSxlQUFPLGdCQUFNQyxZQUFOLENBQW1CSCxHQUFuQixlQUNBLHNCQUFLLEtBQUtyQixLQUFWLEVBQWlCSCxLQUFLc0IsWUFBdEIsQ0FEQTtBQUVITSx1QkFBVyxLQUFLVixVQUFMLENBQWdCTSxJQUFJckIsS0FBSixDQUFVeUIsU0FBMUIsQ0FGUjtBQUdILDBCQUFjLEtBQUt6QixLQUFMLENBQVd1QjtBQUh0QixXQUFQO0FBS0gsSzs7O0VBdkVjLGdCQUFNRyxTOztBQUFuQjdCLEksQ0FDSzhCLFMsR0FBWTtBQUNmVixVQUFNLGlCQUFVVyxJQUREO0FBRWY3QixVQUFNLGlCQUFVOEIsTUFGRDtBQUdmUCw0QkFBd0IsaUJBQVVRLElBSG5CO0FBSWZQLFdBQU8saUJBQVVRLE1BSkY7QUFLZlgsb0JBQWdCLGlCQUFVWTtBQUxYLEM7QUFEakJuQyxJLENBU0tzQixZLEdBQWVjLE9BQU9DLElBQVAsQ0FBWXJDLEtBQUs4QixTQUFqQixDOztJQWlFTFEsWTs7Ozs7Ozs7Ozs7O3lLQWdGakJyQyxLLEdBQVE7QUFDSnNDLHlCQUFhLE9BQUtwQyxLQUFMLENBQVdxQyxXQURwQjtBQUVKQyx5QkFBYSxDQUFDLE9BQUt0QyxLQUFMLENBQVdxQyxXQUFYLEdBQXlCLENBQTFCLElBQStCLE9BQUtyQyxLQUFMLENBQVd1QztBQUZuRCxTLFNBS1JILFcsR0FBYztBQUFBLG1CQUFNLE9BQUt0QyxLQUFMLENBQVdzQyxXQUFqQjtBQUFBLFMsU0FDZEksZSxHQUFrQixVQUFDakIsS0FBRDtBQUFBLGdCQUFRa0IsWUFBUix5REFBdUIsT0FBS3pDLEtBQUwsQ0FBV3VDLGVBQWxDO0FBQUEsbUJBQXNERyxLQUFLQyxJQUFMLENBQVUsQ0FBQ3BCLFFBQVEsQ0FBVCxJQUFja0IsWUFBeEIsQ0FBdEQ7QUFBQSxTLFNBQ2xCRyxVLEdBQWE7QUFBQSxtQkFBTUYsS0FBS0MsSUFBTCxDQUFVLE9BQUszQyxLQUFMLENBQVc2QyxVQUFYLEdBQXdCLE9BQUs3QyxLQUFMLENBQVd1QyxlQUE3QyxDQUFOO0FBQUEsUyxTQUViTyxxQixHQUF3QjtBQUFBLG1CQUFNLENBQUMsT0FBS1YsV0FBTCxLQUFxQixDQUF0QixJQUEyQixPQUFLcEMsS0FBTCxDQUFXdUMsZUFBNUM7QUFBQSxTLFNBOEJ4QlEsVyxHQUFjLGFBQUs7QUFDZixnQkFBSUMsSUFBSSxDQUFKLElBQVNBLEtBQUssT0FBS2hELEtBQUwsQ0FBVzZDLFVBQTdCLEVBQXlDO0FBQ3JDLHVCQUFPLElBQUlJLEtBQUosbUNBQTBDRCxDQUExQyxPQUFQO0FBQ0g7O0FBRUQsbUJBQUs1QyxRQUFMLENBQWM7QUFDVmdDLDZCQUFhLE9BQUtJLGVBQUwsQ0FBcUJRLENBQXJCLENBREg7QUFFVlYsNkJBQWFVO0FBRkgsYUFBZDtBQUlILFMsU0E2RkRFLFcsR0FBYyxVQUFDeEMsS0FBRCxFQUFXO0FBQ3JCLGdCQUFJeUMsd0JBQUo7O0FBRUEsb0JBQVF6QyxLQUFSO0FBQ0EscUJBQUt5QixhQUFhaUIsUUFBYixDQUFzQkMsS0FBM0I7QUFDSUYsc0NBQWtCLENBQWxCO0FBQ0E7QUFDSixxQkFBS2hCLGFBQWFpQixRQUFiLENBQXNCRSxRQUEzQjtBQUNJSCxzQ0FBa0IsT0FBS0wscUJBQUwsS0FBK0IsT0FBSzlDLEtBQUwsQ0FBV3VDLGVBQTVEO0FBQ0E7QUFDSixxQkFBS0osYUFBYWlCLFFBQWIsQ0FBc0JHLElBQTNCO0FBQ0lKLHNDQUFrQixPQUFLTCxxQkFBTCxLQUErQixPQUFLOUMsS0FBTCxDQUFXdUMsZUFBNUQ7QUFDQTtBQUNKLHFCQUFLSixhQUFhaUIsUUFBYixDQUFzQkksSUFBM0I7QUFDSUwsc0NBQWtCLE9BQUtuRCxLQUFMLENBQVc2QyxVQUFYLEdBQXdCLENBQTFDO0FBQ0E7QUFDSjtBQUNJTSxzQ0FBa0JNLFNBQVMvQyxLQUFULEVBQWdCLEVBQWhCLElBQXNCLE9BQUtWLEtBQUwsQ0FBV3VDLGVBQWpDLEdBQW1ELENBQXJFO0FBZEo7O0FBaUJBLG1CQUFLbkMsUUFBTCxDQUFjO0FBQ1ZnQyw2QkFBYSxPQUFLSSxlQUFMLENBQXFCVyxlQUFyQixDQURIO0FBRVZiLDZCQUFhYTtBQUZILGFBQWQ7QUFJSCxTOzs7MkJBMUpEdEMsa0IsK0JBQW1CNkMsUyxFQUFXQyxTLEVBQVc7QUFDckMsWUFBSUEsVUFBVXZCLFdBQVYsS0FBMEIsS0FBS0EsV0FBTCxFQUE5QixFQUFrRDtBQUM5Qyx1Q0FBWSxLQUFLd0IsSUFBTCxDQUFVQyxNQUF0QixFQUE4QkMsS0FBOUI7QUFDSDtBQUNKLEs7OzJCQUVENUQseUIsd0NBQTRCO0FBQUE7O0FBQ3hCLFlBQU02RCxXQUFXLEtBQUsvRCxLQUF0Qjs7QUFFQTtBQUNBO0FBQ0EsYUFBS0ksUUFBTCxDQUFjLFVBQUNOLEtBQUQsRUFBUUUsS0FBUixFQUFrQjtBQUM1QjtBQUNBO0FBQ0EsZ0JBQUlBLE1BQU1nRSxVQUFOLEtBQXFCRCxTQUFTQyxVQUFsQyxFQUE4QztBQUMxQyx1QkFBTztBQUNINUIsaUNBQWEsQ0FEVjtBQUVIRSxpQ0FBYTtBQUZWLGlCQUFQO0FBSUg7O0FBRUQsbUJBQU87QUFDSEYsNkJBQWEsT0FBS0ksZUFBTCxDQUFxQjFDLE1BQU13QyxXQUEzQixFQUF3Q3RDLE1BQU11QyxlQUE5QyxDQURWO0FBRUhELDZCQUFheEMsTUFBTXdDO0FBRmhCLGFBQVA7QUFJSCxTQWREO0FBZUgsSzs7MkJBYUQyQix1QixzQ0FBMEI7QUFDdEIsWUFBTUMsVUFBVSxFQUFoQjtBQUNBLFlBQU05QixjQUFjLEtBQUtBLFdBQUwsRUFBcEI7QUFDQSxZQUFNK0IsaUJBQWlCLEtBQUtuRSxLQUFMLENBQVdtRSxjQUFsQztBQUNBLFlBQU12QixhQUFhLEtBQUtBLFVBQUwsRUFBbkI7QUFDQSxZQUFNd0IsWUFBWWhDLGNBQWUsQ0FBQ0EsY0FBYyxDQUFmLElBQW9CK0IsY0FBckQ7QUFDQSxZQUFNRSxVQUFVM0IsS0FBSzRCLEdBQUwsQ0FBU0YsWUFBWUQsY0FBWixHQUE2QixDQUF0QyxFQUF5Q3ZCLFVBQXpDLENBQWhCOztBQUVBLFlBQUksS0FBSzVDLEtBQUwsQ0FBV3VFLG1CQUFmLEVBQW9DO0FBQ2hDTCxvQkFBUU0sSUFBUixDQUFhO0FBQ1RDLDBCQUFVLEtBREQ7QUFFVEMseUJBQVcsMEJBQVcsS0FBSzFFLEtBQUwsQ0FBV3VFLG1CQUF0QixJQUNBLEtBQUt2RSxLQUFMLENBQVd1RSxtQkFBWCxDQUErQm5DLFdBQS9CLEVBQTRDUSxVQUE1QyxDQURBLEdBRUdSLFdBRkgsWUFFcUJRLFVBSnZCO0FBS1RsQyx1QkFBTyxFQUxFO0FBTVRpRSwwQkFBVSxJQU5EO0FBT1RsRCwyQkFBVztBQVBGLGFBQWI7QUFTSDs7QUFFRCxZQUFJLEtBQUt6QixLQUFMLENBQVc0RSxlQUFmLEVBQWdDO0FBQzVCVixvQkFBUU0sSUFBUixDQUFhO0FBQ1RDLDBCQUFVLEtBREQ7QUFFVEMseUJBQVMsS0FBSzFFLEtBQUwsQ0FBVzZFLHlCQUZYO0FBR1RuRSx1QkFBT3lCLGFBQWFpQixRQUFiLENBQXNCQyxLQUhwQjtBQUlUc0IsMEJBQVUsS0FBS3ZDLFdBQUwsT0FBdUIsQ0FKeEI7QUFLVFgsMkJBQVc7QUFMRixhQUFiO0FBT0g7O0FBRUR5QyxnQkFBUU0sSUFBUixDQUFhO0FBQ1RDLHNCQUFVLEtBREQ7QUFFVEMscUJBQVMsS0FBSzFFLEtBQUwsQ0FBVzhFLDBCQUZYO0FBR1RwRSxtQkFBT3lCLGFBQWFpQixRQUFiLENBQXNCRSxRQUhwQjtBQUlUcUIsc0JBQVUsS0FBS3ZDLFdBQUwsT0FBdUIsQ0FKeEI7QUFLVFgsdUJBQVc7QUFMRixTQUFiOztBQVFBLGFBQUssSUFBSXVCLElBQUlvQixTQUFiLEVBQXdCcEIsS0FBS3FCLE9BQTdCLEVBQXNDckIsR0FBdEMsRUFBMkM7QUFDdkNrQixvQkFBUU0sSUFBUixDQUFhO0FBQ1QvQywyQkFBVyx1QkFERjtBQUVULG9DQUFvQnVCLENBRlg7QUFHVHlCLDBCQUFVekIsTUFBTSxLQUFLWixXQUFMLEVBSFA7QUFJVHNDLHlCQUFTMUIsQ0FKQTtBQUtUdEMsdUJBQU9zQztBQUxFLGFBQWI7QUFPSDs7QUFFRGtCLGdCQUFRTSxJQUFSLENBQWE7QUFDVEMsc0JBQVUsS0FERDtBQUVUQyxxQkFBUyxLQUFLMUUsS0FBTCxDQUFXK0Usc0JBRlg7QUFHVHJFLG1CQUFPeUIsYUFBYWlCLFFBQWIsQ0FBc0JHLElBSHBCO0FBSVRvQixzQkFBVSxLQUFLdkMsV0FBTCxPQUF1QlEsVUFKeEI7QUFLVG5CLHVCQUFXO0FBTEYsU0FBYjs7QUFRQSxZQUFJLEtBQUt6QixLQUFMLENBQVdnRixjQUFmLEVBQStCO0FBQzNCZCxvQkFBUU0sSUFBUixDQUFhO0FBQ1RDLDBCQUFVLEtBREQ7QUFFVEMseUJBQVMsS0FBSzFFLEtBQUwsQ0FBV2lGLHdCQUZYO0FBR1R2RSx1QkFBT3lCLGFBQWFpQixRQUFiLENBQXNCSSxJQUhwQjtBQUlUbUIsMEJBQVUsS0FBS3ZDLFdBQUwsT0FBdUJRLFVBSnhCO0FBS1RuQiwyQkFBVztBQUxGLGFBQWI7QUFPSDs7QUFFRCxZQUFJLEtBQUt6QixLQUFMLENBQVdrRixvQkFBZixFQUFxQztBQUNqQ2hCLG9CQUFRTSxJQUFSLENBQWE7QUFDVEMsMEJBQVUsS0FERDtBQUVUQyx5QkFBUyxLQUFLMUUsS0FBTCxDQUFXa0Ysb0JBRlg7QUFHVHhFLHVCQUFPLHFCQUhFO0FBSVRpRSwwQkFBVSxJQUpEO0FBS1RsRCwyQkFBVztBQUxGLGFBQWI7QUFPSDs7QUFFRCxlQUFPeUMsT0FBUDtBQUNILEs7OzJCQUVEaUIsYSw0QkFBZ0I7QUFDWixZQUFNQyxpQkFBaUIsRUFBdkI7QUFDQSxZQUFNQyxpQkFBaUIsS0FBS3ZDLHFCQUFMLEVBQXZCO0FBQ0EsWUFBTXdDLGdCQUFnQjVDLEtBQUs0QixHQUFMLENBQVMsS0FBS3RFLEtBQUwsQ0FBVzZDLFVBQXBCLEVBQWdDd0MsaUJBQWlCLEtBQUtyRixLQUFMLENBQVd1QyxlQUE1RCxJQUErRSxDQUFyRzs7QUFFQSxhQUFLLElBQUlTLElBQUlxQyxjQUFiLEVBQTZCckMsS0FBS3NDLGFBQWxDLEVBQWlEdEMsS0FBSyxDQUF0RCxFQUF5RDtBQUNyRG9DLDJCQUFlWixJQUFmLENBQW9CLEVBQUN6RSxNQUFNLEtBQUtDLEtBQUwsQ0FBV3VGLE9BQVgsQ0FBbUJ2QyxDQUFuQixDQUFQLEVBQXBCO0FBQ0g7O0FBRUQsZUFBT29DLGNBQVA7QUFDSCxLOzsyQkE0QkRJLFcsMEJBQWM7QUFBQTtBQUFBOztBQUNWLFlBQU14RixRQUFRLEtBQUtBLEtBQUwsQ0FBV3lGLGdCQUF6QjtBQUNBLFlBQU1DLGNBQWMsS0FBSzFGLEtBQUwsQ0FBV3VDLGVBQVgsSUFBOEIsS0FBS0gsV0FBTCxLQUFxQixDQUFuRCxDQUFwQjs7QUFFQSxlQUNJO0FBQUE7QUFBQSx5QkFDUXBDLEtBRFI7QUFFSSxxQkFBSSxVQUZSO0FBR0ksMkJBQVc7QUFDUCwyQ0FBdUI7QUFEaEIsdUJBRU5BLE1BQU15QixTQUZBLElBRVksQ0FBQyxDQUFDekIsTUFBTXlCLFNBRnBCLE9BSGY7QUFPSyxpQkFBSzBELGFBQUwsR0FBcUJRLEdBQXJCLENBQXlCLFVBQUNDLElBQUQsRUFBT3JFLEtBQVAsRUFBaUI7QUFDdkMsdUJBQ0ksOEJBQUMsSUFBRDtBQUNJLG1DQUFhQSxLQURqQjtBQUVJLHlCQUFLQSxLQUZUO0FBR0ksMEJBQU1xRSxLQUFLN0YsSUFIZjtBQUlJLDRDQUF3QixPQUFLQyxLQUFMLENBQVc2RixzQkFKdkM7QUFLSSwwQkFBTXRFLFFBQVEsQ0FBUixLQUFjLENBTHhCO0FBTUksMkJBQU9tRSxjQUFjbkUsS0FOekI7QUFPSSxvQ0FBZ0IsT0FBS3ZCLEtBQUwsQ0FBVzhGLGtCQVAvQixHQURKO0FBVUgsYUFYQTtBQVBMLFNBREo7QUFzQkgsSzs7MkJBRURDLGMsMkJBQWVDLFEsRUFBVTtBQUFBOztBQUNyQixZQUFPLEtBQUtoRyxLQUFMLENBQVdpRyxvQkFBWCxJQUNBLEtBQUtqRyxLQUFMLENBQVc2QyxVQUFYLElBQXlCLEtBQUs3QyxLQUFMLENBQVd1QyxlQUQzQyxFQUM0RDtBQUN4RDtBQUNIOztBQUVELFlBQU12QyxRQUFRLEtBQUtBLEtBQUwsQ0FBV2tHLGtCQUF6QjtBQUNBLFlBQU1DLGdCQUFnQkgsU0FBU0ksV0FBVCxFQUF0QjtBQUNBLFlBQU1DLHNCQUFzQkYsY0FBYyxDQUFkLEVBQWlCRyxXQUFqQixLQUFpQ0gsY0FBY0ksS0FBZCxDQUFvQixDQUFwQixDQUE3RDs7QUFFQSxlQUNJLHlFQUNRdkcsS0FEUjtBQUVJLHNDQUF3QnFHLG1CQUY1QjtBQUdJLHVCQUFXO0FBQ1AsMENBQTBCO0FBRG5CLGdEQUVvQkYsYUFGcEIsSUFFc0MsSUFGdEMsT0FHTm5HLE1BQU15QixTQUhBLElBR1ksQ0FBQyxDQUFDekIsTUFBTXlCLFNBSHBCLFFBSGY7QUFRSSxxQkFBUyxLQUFLd0MsdUJBQUwsRUFSYjtBQVNJLDhCQUFrQixLQUFLZixXQVQzQixJQURKO0FBWUgsSzs7MkJBRURzRCxVLHlCQUFhO0FBQUEsWUFDRnhHLEtBREUsR0FDTyxJQURQLENBQ0ZBLEtBREU7O0FBRVQsWUFBTWdHLFdBQVc3RCxhQUFhc0UsU0FBOUI7O0FBRUEsZUFDSTtBQUFBO0FBQUE7QUFDSSxxQkFBSSxlQURSO0FBRUksMkJBQVUsZUFGZDtBQUlXekcsa0JBQU1nRyxRQUFOLEtBQW1CQSxTQUFTVSxLQUE1QixJQUFxQzFHLE1BQU1nRyxRQUFOLEtBQW1CQSxTQUFTVyxJQUFsRSxHQUNBLEtBQUtaLGNBQUwsQ0FBb0JDLFNBQVNVLEtBQTdCLENBREEsaUJBSlY7QUFTSyxpQkFBS2xCLFdBQUwsRUFUTDtBQVlXeEYsa0JBQU1nRyxRQUFOLEtBQW1CQSxTQUFTWSxLQUE1QixJQUFxQzVHLE1BQU1nRyxRQUFOLEtBQW1CQSxTQUFTVyxJQUFsRSxHQUNBLEtBQUtaLGNBQUwsQ0FBb0JDLFNBQVNZLEtBQTdCLENBREE7QUFaVixTQURKO0FBbUJILEs7OzJCQUVEMUYsTSxxQkFBUztBQUFBOztBQUNMLGVBQ0k7QUFBQTtBQUFBLHlCQUNRLHNCQUFLLEtBQUtsQixLQUFWLEVBQWlCbUMsYUFBYWhCLFlBQTlCLENBRFI7QUFFSSxxQkFBSSxTQUZSO0FBR0ksMkJBQVc7QUFDUCw2Q0FBeUI7QUFEbEIsd0JBRU4sS0FBS25CLEtBQUwsQ0FBV3lCLFNBRkwsSUFFaUIsQ0FBQyxDQUFDLEtBQUt6QixLQUFMLENBQVd5QixTQUY5QixRQUhmO0FBT0ssaUJBQUsrRSxVQUFMO0FBUEwsU0FESjtBQVdILEs7OztFQWhWcUMsZ0JBQU1LLGE7O0FBQTNCMUUsWSxDQUNWaUIsUSxHQUFXO0FBQ2RDLFdBQU8sT0FETztBQUVkQyxjQUFVLFVBRkk7QUFHZEMsVUFBTSxNQUhRO0FBSWRDLFVBQU07QUFKUSxDO0FBRERyQixZLENBUVZzRSxTLEdBQVk7QUFDZkMsV0FBTyxPQURRO0FBRWZFLFdBQU8sT0FGUTtBQUdmRCxVQUFNO0FBSFMsQztBQVJGeEUsWSxDQWNWUixTLEdBQVk7QUFDZnVELDBCQUFzQixpQkFBVWxELElBRGpCO0FBRWZ1RCxhQUFTLGlCQUFVekQsSUFGSjtBQUdmbUUsMEJBQXNCLGlCQUFVckUsSUFIakI7QUFJZm9DLGdCQUFZLGlCQUFVOEMsTUFBVixDQUFpQkMsVUFKZDs7QUFNZjFFLGlCQUFhLFNBQVMyRSxtQkFBVCxDQUE2QmhILEtBQTdCLEVBQW9DO0FBQzdDLFlBQUksc0JBQVVBLE1BQU1xQyxXQUFoQixNQUFpQyxLQUFyQyxFQUE0QztBQUN4QyxtQkFBTyxJQUFJWSxLQUFKLENBQVUsbUNBQVYsQ0FBUDtBQUNIOztBQUVELFlBQU1nRSxnQkFBZ0J2RSxLQUFLQyxJQUFMLENBQVUzQyxNQUFNNkMsVUFBTixHQUFtQjdDLE1BQU11QyxlQUFuQyxDQUF0Qjs7QUFFQSxZQUFJdkMsTUFBTXFDLFdBQU4sR0FBb0IsQ0FBcEIsSUFBeUJyQyxNQUFNcUMsV0FBTixHQUFvQjRFLGFBQWpELEVBQWdFO0FBQzVELG1CQUFPLElBQUloRSxLQUFKLENBQVUseUNBQXlDZ0UsYUFBekMsR0FBeUQsR0FBbkUsQ0FBUDtBQUNIO0FBQ0osS0FoQmM7O0FBa0JmbkIsd0JBQW9CLGlCQUFVOUQsSUFsQmY7QUFtQmY2RCw0QkFBd0IsaUJBQVUvRCxJQW5CbkI7QUFvQmYrQywrQkFBMkIsaUJBQVU3QyxJQXBCdEI7QUFxQmZpRCw4QkFBMEIsaUJBQVVqRCxJQXJCckI7QUFzQmZ5RCxzQkFBa0IsaUJBQVU1RCxNQXRCYjtBQXVCZmtELDRCQUF3QixpQkFBVS9DLElBdkJuQjs7QUF5QmZPLHFCQUFpQixTQUFTMkUsdUJBQVQsQ0FBaUNsSCxLQUFqQyxFQUF3QztBQUNyRCxZQUFJLHNCQUFVQSxNQUFNdUMsZUFBaEIsTUFBcUMsS0FBekMsRUFBZ0Q7QUFDNUMsbUJBQU8sSUFBSVUsS0FBSixDQUFVLHVDQUFWLENBQVA7QUFDSCxTQUZELE1BRU8sSUFBSWpELE1BQU11QyxlQUFOLEdBQXdCLENBQTVCLEVBQStCO0FBQ2xDLG1CQUFPLElBQUlVLEtBQUosQ0FBVSw4Q0FBVixDQUFQO0FBQ0g7QUFDSixLQS9CYzs7QUFpQ2ZrQixvQkFBZ0IsaUJBQVVwQyxNQWpDWDtBQWtDZmlFLGNBQVUsaUJBQVVtQixLQUFWLENBQWdCbEYsT0FBT0MsSUFBUCxDQUFZQyxhQUFhc0UsU0FBekIsQ0FBaEIsQ0FsQ0s7QUFtQ2YzQixnQ0FBNEIsaUJBQVU5QyxJQW5DdkI7QUFvQ2Y0QyxxQkFBaUIsaUJBQVVoRCxJQXBDWjtBQXFDZm9ELG9CQUFnQixpQkFBVXBELElBckNYO0FBc0NmMkMseUJBQXFCLGlCQUFVNkMsU0FBVixDQUFvQixDQUNyQyxpQkFBVXhGLElBRDJCLEVBRXJDLGlCQUFVRSxJQUYyQixDQUFwQixDQXRDTjtBQTBDZm9FLHdCQUFvQixpQkFBVXJFLE1BMUNmO0FBMkNmZ0IsZ0JBQVksaUJBQVVkLE1BQVYsQ0FBaUJnRjtBQTNDZCxDO0FBZEY1RSxZLENBNERWaEIsWSxHQUFlYyxPQUFPQyxJQUFQLENBQVlDLGFBQWFSLFNBQXpCLEM7QUE1RExRLFksQ0E4RFZrRixZLEdBQWU7QUFDbEI5QiwyQkFEa0I7QUFFbEJVLDBCQUFzQixLQUZKO0FBR2xCNUQsaUJBQWEsQ0FISztBQUlsQndELDRCQUF3QjtBQUFBLGVBQVE5RixJQUFSO0FBQUEsS0FKTjtBQUtsQjhFLCtCQUEyQixTQUxUO0FBTWxCSSw4QkFBMEIsUUFOUjtBQU9sQlEsc0JBQWtCLEVBUEE7QUFRbEJWLDRCQUF3QixRQVJOO0FBU2xCeEMscUJBQWlCLEVBVEM7QUFVbEI0QixvQkFBZ0IsQ0FWRTtBQVdsQjZCLGNBQVU3RCxhQUFhc0UsU0FBYixDQUF1QkMsS0FYZjtBQVlsQjVCLGdDQUE0QixZQVpWO0FBYWxCRixxQkFBaUIsSUFiQztBQWNsQkksb0JBQWdCLElBZEU7QUFlbEJrQix3QkFBb0I7QUFmRixDO2tCQTlETC9ELFkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgdXRpbGl0eSB2aWV3IGZvciBwYWdpbmcgdGhlIGRpc3BsYXkgb2YgbWFueSBkYXRhIGl0ZW1zIG9mIHZhcnlpbmcgc2l6ZXMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0aW9uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgZXZlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGRhdGE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGRhdGFUb0pTWENvbnZlcnRlckZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgbG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhJdGVtLnByb3BUeXBlcylcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEsXG4gICAgfVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmRhdGEgIT09IHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogbmV4dFByb3BzLmRhdGF9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0SXRlbURhdGEocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VudGVkICYmIHRoaXMuc3RhdGUuZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiB2YWx1ZX0pO1xuICAgICAgICAgICAgICAgIH0gLy8gb25seSByZXBsYWNlIGlmIHdlJ3JlIGxvb2tpbmcgYXQgdGhlIHNhbWUgcHJvbWlzZSwgb3RoZXJ3aXNlIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLnN0YXRlLmRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKGV4dHJhQ2xhc3Nlcykge1xuICAgICAgICByZXR1cm4gY3goe1xuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbSc6IHRydWUsXG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtLWV2ZW4nOiB0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtLW9kZCc6ICF0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtLWxvYWRpbmcnOiB0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlLFxuICAgICAgICB9KSArIChleHRyYUNsYXNzZXMgPyAnICcgKyBleHRyYUNsYXNzZXMgOiAnJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxLZXlzKX0gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxvYWRpbmdDb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGpzeCA9IHRoaXMucHJvcHMuZGF0YVRvSlNYQ29udmVydGVyRnVuYyh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuaW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoanN4LCB7XG4gICAgICAgICAgICAuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc2VzKGpzeC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiB0aGlzLnByb3BzLmluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUGFnaW5hdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBjb250cm9scyA9IHtcbiAgICAgICAgRklSU1Q6ICdGSVJTVCcsXG4gICAgICAgIFBSRVZJT1VTOiAnUFJFVklPVVMnLFxuICAgICAgICBORVhUOiAnTkVYVCcsXG4gICAgICAgIExBU1Q6ICdMQVNUJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9zaXRpb25zID0ge1xuICAgICAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICAgICAgQkVMT1c6ICdCRUxPVycsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjdXN0b21Db250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGdldEl0ZW06IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoaWRlUGFnZXJJZk5vdE5lZWRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgICAgICBpbml0aWFsUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVJbml0aWFsUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKGlzSW50ZWdlcihwcm9wcy5pbml0aWFsUGFnZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5pbml0aWFsUGFnZSA8IDEgfHwgcHJvcHMuaW5pdGlhbFBhZ2UgPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIG51bWJlck9mUGFnZXMgKyAnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGl0ZW1Mb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG5cbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKGlzSW50ZWdlcihwcm9wcy5udW1JdGVtc1BlclBhZ2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcHMubnVtSXRlbXNQZXJQYWdlIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLnBvc2l0aW9ucykpLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd1BhZ2luYXRpb25TdGF0ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0b3RhbEl0ZW1zOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBnZXRJdGVtOiBub29wLFxuICAgICAgICBoaWRlUGFnZXJJZk5vdE5lZWRlZDogZmFsc2UsXG4gICAgICAgIGluaXRpYWxQYWdlOiAxLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBkYXRhID0+IGRhdGEsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6ICfCqyBGaXJzdCcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogJ0xhc3QgwrsnLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogJ05leHQg4oC6JyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRpb24ucG9zaXRpb25zLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sQ29udGVudDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlLFxuICAgICAgICB0YXJnZXRJbmRleDogKHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlLFxuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlID0gKCkgPT4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZVxuICAgIGdldFBhZ2VGb3JJbmRleCA9IChpbmRleCwgaXRlbXNQZXJQYWdlID0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpID0+IE1hdGguY2VpbCgoaW5kZXggKyAxKSAvIGl0ZW1zUGVyUGFnZSlcbiAgICB0b3RhbFBhZ2VzID0gKCkgPT4gTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKVxuXG4gICAgZmlyc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4gKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2VcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAocHJldlN0YXRlLmN1cnJlbnRQYWdlICE9PSB0aGlzLmN1cnJlbnRQYWdlKCkpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgICBjb25zdCBvbGRQcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgLy8gdXNlIHRyYW5zYWN0aW9uYWwgYHNldFN0YXRlKClgIHN5bnRheCB0byBlbnN1cmUgdGhhdCBwZW5kaW5nIHN0YXRlIHVwZGF0ZXMgYXJlIGhvbm9yZWQsXG4gICAgICAgIC8vIGxpa2UgdGhvc2UgZnJvbSBgcGFnZVRvSW5kZXgoKWBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICAvLyBOT1RFOiBgcHJvcHNgIGhlcmUgaXMgdGVjaG5pY2FsbHkgdGhlIGBuZXh0UHJvcHNgIHlvdSdkIHJlY2VpdmUgZnJvbSB0aGUgZmlyc3QgY1dSUCBhcmd1bWVudFxuICAgICAgICAgICAgLy8gc28gdGhhdCdzIHdoeSB3ZSdyZSBjYWNoaW5nIGBvbGRQcm9wc2Agb3V0c2lkZSB0aGUgYHNldFN0YXRlYFxuICAgICAgICAgICAgaWYgKHByb3BzLmlkZW50aWZpZXIgIT09IG9sZFByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoc3RhdGUudGFyZ2V0SW5kZXgsIHByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IHN0YXRlLnRhcmdldEluZGV4LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFnZVRvSW5kZXggPSBpID0+IHtcbiAgICAgICAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBDYW5ub3QgcGFnZSB0byBpbnZhbGlkIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChpKSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UoKTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy50b3RhbFBhZ2VzKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCB0b3RhbFBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAgIGlzRnVuY3Rpb24odGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7Y3VycmVudFBhZ2V9IG9mICR7dG90YWxQYWdlc31gLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLXN0YXRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0ZpcnN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5GSVJTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSAxLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1wcmV2aW91cycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCcsXG4gICAgICAgICAgICAgICAgJ2RhdGEtcGFnZS1udW1iZXInOiBpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSB0aGlzLmN1cnJlbnRQYWdlKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogaSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMubmV4dFBhZ2VDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTkVYVCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IHRvdGFsUGFnZXMsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLW5leHQnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvTGFzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9MYXN0Q29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5MQVNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IHRvdGFsUGFnZXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1sYXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY3VzdG9tQ29udHJvbENvbnRlbnQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuY3VzdG9tQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHV1aWQoKSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWN1c3RvbScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IE1hdGgubWluKHRoaXMucHJvcHMudG90YWxJdGVtcywgZmlyc3RJdGVtSW5kZXggKyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkgLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEl0ZW1JbmRleDsgaSA8PSBsYXN0SXRlbUluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZEl0ZW1zLnB1c2goe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbShpKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBuZXh0VGFyZ2V0SW5kZXg7XG5cbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5GSVJTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuUFJFVklPVVM6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpIC0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTkVYVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCkgKyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5MQVNUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gcGFyc2VJbnQodmFsdWUsIDEwKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KG5leHRUYXJnZXRJbmRleCksXG4gICAgICAgICAgICB0YXJnZXRJbmRleDogbmV4dFRhcmdldEluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJJdGVtcygpIHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHM7XG4gICAgICAgIGNvbnN0IGluZGV4T2Zmc2V0ID0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UgKiAodGhpcy5jdXJyZW50UGFnZSgpIC0gMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSUFycm93S2V5TmF2aWdhdGlvblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2l0ZW1MaXN0J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2VuZXJhdGVJdGVtcygpLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtpdGVtLmRhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVRvSlNYQ29udmVydGVyRnVuYz17dGhpcy5wcm9wcy5pdGVtVG9KU1hDb252ZXJ0ZXJGdW5jfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleD17aW5kZXhPZmZzZXQgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nQ29udGVudD17dGhpcy5wcm9wcy5pdGVtTG9hZGluZ0NvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1VJQXJyb3dLZXlOYXZpZ2F0aW9uPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmICggICB0aGlzLnByb3BzLmhpZGVQYWdlcklmTm90TmVlZGVkXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLnRvdGFsSXRlbXMgPD0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHM7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTG93ZXIgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkNhcGl0YWxpemVkID0gcG9zaXRpb25Mb3dlclswXS50b1VwcGVyQ2FzZSgpICsgcG9zaXRpb25Mb3dlci5zbGljZSgxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e2BzZWdtZW50ZWRDb250cm9sJHtwb3NpdGlvbkNhcGl0YWxpemVkfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wYWdpbmF0aW9uLWNvbnRyb2xzLSR7cG9zaXRpb25Mb3dlcn1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0aW9uJz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgKHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5BQk9WRSB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKHBvc2l0aW9uLkFCT1ZFKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQkVMT1cgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUGFnaW5hdGlvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==