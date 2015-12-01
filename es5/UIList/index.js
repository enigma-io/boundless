'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A generic list view, supporting unstyled, bulleted and numbered output.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIList
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIList = (function (_UIView) {
    _inherits(UIList, _UIView);

    function UIList() {
        _classCallCheck(this, UIList);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIList).apply(this, arguments));
    }

    _createClass(UIList, [{
        key: 'initialState',
        value: function initialState() {
            return {
                activeItem: null
            };
        }
    }, {
        key: 'setFocus',
        value: function setFocus(index) {
            this.refs['item_' + index].focus();
        }
    }, {
        key: 'getNextItemIndex',
        value: function getNextItemIndex(currentItem) {
            var next = this.props.items.indexOf(currentItem) + 1;

            return next < this.props.items.length ? next : 0;
        }
    }, {
        key: 'getPreviousItemIndex',
        value: function getPreviousItemIndex(currentItem) {
            var previous = this.props.items.indexOf(currentItem) - 1;

            return previous < 0 ? this.props.items.length - 1 : previous;
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var _this2 = this;

            var key = event.key;
            var hasType = !!this.props.type;
            var items = this.props.items;
            var activeItem = this.state.activeItem;

            var next = function next() {
                _this2.setFocus(_this2.getNextItemIndex(activeItem));
                event.preventDefault();
            };

            var prev = function prev() {
                event.preventDefault();
                _this2.setFocus(_this2.getPreviousItemIndex(activeItem));
            };

            if (key === 'Tab') {
                var activeItemIndex = items.indexOf(activeItem);

                if (event.shiftKey && activeItemIndex !== 0) {
                    prev();
                } else if (!event.shiftKey && activeItemIndex !== items.length - 1) {
                    next();
                }
            } else {
                switch (key) {
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        prev();
                        break;

                    case 'ArrowDown':
                    case 'ArrowRight':
                        next();
                        break;
                }
            }

            if (typeof this.props.onKeyDown === 'function') {
                event.persist();
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this3 = this;

            var nodeType = this.props.type ? 'li' : 'span';

            return this.props.items.map(function (item, index) {
                return _react2.default.createElement(nodeType, {
                    className: 'ui-list-item',
                    ref: 'item_' + index,
                    key: _this3.createHashedKey(item) + index, // in case 2 pieces of content are identical
                    tabIndex: 0,
                    onBlur: function onBlur() {
                        return _this3.state.activeItem === item && _this3.setState({ activeItem: null });
                    },
                    onFocus: function onFocus() {
                        return _this3.setState({ activeItem: item });
                    },
                    children: item
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var nodeType = 'div';

            switch (this.props.type) {
                case 'bullet':
                    nodeType = 'ul';
                    break;

                case 'number':
                    nodeType = 'ol';
                    break;
            }

            return _react2.default.createElement(nodeType, _extends({}, this.props, {
                ref: 'list',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-list': true,
                    'ui-list-bulleted': this.props.type === 'bullet',
                    'ui-list-numbered': this.props.type === 'number',
                    'ui-list-plain': this.props.type !== 'bullet' && this.props.type !== 'number'
                }, this.props.className, !!this.props.className)),
                onKeyDown: this.handleKeyDown.bind(this),
                children: this.renderContent()
            }));
        }
    }]);

    return UIList;
})(_UIView3.default);

UIList.propTypes = {
    items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node),
    type: _react2.default.PropTypes.oneOf(['bullet', 'number'])
};

UIList.defaultProps = {
    items: []
};

