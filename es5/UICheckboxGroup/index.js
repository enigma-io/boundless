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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQ2hlY2tib3hHcm91cC9pbmRleC5qcyJdLCJuYW1lcyI6WyJVSUNoZWNrYm94R3JvdXAiLCJhbGxJdGVtc0NoZWNrZWQiLCJwcm9wcyIsIml0ZW1zIiwiZXZlcnkiLCJpdGVtIiwiaW5wdXRQcm9wcyIsImNoZWNrZWQiLCJhbnlJdGVtc0NoZWNrZWQiLCJzb21lIiwicmVuZGVyU2VsZWN0QWxsIiwic2VsZWN0QWxsIiwiYWxsQ2hlY2tlZCIsInNlbGVjdEFsbFByb3BzIiwiY2xhc3NOYW1lIiwiaW5kZXRlcm1pbmF0ZSIsIm5hbWUiLCJsYWJlbCIsIm9uQWxsQ2hlY2tlZCIsIm9uQWxsVW5jaGVja2VkIiwicmVuZGVyQ2hlY2tib3hlcyIsIm1hcCIsIm9uQ2hpbGRDaGVja2VkIiwib25DaGlsZFVuY2hlY2tlZCIsInJlbmRlckNoaWxkcmVuIiwidG9CZVJlbmRlcmVkIiwic2VsZWN0QWxsUG9zaXRpb24iLCJDb25zdGFudHMiLCJTRUxFQ1RfQUxMX0JFRk9SRSIsInVuc2hpZnQiLCJTRUxFQ1RfQUxMX0FGVEVSIiwicHVzaCIsInJlbmRlciIsImludGVybmFsS2V5cyIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwic2hhcGUiLCJib29sIiwiaXNSZXF1aXJlZCIsInN0cmluZyIsInZhbHVlIiwiZnVuYyIsIm9iamVjdCIsIm9uZU9mIiwiT2JqZWN0Iiwia2V5cyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFWQTs7Ozs7SUFZcUJBLGU7Ozs7Ozs7Ozs4QkEwQ2pCQyxlLDhCQUFrQjtBQUNkLGVBQU8sS0FBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCQyxLQUFqQixDQUF1QjtBQUFBLG1CQUFRQyxLQUFLQyxVQUFMLENBQWdCQyxPQUFoQixLQUE0QixJQUFwQztBQUFBLFNBQXZCLENBQVA7QUFDSCxLOzs4QkFFREMsZSw4QkFBa0I7QUFDZCxlQUFPLEtBQUtOLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQk0sSUFBakIsQ0FBc0I7QUFBQSxtQkFBUUosS0FBS0MsVUFBTCxDQUFnQkMsT0FBaEIsS0FBNEIsSUFBcEM7QUFBQSxTQUF0QixDQUFQO0FBQ0gsSzs7OEJBRURHLGUsOEJBQWtCO0FBQ2QsWUFBSSxLQUFLUixLQUFMLENBQVdTLFNBQWYsRUFBMEI7QUFBQTs7QUFDdEIsZ0JBQU1DLGFBQWEsS0FBS1gsZUFBTCxFQUFuQjtBQURzQixnQkFFZkssVUFGZSxHQUVELEtBQUtKLEtBQUwsQ0FBV1csY0FGVixDQUVmUCxVQUZlOzs7QUFJdEIsbUJBQ0ksaUVBQ1EsS0FBS0osS0FBTCxDQUFXVyxjQURuQjtBQUVJLHFCQUFJLFlBRlI7QUFHSSxxQkFBSSxlQUhSO0FBSUksMkJBQVc7QUFDUCxtREFBK0I7QUFEeEIsdUJBRU4sS0FBS1gsS0FBTCxDQUFXVyxjQUFYLENBQTBCQyxTQUZwQixJQUVnQyxDQUFDLENBQUMsS0FBS1osS0FBTCxDQUFXVyxjQUFYLENBQTBCQyxTQUY1RCxPQUpmO0FBUUkseUNBQ09SLFVBRFA7QUFFSUMsNkJBQVNLLFVBRmI7QUFHSUcsbUNBQWUsQ0FBQ0gsVUFBRCxJQUFlLEtBQUtKLGVBQUwsRUFIbEM7QUFJSVEsMEJBQU1WLGNBQWNBLFdBQVdVLElBQXpCLEdBQWdDVixXQUFXVSxJQUEzQyxHQUFrRDtBQUo1RCxrQkFSSjtBQWNJLHVCQUFPLEtBQUtkLEtBQUwsQ0FBV1csY0FBWCxDQUEwQkksS0FBMUIsSUFBbUMsWUFkOUM7QUFlSSwyQkFBVyxLQUFLZixLQUFMLENBQVdnQixZQWYxQjtBQWdCSSw2QkFBYSxLQUFLaEIsS0FBTCxDQUFXaUIsY0FoQjVCLElBREo7QUFtQkg7QUFDSixLOzs4QkFFREMsZ0IsK0JBQW1CO0FBQUE7O0FBQ2YsZUFBTyxLQUFLbEIsS0FBTCxDQUFXQyxLQUFYLENBQWlCa0IsR0FBakIsQ0FBcUIsZ0JBQVE7QUFDaEMsbUJBQ0ksaUVBQ1FoQixJQURSO0FBRUkscUJBQUtBLEtBQUtDLFVBQUwsQ0FBZ0JVLElBRnpCO0FBR0ksMkJBQVcsT0FBS2QsS0FBTCxDQUFXb0IsY0FIMUI7QUFJSSw2QkFBYSxPQUFLcEIsS0FBTCxDQUFXcUIsZ0JBSjVCLElBREo7QUFPSCxTQVJNLENBQVA7QUFTSCxLOzs4QkFFREMsYyw2QkFBaUI7QUFDYixZQUFNQyxlQUFlLENBQUMsS0FBS0wsZ0JBQUwsRUFBRCxDQUFyQjs7QUFFQSxZQUFJLEtBQUtsQixLQUFMLENBQVdTLFNBQVgsSUFBd0IsS0FBS1QsS0FBTCxDQUFXd0IsaUJBQXZDLEVBQTBEO0FBQ3RELG9CQUFRLEtBQUt4QixLQUFMLENBQVd3QixpQkFBbkI7QUFDQSxxQkFBSzFCLGdCQUFnQjJCLFNBQWhCLENBQTBCQyxpQkFBL0I7QUFDSUgsaUNBQWFJLE9BQWIsQ0FBcUIsS0FBS25CLGVBQUwsRUFBckI7QUFDQTs7QUFFSixxQkFBS1YsZ0JBQWdCMkIsU0FBaEIsQ0FBMEJHLGdCQUEvQjtBQUNJTCxpQ0FBYU0sSUFBYixDQUFrQixLQUFLckIsZUFBTCxFQUFsQjtBQUNBO0FBUEo7QUFTSDs7QUFFRCxlQUFPZSxZQUFQO0FBQ0gsSzs7OEJBRURPLE0scUJBQVM7QUFBQTs7QUFDTCxlQUNJO0FBQUE7QUFBQSx5QkFDUSxzQkFBSyxLQUFLOUIsS0FBVixFQUFpQkYsZ0JBQWdCaUMsWUFBakMsQ0FEUjtBQUVJLHFCQUFJLE9BRlI7QUFHSSwyQkFBVztBQUNQLHlDQUFxQjtBQURkLHdCQUVOLEtBQUsvQixLQUFMLENBQVdZLFNBRkwsSUFFaUIsQ0FBQyxDQUFDLEtBQUtaLEtBQUwsQ0FBV1ksU0FGOUIsUUFIZjtBQU9LLGlCQUFLVSxjQUFMO0FBUEwsU0FESjtBQVdILEs7OztFQXZId0MsZ0JBQU1VLGE7O0FBQTlCbEMsZSxDQUNWMkIsUyxHQUFZO0FBQ2ZDLHVCQUFtQixtQkFESjtBQUVmRSxzQkFBa0I7QUFGSCxDO0FBREY5QixlLENBTVZtQyxTLEdBQVk7QUFDZmhDLFdBQU8saUJBQVVpQyxPQUFWLENBQ0gsaUJBQVVDLEtBQVYsQ0FBZ0I7QUFDWi9CLG9CQUFZLGlCQUFVK0IsS0FBVixDQUFnQjtBQUN4QjlCLHFCQUFTLGlCQUFVK0IsSUFBVixDQUFlQyxVQURBO0FBRXhCdEIsbUJBQU8saUJBQVV1QixNQUZPO0FBR3hCeEIsa0JBQU0saUJBQVV3QixNQUFWLENBQWlCRCxVQUhDO0FBSXhCRSxtQkFBTyxpQkFBVUQ7QUFKTyxTQUFoQjtBQURBLEtBQWhCLENBREcsRUFTTEQsVUFWYTtBQVdmckIsa0JBQWMsaUJBQVV3QixJQVhUO0FBWWZ2QixvQkFBZ0IsaUJBQVV1QixJQVpYO0FBYWZwQixvQkFBZ0IsaUJBQVVvQixJQWJYO0FBY2ZuQixzQkFBa0IsaUJBQVVtQixJQWRiO0FBZWYvQixlQUFXLGlCQUFVMkIsSUFmTjtBQWdCZnpCLG9CQUFnQixpQkFBVThCLE1BaEJYO0FBaUJmakIsdUJBQW1CLGlCQUFVa0IsS0FBVixDQUFnQixDQUMvQjVDLGdCQUFnQjJCLFNBQWhCLENBQTBCQyxpQkFESyxFQUUvQjVCLGdCQUFnQjJCLFNBQWhCLENBQTBCRyxnQkFGSyxDQUFoQjtBQWpCSixDO0FBTkY5QixlLENBNkJWaUMsWSxHQUFlWSxPQUFPQyxJQUFQLENBQVk5QyxnQkFBZ0JtQyxTQUE1QixDO0FBN0JMbkMsZSxDQStCVitDLFksR0FBZTtBQUNsQjVDLFdBQU8sRUFEVztBQUVsQmUsZ0NBRmtCO0FBR2xCQyxrQ0FIa0I7QUFJbEJHLGtDQUprQjtBQUtsQkMsb0NBTGtCO0FBTWxCWixlQUFXLEtBTk87QUFPbEJFLG9CQUFnQixFQVBFO0FBUWxCYSx1QkFBbUIxQixnQkFBZ0IyQixTQUFoQixDQUEwQkM7QUFSM0IsQztrQkEvQkw1QixlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBDb25zdGFudHMgPSB7XG4gICAgICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgICAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgb25BbGxDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveEdyb3VwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdEFsbDogZmFsc2UsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiB7fSxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgfVxuXG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoaXRlbSA9PiBpdGVtLmlucHV0UHJvcHMuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuICAgICAgICAgICAgY29uc3Qge2lucHV0UHJvcHN9ID0gdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdzZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBrZXk9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwLXNlbGVjdGFsbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGFsbENoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlOiAhYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXRQcm9wcyAmJiBpbnB1dFByb3BzLm5hbWUgPyBpbnB1dFByb3BzLm5hbWUgOiAnY2Jfc2VsZWN0X2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmxhYmVsIHx8ICdTZWxlY3QgQWxsJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNvbnN0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3hHcm91cC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=