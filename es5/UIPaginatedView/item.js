'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIPaginatedViewItem = function (_UIView) {
    _inherits(UIPaginatedViewItem, _UIView);

    function UIPaginatedViewItem() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIPaginatedViewItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            data: _this.props.data
        }, _this._mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIPaginatedViewItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    };

    UIPaginatedViewItem.prototype.waitForContentIfNecessary = function waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this._mounted && this.state.data === promise) {
                    this.setState({ data: value });
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    };

    UIPaginatedViewItem.prototype.componentDidMount = function componentDidMount() {
        this._mounted = true;
        this.waitForContentIfNecessary();
    };

    UIPaginatedViewItem.prototype.componentWillUnmount = function componentWillUnmount() {
        this._mounted = false;
    };

    UIPaginatedViewItem.prototype.componentDidUpdate = function componentDidUpdate() {
        this.waitForContentIfNecessary();
    };

    UIPaginatedViewItem.prototype.getClasses = function getClasses(extraClasses) {
        return (0, _classnames2.default)({
            'ui-paginated-view-item': true,
            'ui-paginated-view-item-even': this.props.even,
            'ui-paginated-view-item-odd': !this.props.even,
            'ui-paginated-view-item-loading': this.state.data instanceof Promise
        }) + (extraClasses ? ' ' + extraClasses : '');
    };

    UIPaginatedViewItem.prototype.cloneWithClasses = function cloneWithClasses(element) {
        if (element instanceof Promise) {
            return _react2.default.createElement('div', _extends({}, this.props, { className: this.getClasses() }));
        }

        return _react2.default.cloneElement(element, _extends({}, this.props, {
            className: this.getClasses(this.state.data.props.className)
        }));
    };

    UIPaginatedViewItem.prototype.render = function render() {
        return this.cloneWithClasses(this.state.data);
    };

    return UIPaginatedViewItem;
}(_UIView3.default);

UIPaginatedViewItem.propTypes = {
    even: _react2.default.PropTypes.bool,
    data: _react2.default.PropTypes.object
};
exports.default = UIPaginatedViewItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUGFnaW5hdGVkVmlldy9pdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSXFCOzs7Ozs7Ozs7Ozs7MElBTWpCLFFBQVE7QUFDSixrQkFBTSxNQUFLLEtBQUwsQ0FBVyxJQUFYO2lCQUdWLFdBQVc7OztBQVZNLGtDQVlqQiwrREFBMEIsV0FBVztBQUNqQyxZQUFJLFVBQVUsSUFBVixLQUFtQixLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ3BDLGlCQUFLLFFBQUwsQ0FBYyxFQUFFLE1BQU0sVUFBVSxJQUFWLEVBQXRCLEVBRG9DO1NBQXhDOzs7QUFiYSxrQ0FrQmpCLGlFQUE0QjtBQUN4QixZQUFJLEtBQUssS0FBTCxDQUFXLElBQVgsWUFBMkIsT0FBM0IsRUFBb0M7QUFDcEMsaUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsU0FBUyxxQkFBVCxDQUErQixPQUEvQixFQUF3QyxLQUF4QyxFQUErQztBQUNoRSxvQkFBSSxLQUFLLFFBQUwsSUFBaUIsS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFvQixPQUFwQixFQUE2QjtBQUM5Qyx5QkFBSyxRQUFMLENBQWMsRUFBQyxNQUFNLEtBQU4sRUFBZixFQUQ4QztpQkFBbEQ7QUFEZ0UsYUFBL0MsQ0FJbkIsSUFKbUIsQ0FJZCxJQUpjLEVBSVIsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUpiLEVBRG9DO1NBQXhDOzs7QUFuQmEsa0NBNEJqQixpREFBb0I7QUFDaEIsYUFBSyxRQUFMLEdBQWdCLElBQWhCLENBRGdCO0FBRWhCLGFBQUsseUJBQUwsR0FGZ0I7OztBQTVCSCxrQ0FpQ2pCLHVEQUF1QjtBQUNuQixhQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0FEbUI7OztBQWpDTixrQ0FxQ2pCLG1EQUFxQjtBQUNqQixhQUFLLHlCQUFMLEdBRGlCOzs7QUFyQ0osa0NBeUNqQixpQ0FBVyxjQUFjO0FBQ3JCLGVBQU8sMEJBQUc7QUFDTixzQ0FBMEIsSUFBMUI7QUFDQSwyQ0FBK0IsS0FBSyxLQUFMLENBQVcsSUFBWDtBQUMvQiwwQ0FBOEIsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQy9CLDhDQUFrQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLFlBQTJCLE9BQTNCO1NBSi9CLEtBS0QsZUFBZSxNQUFNLFlBQU4sR0FBcUIsRUFBcEMsQ0FMQyxDQURjOzs7QUF6Q1Isa0NBa0RqQiw2Q0FBaUIsU0FBUztBQUN0QixZQUFJLG1CQUFtQixPQUFuQixFQUE0QjtBQUM1QixtQkFBUSxrREFBUyxLQUFLLEtBQUwsSUFBWSxXQUFXLEtBQUssVUFBTCxFQUFYLEdBQXJCLENBQVIsQ0FENEI7U0FBaEM7O0FBSUEsZUFBTyxnQkFBTSxZQUFOLENBQW1CLE9BQW5CLGVBQ0EsS0FBSyxLQUFMO0FBQ0gsdUJBQVcsS0FBSyxVQUFMLENBQWdCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsS0FBaEIsQ0FBc0IsU0FBdEIsQ0FBM0I7VUFGRyxDQUFQLENBTHNCOzs7QUFsRFQsa0NBNkRqQiwyQkFBUztBQUNMLGVBQU8sS0FBSyxnQkFBTCxDQUFzQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQTdCLENBREs7OztXQTdEUTs7O29CQUNWLFlBQVk7QUFDZixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDTixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7O2tCQUhPIiwiZmlsZSI6Iml0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRlZFZpZXdJdGVtIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBldmVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgIH1cblxuICAgIF9tb3VudGVkID0gZmFsc2VcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldEl0ZW1EYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdW50ZWQgJiYgdGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21vdW50ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5fbW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWV2ZW4nOiB0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICBjbG9uZVdpdGhDbGFzc2VzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PjwvZGl2Pik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGVsZW1lbnQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZVdpdGhDbGFzc2VzKHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgfVxufVxuIl19