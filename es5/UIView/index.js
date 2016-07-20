'use strict';

exports.__esModule = true;

var _react = require('react');

var _shallowEqual = require('../UIUtils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _uuid2 = require('../UIUtils/uuid');

var _uuid3 = _interopRequireDefault(_uuid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An augmented version of `React.Component` with some helpful abstractions added to smooth
 * the component development process.
 *
 * All UIKit components are based on UIView.
 *
 * @augments {React.Component}
 */

var UIView = function (_Component) {
    _inherits(UIView, _Component);

    /**
     * @param {object} props data passed on to the end component
     */

    function UIView() {
        _classCallCheck(this, UIView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

        _this.state = _this.initialState ? _this.initialState() : {};
        return _this;
    }

    UIView.prototype.uuid = function uuid() {
        if (this.uuid_warning === undefined) {
            this.uuid_warning = true;

            console.warn('Use of UIView.prototype.uuid() is deprecated and will be removed in a future release. Please switch to using UIUtils/uuid instead.');

            return (0, _uuid3.default)();
        }
    };

    /**
     * Approximates the @link{PureRenderMixin https://facebook.github.io/react/docs/pure-render-mixin.html} from ES5 React. Implement shouldComponentUpdate in your subclass to override this functionality.
     *
     * @param  {Object} nextProps the incoming props definition, may differ from current props
     * @param  {Object} nextState the incoming state definition, may differ from current state
     * @return {Boolean}          Informs React to re-render the component.
     *
     * @example
     * shouldComponentUpdate(nextProps, nextState) {
     *     // some logic here, eventually `return` true or false
     *     // current props & state are available for comparison at `this.props`, `this.state`
     * }
     */


    UIView.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _shallowEqual2.default)(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
    };

    /**
     * Emulates the (now removed) React interface `getInitialState`. It's a convenience, but allows
     * for this functionality to work without having to provide a constructor function.
     *
     * @virtual
     * @name UIView#initialState
     *
     * @example
     * initialState() {
     *     return {
     *          items: []
     *     }
     * }
     */


    return UIView;
}(_react.Component);

exports.default = UIView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVmlldy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVXFCLE07Ozs7Ozs7QUFJakIsc0JBQXFCO0FBQUE7O0FBQUEsMENBQU4sSUFBTTtBQUFOLGdCQUFNO0FBQUE7O0FBQUEscURBQ2pCLGdEQUFTLElBQVQsRUFEaUI7O0FBR2pCLGNBQUssS0FBTCxHQUFhLE1BQUssWUFBTCxHQUFvQixNQUFLLFlBQUwsRUFBcEIsR0FBMEMsRUFBdkQ7QUFIaUI7QUFJcEI7O3FCQUVELEksbUJBQU87QUFDSCxZQUFJLEtBQUssWUFBTCxLQUFzQixTQUExQixFQUFxQztBQUNqQyxpQkFBSyxZQUFMLEdBQW9CLElBQXBCOztBQUVBLG9CQUFRLElBQVIsQ0FBYSxvSUFBYjs7QUFFQSxtQkFBTyxxQkFBUDtBQUNIO0FBQ0osSzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBZUQscUIsa0NBQXNCLFMsRUFBVyxTLEVBQVc7QUFDeEMsZUFBTyxDQUFDLDRCQUFhLFNBQWIsRUFBd0IsS0FBSyxLQUE3QixDQUFELElBQXdDLENBQUMsNEJBQWEsU0FBYixFQUF3QixLQUFLLEtBQTdCLENBQWhEO0FBQ0gsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQW5DZ0IsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL1VJVXRpbHMvc2hhbGxvd0VxdWFsJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbi8qKlxuICogQW4gYXVnbWVudGVkIHZlcnNpb24gb2YgYFJlYWN0LkNvbXBvbmVudGAgd2l0aCBzb21lIGhlbHBmdWwgYWJzdHJhY3Rpb25zIGFkZGVkIHRvIHNtb290aFxuICogdGhlIGNvbXBvbmVudCBkZXZlbG9wbWVudCBwcm9jZXNzLlxuICpcbiAqIEFsbCBVSUtpdCBjb21wb25lbnRzIGFyZSBiYXNlZCBvbiBVSVZpZXcuXG4gKlxuICogQGF1Z21lbnRzIHtSZWFjdC5Db21wb25lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVmlldyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzIGRhdGEgcGFzc2VkIG9uIHRvIHRoZSBlbmQgY29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGUgPyB0aGlzLmluaXRpYWxTdGF0ZSgpIDoge307XG4gICAgfVxuXG4gICAgdXVpZCgpIHtcbiAgICAgICAgaWYgKHRoaXMudXVpZF93YXJuaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXVpZF93YXJuaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVc2Ugb2YgVUlWaWV3LnByb3RvdHlwZS51dWlkKCkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2UuIFBsZWFzZSBzd2l0Y2ggdG8gdXNpbmcgVUlVdGlscy91dWlkIGluc3RlYWQuJyk7XG5cbiAgICAgICAgICAgIHJldHVybiB1dWlkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHByb3hpbWF0ZXMgdGhlIEBsaW5re1B1cmVSZW5kZXJNaXhpbiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3B1cmUtcmVuZGVyLW1peGluLmh0bWx9IGZyb20gRVM1IFJlYWN0LiBJbXBsZW1lbnQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIGluIHlvdXIgc3ViY2xhc3MgdG8gb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0UHJvcHMgdGhlIGluY29taW5nIHByb3BzIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHByb3BzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0U3RhdGUgdGhlIGluY29taW5nIHN0YXRlIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHN0YXRlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgSW5mb3JtcyBSZWFjdCB0byByZS1yZW5kZXIgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICogICAgIC8vIHNvbWUgbG9naWMgaGVyZSwgZXZlbnR1YWxseSBgcmV0dXJuYCB0cnVlIG9yIGZhbHNlXG4gICAgICogICAgIC8vIGN1cnJlbnQgcHJvcHMgJiBzdGF0ZSBhcmUgYXZhaWxhYmxlIGZvciBjb21wYXJpc29uIGF0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgXG4gICAgICogfVxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gIXNoYWxsb3dFcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8ICFzaGFsbG93RXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbXVsYXRlcyB0aGUgKG5vdyByZW1vdmVkKSBSZWFjdCBpbnRlcmZhY2UgYGdldEluaXRpYWxTdGF0ZWAuIEl0J3MgYSBjb252ZW5pZW5jZSwgYnV0IGFsbG93c1xuICAgICAqIGZvciB0aGlzIGZ1bmN0aW9uYWxpdHkgdG8gd29yayB3aXRob3V0IGhhdmluZyB0byBwcm92aWRlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBuYW1lIFVJVmlldyNpbml0aWFsU3RhdGVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaW5pdGlhbFN0YXRlKCkge1xuICAgICAqICAgICByZXR1cm4ge1xuICAgICAqICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAqICAgICB9XG4gICAgICogfVxuICAgICAqL1xufVxuIl19