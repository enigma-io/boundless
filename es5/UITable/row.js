'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _transform = require('../UIUtils/transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITableRow = (function (_UIView) {
    _inherits(UITableRow, _UIView);

    function UITableRow() {
        var _Object$getPrototypeO;

        _classCallCheck(this, UITableRow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UITableRow)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(UITableRow, [{
        key: 'initialState',
        value: function initialState() {
            return {
                data: this.props.data
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.data !== this.props.data) {
                this.setState({ data: nextProps.data });
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return true;
        }
    }, {
        key: 'waitForContentIfNecessary',
        value: function waitForContentIfNecessary() {
            if (this.state.data instanceof Promise) {
                this.state.data.then((function cautiouslySetRowData(promise, value) {
                    if (this.state.data === promise) {
                        this.setState({ data: value });
                    } // only replace if we're looking at the same promise, otherwise do nothing
                }).bind(this, this.state.data));
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.waitForContentIfNecessary();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.waitForContentIfNecessary();
        }
    }, {
        key: 'getClasses',
        value: function getClasses() {
            var classes = 'ui-table-row';

            if (this.props.even) {
                classes += ' ui-table-row-even';
            } else {
                classes += ' ui-table-row-odd';
            }

            if (this.state.data instanceof Promise) {
                classes += ' ui-table-row-loading';
            }

            if (this.props.active) {
                classes += ' ui-table-row-active';
            }

            return classes;
        }
    }, {
        key: 'renderCells',
        value: function renderCells() {
            var _this2 = this;

            var data = this.state.data instanceof Promise ? {} : this.state.data;

            if (data) {
                return this.props.columns.map(function (definition, index) {
                    return _react2.default.createElement(_cell2.default, { key: index,
                        content: data[definition.mapping],
                        width: definition.width,
                        onInteract: _this2.props.onCellInteract,
                        row: _this2.state.data });
                });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onInteract) {
                event.persist();
                this.props.onInteract(event, this.state.data);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.getClasses(),
                    style: _defineProperty({}, _transform2.default, this.props.y ? 'translate3d(0px, ' + this.props.y + 'px, 0px)' : null),
                    onClick: this.handleClick },
                this.renderCells()
            );
        }
    }]);

    return UITableRow;
})(_UIView3.default);

UITableRow.propTypes = {
    columns: _react2.default.PropTypes.array,
    even: _react2.default.PropTypes.bool,
    data: _react2.default.PropTypes.object,
    onCellInteract: _react2.default.PropTypes.func,
    onInteract: _react2.default.PropTypes.func,
    y: _react2.default.PropTypes.number
};

exports.default = UITableRow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvcm93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLTSxVQUFVO2NBQVYsVUFBVTs7QUFDWixhQURFLFVBQVUsR0FDUzs7OzhCQURuQixVQUFVOzswQ0FDRyxJQUFJO0FBQUosZ0JBQUk7OztvR0FEakIsVUFBVSxtREFFQyxJQUFJOztBQUViLGNBQUssV0FBVyxHQUFHLE1BQUssV0FBVyxDQUFDLElBQUksT0FBTSxDQUFDOztLQUNsRDs7aUJBTEMsVUFBVTs7dUNBT0c7QUFDWCxtQkFBTztBQUNILG9CQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ3hCLENBQUM7U0FDTDs7O2tEQUV5QixTQUFTLEVBQUU7QUFDakMsZ0JBQUksU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNwQyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzQztTQUNKOzs7Z0RBRXVCO0FBQ3BCLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7b0RBRTJCO0FBQ3hCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLE9BQU8sRUFBRTtBQUNwQyxvQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsU0FBUyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQy9ELHdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUM3Qiw0QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO3FCQUNoQztBQUFBLGlCQUNKLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKOzs7NENBRW1CO0FBQ2hCLGdCQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNwQzs7OzZDQUVvQjtBQUNqQixnQkFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDcEM7OztxQ0FFWTtBQUNULGdCQUFJLE9BQU8sR0FBRyxjQUFjLENBQUM7O0FBRTdCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO0FBQ2pCLHVCQUFPLElBQUksb0JBQW9CLENBQUM7YUFDbkMsTUFBTTtBQUNILHVCQUFPLElBQUksbUJBQW1CLENBQUM7YUFDbEM7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksT0FBTyxFQUFFO0FBQ3BDLHVCQUFPLElBQUksdUJBQXVCLENBQUM7YUFDdEM7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDbkIsdUJBQU8sSUFBSSxzQkFBc0IsQ0FBQzthQUNyQzs7QUFFRCxtQkFBTyxPQUFPLENBQUM7U0FDbEI7OztzQ0FFYTs7O0FBQ1YsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLE9BQU8sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7O0FBRXJFLGdCQUFJLElBQUksRUFBRTtBQUNOLHVCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUs7QUFDakQsMkJBQ0ksZ0RBQU0sR0FBRyxFQUFFLEtBQUssQUFBQztBQUNYLCtCQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQUFBQztBQUNsQyw2QkFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEFBQUM7QUFDeEIsa0NBQVUsRUFBRSxPQUFLLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDdEMsMkJBQUcsRUFBRSxPQUFLLEtBQUssQ0FBQyxJQUFJLEFBQUMsR0FBRyxDQUNoQztpQkFDTCxDQUFDLENBQUM7YUFDTjtTQUNKOzs7b0NBRVcsS0FBSyxFQUFFO0FBQ2YsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDdkIscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakQ7U0FDSjs7O2lDQUVRO0FBQ0wsbUJBQ0k7O2tCQUFLLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEFBQUM7QUFDN0IseUJBQUssMkNBQ2lCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyx5QkFDUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQ2hDLElBQUksQ0FDeEI7QUFDRiwyQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUM7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUU7YUFDakIsQ0FDUjtTQUNMOzs7V0FoR0MsVUFBVTs7O0FBbUdoQixVQUFVLENBQUMsU0FBUyxHQUFHO0FBQ25CLFdBQU8sRUFBRSxnQkFBTSxTQUFTLENBQUMsS0FBSztBQUM5QixRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDMUIsUUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzVCLGtCQUFjLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLEtBQUMsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUM1QixDQUFDOztrQkFFYSxVQUFVIiwiZmlsZSI6InJvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgQ2VsbCBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuXG5jbGFzcyBVSVRhYmxlUm93IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKCkge1xuICAgICAgICBsZXQgY2xhc3NlcyA9ICd1aS10YWJsZS1yb3cnO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV2ZW4pIHtcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gJyB1aS10YWJsZS1yb3ctZXZlbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgdWktdGFibGUtcm93LW9kZCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFjdGl2ZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1hY3RpdmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2VsbHMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSA/IHt9IDogdGhpcy5zdGF0ZS5kYXRhO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtkYXRhW2RlZmluaXRpb24ubWFwcGluZ119XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtkZWZpbml0aW9uLndpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIFt0cmFuc2Zvcm1Qcm9wXTogICB0aGlzLnByb3BzLnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGB0cmFuc2xhdGUzZCgwcHgsICR7dGhpcy5wcm9wcy55fXB4LCAwcHgpYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDZWxscygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlUm93LnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgZXZlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgeTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGVSb3c7XG4iXX0=