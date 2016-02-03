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

var _UICheckbox = require('../UICheckbox');

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related checkboxes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckboxGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckboxGroup = function (_UIView) {
    _inherits(UICheckboxGroup, _UIView);

    function UICheckboxGroup() {
        _classCallCheck(this, UICheckboxGroup);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UICheckboxGroup).apply(this, arguments));
    }

    _createClass(UICheckboxGroup, [{
        key: 'allItemsChecked',
        value: function allItemsChecked() {
            return this.props.items.every(function (item) {
                return item.checked === true;
            });
        }
    }, {
        key: 'anyItemsChecked',
        value: function anyItemsChecked() {
            return this.props.items.some(function (item) {
                return item.checked === true;
            });
        }
    }, {
        key: 'renderSelectAll',
        value: function renderSelectAll() {
            if (this.props.selectAll) {
                var allChecked = this.allItemsChecked();

                return _react2.default.createElement(_UICheckbox2.default, _extends({}, this.props.selectAllProps, {
                    ref: 'select_all',
                    name: 'cb_select_all',
                    key: 'cb_select_all',
                    checked: allChecked,
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-checkbox-group-selectall': true
                    }, this.props.selectAllProps.className, !!this.props.selectAllProps.className)),
                    indeterminate: !allChecked && this.anyItemsChecked(),
                    label: this.props.selectAllLabel,
                    onChecked: this.props.onAllChecked,
                    onUnchecked: this.props.onAllUnchecked }));
            }
        }
    }, {
        key: 'renderCheckboxes',
        value: function renderCheckboxes() {
            var _this2 = this;

            return this.props.items.map(function (item) {
                return _react2.default.createElement(_UICheckbox2.default, _extends({}, item, {
                    ref: 'cb_item.name',
                    key: item.name,
                    onChecked: _this2.props.onChildChecked,
                    onUnchecked: _this2.props.onChildUnchecked }));
            });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var toBeRendered = [this.renderCheckboxes()];

            if (this.props.selectAll && this.props.selectAllPosition) {
                switch (this.props.selectAllPosition) {
                    case UICheckboxGroup.Constants.SELECT_ALL_BEFORE:
                        toBeRendered.unshift(this.renderSelectAll());
                        break;

                    case UICheckboxGroup.Constants.SELECT_ALL_AFTER:
                        toBeRendered.push(this.renderSelectAll());
                        break;
                }
            }

            return toBeRendered;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'group',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-checkbox-group': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderChildren()
            );
        }
    }]);

    return UICheckboxGroup;
}(_UIView3.default);

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};

UICheckboxGroup.propTypes = {
    items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        checked: _react2.default.PropTypes.bool.isRequired,
        label: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string.isRequired,
        value: _react2.default.PropTypes.string
    })).isRequired,
    onAllChecked: _react2.default.PropTypes.func,
    onAllUnchecked: _react2.default.PropTypes.func,
    onChildChecked: _react2.default.PropTypes.func,
    onChildUnchecked: _react2.default.PropTypes.func,
    selectAll: _react2.default.PropTypes.bool,
    selectAllProps: _react2.default.PropTypes.object,
    selectAllLabel: _react2.default.PropTypes.string,
    selectAllPosition: _react2.default.PropTypes.oneOf([UICheckboxGroup.Constants.SELECT_ALL_BEFORE, UICheckboxGroup.Constants.SELECT_ALL_AFTER])
};

UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: _noop2.default,
    onAllUnchecked: _noop2.default,
    onChildChecked: _noop2.default,
    onChildUnchecked: _noop2.default,
    selectAllProps: {},
    selectAllLabel: 'Select All',
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};

exports.default = UICheckboxGroup;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQ2hlY2tib3hHcm91cC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBV00sZUFBZTtjQUFmLGVBQWU7O2FBQWYsZUFBZTs4QkFBZixlQUFlOztzRUFBZixlQUFlOzs7aUJBQWYsZUFBZTs7MENBQ0M7QUFDZCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBQSxJQUFJO3VCQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSTthQUFBLENBQUMsQ0FBQztTQUNoRTs7OzBDQUVpQjtBQUNkLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7dUJBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJO2FBQUEsQ0FBQyxDQUFDO1NBQy9EOzs7MENBRWlCO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDdEIsb0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7QUFFeEMsdUJBQ0ksaUVBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztBQUM3Qix1QkFBRyxFQUFDLFlBQVk7QUFDaEIsd0JBQUksRUFBQyxlQUFlO0FBQ3BCLHVCQUFHLEVBQUMsZUFBZTtBQUNuQiwyQkFBTyxFQUFFLFVBQVUsQUFBQztBQUNwQiw2QkFBUyxFQUFFO0FBQ1AscURBQTZCLEVBQUUsSUFBSTt1QkFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQzlFLEFBQUM7QUFDSCxpQ0FBYSxFQUFFLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQUFBQztBQUNyRCx5QkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENB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QUFpQixFQUMzQyxlQUFlLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUM3QyxDQUFDO0NBQ0wsQ0FBQzs7QUFFRixlQUFlLENBQUMsWUFBWSxHQUFHO0FBQzNCLFNBQUssRUFBRSxFQUFFO0FBQ1QsZ0JBQVksZ0JBQU07QUFDbEIsa0JBQWMsZ0JBQU07QUFDcEIsa0JBQWMsZ0JBQU07QUFDcEIsb0JBQWdCLGdCQUFNO0FBQ3RCLGtCQUFjLEVBQUUsRUFBRTtBQUNsQixrQkFBYyxFQUFFLFlBQVk7QUFDNUIscUJBQWlCLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUI7Q0FDakUsQ0FBQzs7a0JBRWEsZUFBZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgY2hlY2tib3hlcy5cbiAqIEBjbGFzcyBVSUNoZWNrYm94R3JvdXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQ2hlY2tib3ggZnJvbSAnLi4vVUlDaGVja2JveCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGxldCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4udGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwLXNlbGVjdGFsbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZT17IWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RBbGxMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3ggey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgY2JfaXRlbS5uYW1lYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBsZXQgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMgPSB7XG4gICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxufTtcblxuVUlDaGVja2JveEdyb3VwLnByb3BUeXBlcyA9IHtcbiAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25BbGxDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkFsbFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0QWxsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0QWxsTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICBdKSxcbn07XG5cblVJQ2hlY2tib3hHcm91cC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaXRlbXM6IFtdLFxuICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICBvbkFsbFVuY2hlY2tlZDogbm9vcCxcbiAgICBvbkNoaWxkQ2hlY2tlZDogbm9vcCxcbiAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgIHNlbGVjdEFsbFByb3BzOiB7fSxcbiAgICBzZWxlY3RBbGxMYWJlbDogJ1NlbGVjdCBBbGwnLFxuICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlDaGVja2JveEdyb3VwO1xuIl19