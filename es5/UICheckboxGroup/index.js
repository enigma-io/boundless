'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _UICheckbox = require('../UICheckbox');

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related checkboxes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckboxGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckboxGroup = function (_React$PureComponent) {
    _inherits(UICheckboxGroup, _React$PureComponent);

    function UICheckboxGroup() {
        _classCallCheck(this, UICheckboxGroup);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UICheckboxGroup.prototype.allItemsChecked = function allItemsChecked() {
        return this.props.items.every(function (item) {
            return item.inputProps.checked === true;
        });
    };

    UICheckboxGroup.prototype.anyItemsChecked = function anyItemsChecked() {
        return this.props.items.some(function (item) {
            return item.inputProps.checked === true;
        });
    };

    UICheckboxGroup.prototype.renderSelectAll = function renderSelectAll() {
        if (this.props.selectAll) {
            var _cx;

            var allChecked = this.allItemsChecked();
            var inputProps = this.props.selectAllProps.inputProps;


            return _react2.default.createElement(_UICheckbox2.default, _extends({}, this.props.selectAllProps, {
                ref: 'select_all',
                key: 'cb_select_all',
                className: (0, _classnames2.default)((_cx = {
                    'ui-checkbox-group-selectall': true
                }, _cx[this.props.selectAllProps.className] = !!this.props.selectAllProps.className, _cx)),
                inputProps: _extends({}, inputProps, {
                    checked: allChecked,
                    indeterminate: !allChecked && this.anyItemsChecked(),
                    name: inputProps && inputProps.name ? inputProps.name : 'cb_select_all'
                }),
                label: this.props.selectAllProps.label || 'Select All',
                onChecked: this.props.onAllChecked,
                onUnchecked: this.props.onAllUnchecked }));
        }
    };

    UICheckboxGroup.prototype.renderCheckboxes = function renderCheckboxes() {
        var _this2 = this;

        return this.props.items.map(function (item) {
            return _react2.default.createElement(_UICheckbox2.default, _extends({}, item, {
                key: item.inputProps.name,
                onChecked: _this2.props.onChildChecked,
                onUnchecked: _this2.props.onChildUnchecked }));
        });
    };

    UICheckboxGroup.prototype.renderChildren = function renderChildren() {
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
    };

    UICheckboxGroup.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UICheckboxGroup.internalKeys), {
                ref: 'group',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-checkbox-group': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)) }),
            this.renderChildren()
        );
    };

    return UICheckboxGroup;
}(_react2.default.PureComponent);

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};
UICheckboxGroup.propTypes = {
    items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        inputProps: _react.PropTypes.shape({
            checked: _react.PropTypes.bool.isRequired,
            label: _react.PropTypes.string,
            name: _react.PropTypes.string.isRequired,
            value: _react.PropTypes.string
        })
    })).isRequired,
    onAllChecked: _react.PropTypes.func,
    onAllUnchecked: _react.PropTypes.func,
    onChildChecked: _react.PropTypes.func,
    onChildUnchecked: _react.PropTypes.func,
    selectAll: _react.PropTypes.bool,
    selectAllProps: _react.PropTypes.object,
    selectAllPosition: _react.PropTypes.oneOf([UICheckboxGroup.Constants.SELECT_ALL_BEFORE, UICheckboxGroup.Constants.SELECT_ALL_AFTER])
};
UICheckboxGroup.internalKeys = Object.keys(UICheckboxGroup.propTypes);
UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: _noop2.default,
    onAllUnchecked: _noop2.default,
    onChildChecked: _noop2.default,
    onChildUnchecked: _noop2.default,
    selectAll: false,
    selectAllProps: {},
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};
exports.default = UICheckboxGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQ2hlY2tib3hHcm91cC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7OytlQVZBOzs7OztJQVlxQixlOzs7Ozs7Ozs7OEJBMENqQixlLDhCQUFrQjtBQUNkLGVBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixLQUFqQixDQUF1QjtBQUFBLG1CQUFRLEtBQUssVUFBTCxDQUFnQixPQUFoQixLQUE0QixJQUFwQztBQUFBLFNBQXZCLENBQVA7QUFDSCxLOzs4QkFFRCxlLDhCQUFrQjtBQUNkLGVBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQjtBQUFBLG1CQUFRLEtBQUssVUFBTCxDQUFnQixPQUFoQixLQUE0QixJQUFwQztBQUFBLFNBQXRCLENBQVA7QUFDSCxLOzs4QkFFRCxlLDhCQUFrQjtBQUNkLFlBQUksS0FBSyxLQUFMLENBQVcsU0FBZixFQUEwQjtBQUFBOztBQUN0QixnQkFBTSxhQUFhLEtBQUssZUFBTCxFQUFuQjtBQURzQixnQkFFZixVQUZlLEdBRUQsS0FBSyxLQUFMLENBQVcsY0FGVixDQUVmLFVBRmU7OztBQUl0QixtQkFDSSxpRUFDUSxLQUFLLEtBQUwsQ0FBVyxjQURuQjtBQUVJLHFCQUFJLFlBRlI7QUFHSSxxQkFBSSxlQUhSO0FBSUksMkJBQVc7QUFDUCxtREFBK0I7QUFEeEIsdUJBRU4sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUZwQixJQUVnQyxDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUY1RCxPQUpmO0FBUUkseUNBQ08sVUFEUDtBQUVJLDZCQUFTLFVBRmI7QUFHSSxtQ0FBZSxDQUFDLFVBQUQsSUFBZSxLQUFLLGVBQUwsRUFIbEM7QUFJSSwwQkFBTSxjQUFjLFdBQVcsSUFBekIsR0FBZ0MsV0FBVyxJQUEzQyxHQUFrRDtBQUo1RCxrQkFSSjtBQWNJLHVCQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBMUIsSUFBbUMsWUFkOUM7QUFlSSwyQkFBVyxLQUFLLEtBQUwsQ0FBVyxZQWYxQjtBQWdCSSw2QkFBYSxLQUFLLEtBQUwsQ0FBVyxjQWhCNUIsSUFESjtBQW1CSDtBQUNKLEs7OzhCQUVELGdCLCtCQUFtQjtBQUFBOztBQUNmLGVBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixHQUFqQixDQUFxQixnQkFBUTtBQUNoQyxtQkFDSSxpRUFDUSxJQURSO0FBRUkscUJBQUssS0FBSyxVQUFMLENBQWdCLElBRnpCO0FBR0ksMkJBQVcsT0FBSyxLQUFMLENBQVcsY0FIMUI7QUFJSSw2QkFBYSxPQUFLLEtBQUwsQ0FBVyxnQkFKNUIsSUFESjtBQU9ILFNBUk0sQ0FBUDtBQVNILEs7OzhCQUVELGMsNkJBQWlCO0FBQ2IsWUFBTSxlQUFlLENBQUMsS0FBSyxnQkFBTCxFQUFELENBQXJCOztBQUVBLFlBQUksS0FBSyxLQUFMLENBQVcsU0FBWCxJQUF3QixLQUFLLEtBQUwsQ0FBVyxpQkFBdkMsRUFBMEQ7QUFDdEQsb0JBQVEsS0FBSyxLQUFMLENBQVcsaUJBQW5CO0FBQ0EscUJBQUssZ0JBQWdCLFNBQWhCLENBQTBCLGlCQUEvQjtBQUNJLGlDQUFhLE9BQWIsQ0FBcUIsS0FBSyxlQUFMLEVBQXJCO0FBQ0E7O0FBRUoscUJBQUssZ0JBQWdCLFNBQWhCLENBQTBCLGdCQUEvQjtBQUNJLGlDQUFhLElBQWIsQ0FBa0IsS0FBSyxlQUFMLEVBQWxCO0FBQ0E7QUFQSjtBQVNIOztBQUVELGVBQU8sWUFBUDtBQUNILEs7OzhCQUVELE0scUJBQVM7QUFBQTs7QUFDTCxlQUNJO0FBQUE7QUFBQSx5QkFDUSxzQkFBSyxLQUFLLEtBQVYsRUFBaUIsZ0JBQWdCLFlBQWpDLENBRFI7QUFFSSxxQkFBSSxPQUZSO0FBR0ksMkJBQVc7QUFDUCx5Q0FBcUI7QUFEZCx3QkFFTixLQUFLLEtBQUwsQ0FBVyxTQUZMLElBRWlCLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxTQUY5QixRQUhmO0FBT0ssaUJBQUssY0FBTDtBQVBMLFNBREo7QUFXSCxLOzs7RUF2SHdDLGdCQUFNLGE7O0FBQTlCLGUsQ0FDVixTLEdBQVk7QUFDZix1QkFBbUIsbUJBREo7QUFFZixzQkFBa0I7QUFGSCxDO0FBREYsZSxDQU1WLFMsR0FBWTtBQUNmLFdBQU8saUJBQVUsT0FBVixDQUNILGlCQUFVLEtBQVYsQ0FBZ0I7QUFDWixvQkFBWSxpQkFBVSxLQUFWLENBQWdCO0FBQ3hCLHFCQUFTLGlCQUFVLElBQVYsQ0FBZSxVQURBO0FBRXhCLG1CQUFPLGlCQUFVLE1BRk87QUFHeEIsa0JBQU0saUJBQVUsTUFBVixDQUFpQixVQUhDO0FBSXhCLG1CQUFPLGlCQUFVO0FBSk8sU0FBaEI7QUFEQSxLQUFoQixDQURHLEVBU0wsVUFWYTtBQVdmLGtCQUFjLGlCQUFVLElBWFQ7QUFZZixvQkFBZ0IsaUJBQVUsSUFaWDtBQWFmLG9CQUFnQixpQkFBVSxJQWJYO0FBY2Ysc0JBQWtCLGlCQUFVLElBZGI7QUFlZixlQUFXLGlCQUFVLElBZk47QUFnQmYsb0JBQWdCLGlCQUFVLE1BaEJYO0FBaUJmLHVCQUFtQixpQkFBVSxLQUFWLENBQWdCLENBQy9CLGdCQUFnQixTQUFoQixDQUEwQixpQkFESyxFQUUvQixnQkFBZ0IsU0FBaEIsQ0FBMEIsZ0JBRkssQ0FBaEI7QUFqQkosQztBQU5GLGUsQ0E2QlYsWSxHQUFlLE9BQU8sSUFBUCxDQUFZLGdCQUFnQixTQUE1QixDO0FBN0JMLGUsQ0ErQlYsWSxHQUFlO0FBQ2xCLFdBQU8sRUFEVztBQUVsQixnQ0FGa0I7QUFHbEIsa0NBSGtCO0FBSWxCLGtDQUprQjtBQUtsQixvQ0FMa0I7QUFNbEIsZUFBVyxLQU5PO0FBT2xCLG9CQUFnQixFQVBFO0FBUWxCLHVCQUFtQixnQkFBZ0IsU0FBaEIsQ0FBMEI7QUFSM0IsQztrQkEvQkwsZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgY2hlY2tib3hlcy5cbiAqIEBjbGFzcyBVSUNoZWNrYm94R3JvdXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJQ2hlY2tib3ggZnJvbSAnLi4vVUlDaGVja2JveCc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgQ29uc3RhbnRzID0ge1xuICAgICAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICAgICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0QWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmlucHV0UHJvcHMuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IHtpbnB1dFByb3BzfSA9IHRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBhbGxDaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogIWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0UHJvcHMgJiYgaW5wdXRQcm9wcy5uYW1lID8gaW5wdXRQcm9wcy5uYW1lIDogJ2NiX3NlbGVjdF9hbGwnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5sYWJlbCB8fCAnU2VsZWN0IEFsbCd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pbnB1dFByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94R3JvdXAuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19