exports.default = UIList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJTGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVNNLE1BQU07Y0FBTixNQUFNOzthQUFOLE1BQU07OEJBQU4sTUFBTTs7c0VBQU4sTUFBTTs7O2lCQUFOLE1BQU07O3VDQUNPO0FBQ1gsbUJBQU87QUFDSCwwQkFBVSxFQUFFLElBQUk7YUFDbkIsQ0FBQztTQUNMOzs7aUNBRVEsS0FBSyxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxJQUFJLFdBQVMsS0FBSyxDQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdEM7Ozt5Q0FFZ0IsV0FBVyxFQUFFO0FBQzFCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVyRCxtQkFBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7U0FDcEQ7Ozs2Q0FFb0IsV0FBVyxFQUFFO0FBQzlCLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUV6RCxtQkFBTyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ2hFOzs7c0NBRWEsS0FBSyxFQUFFOzs7QUFDakIsZ0JBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDdEIsZ0JBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUNsQyxnQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDL0IsZ0JBQU0sVUFB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QUFDZixzQ0FBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO0FBQ2hELHNDQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7QUFDaEQsbUNBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTttQkFDNUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUNoRDtBQUNGLHlCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3hDLHdCQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtlQUNoQyxDQUFDO1NBQ047OztXQTdHQyxNQUFNOzs7QUFnSFosTUFBTSxDQUFDLFNBQVMsR0FBRztBQUNmLFNBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLGdCQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDcEQsUUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDcEQsQ0FBQzs7QUFFRixNQUFNLENBQUMsWUFBWSxHQUFHO0FBQ2xCLFNBQUssRUFBRSxFQUFFO0NBQ1osQ0FBQzs7a0JBRWEsTUFBTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBnZW5lcmljIGxpc3Qgdmlldywgc3VwcG9ydGluZyB1bnN0eWxlZCwgYnVsbGV0ZWQgYW5kIG51bWJlcmVkIG91dHB1dC5cbiAqIEBjbGFzcyBVSUxpc3RcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW06IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWZzW2BpdGVtXyR7aW5kZXh9YF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0SXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5wcm9wcy5pdGVtcy5pbmRleE9mKGN1cnJlbnRJdGVtKSArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzSXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IHRoaXMucHJvcHMuaXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSkgLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgaGFzVHlwZSA9ICEhdGhpcy5wcm9wcy50eXBlO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMucHJvcHMuaXRlbXM7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnN0YXRlLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0SXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcHJldiA9ICgpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNJdGVtSW5kZXgoYWN0aXZlSXRlbSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdUYWInKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSBpdGVtcy5pbmRleE9mKGFjdGl2ZUl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlSXRlbUluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJldigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlSXRlbUluZGV4ICE9PSBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICBwcmV2KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBjb25zdCBub2RlVHlwZSA9IHRoaXMucHJvcHMudHlwZSA/ICdsaScgOiAnc3Bhbic7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZVR5cGUsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1saXN0LWl0ZW0nLFxuICAgICAgICAgICAgICAgIHJlZjogYGl0ZW1fJHtpbmRleH1gLFxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5jcmVhdGVIYXNoZWRLZXkoaXRlbSkgKyBpbmRleCwgLy8gaW4gY2FzZSAyIHBpZWNlcyBvZiBjb250ZW50IGFyZSBpZGVudGljYWxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6ICgpID0+IHRoaXMuc3RhdGUuYWN0aXZlSXRlbSA9PT0gaXRlbSAmJiB0aGlzLnNldFN0YXRlKHthY3RpdmVJdGVtOiBudWxsfSksXG4gICAgICAgICAgICAgICAgb25Gb2N1czogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7YWN0aXZlSXRlbTogaXRlbX0pLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBpdGVtLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG5vZGVUeXBlID0gJ2Rpdic7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnYnVsbGV0JzpcbiAgICAgICAgICAgIG5vZGVUeXBlID0gJ3VsJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBub2RlVHlwZSA9ICdvbCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGVUeXBlLCB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgICAgICAgcmVmOiAnbGlzdCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAndWktbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLWxpc3QtYnVsbGV0ZWQnOiB0aGlzLnByb3BzLnR5cGUgPT09ICdidWxsZXQnLFxuICAgICAgICAgICAgICAgICd1aS1saXN0LW51bWJlcmVkJzogdGhpcy5wcm9wcy50eXBlID09PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICAndWktbGlzdC1wbGFpbic6IHRoaXMucHJvcHMudHlwZSAhPT0gJ2J1bGxldCcgJiYgdGhpcy5wcm9wcy50eXBlICE9PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMucmVuZGVyQ29udGVudCgpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblVJTGlzdC5wcm9wVHlwZXMgPSB7XG4gICAgaXRlbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5ub2RlKSxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydidWxsZXQnLCAnbnVtYmVyJ10pLFxufTtcblxuVUlMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUxpc3Q7XG4iXX0=