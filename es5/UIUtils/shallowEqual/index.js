'use strict';

exports.__esModule = true;
exports.default = checkShallowEquality;
var getExactType = function retrieveDeepType(object) {
    return Object.prototype.toString.call(object);
};

var compareObjectKeys = function compareObjectKeys(key, baseArray) {
    return typeof this[key] !== 'undefined' && baseArray[key] === this[key];
}; // `this` is set to the comparison array

function checkShallowEquality(a, b) {
    if (a === b) {
        return true;
    }

    var type = getExactType(a);

    if (type !== getExactType(b) // type mismatches can't be compared
     || type !== '[object Object]' && type !== '[object Array]') {
        // functions, Promises, etc cannot be directly compared
        return false;
    }

    if (type === '[object Object]') {
        return Object.keys(a).every(compareObjectKeys, b) && Object.keys(b).every(compareObjectKeys, a);
    }

    return a.every(function validateArrayItemExists(item) {
        return b.indexOf(item) !== -1;
    }) && b.every(function validateArrayItemExists(item) {
        return a.indexOf(item) !== -1;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvc2hhbGxvd0VxdWFsL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFRd0I7QUFSeEIsSUFBTSxlQUFlLFNBQVMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0M7QUFDbkQsV0FBTyxPQUFPLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsTUFBL0IsQ0FBUCxDQURtRDtDQUFsQzs7QUFJckIsSUFBTSxvQkFBb0IsU0FBUyxpQkFBVCxDQUEyQixHQUEzQixFQUFnQyxTQUFoQyxFQUEyQztBQUNqRSxXQUFPLE9BQU8sS0FBSyxHQUFMLENBQVAsS0FBcUIsV0FBckIsSUFBb0MsVUFBVSxHQUFWLE1BQW1CLEtBQUssR0FBTCxDQUFuQixDQURzQjtDQUEzQzs7QUFJWCxTQUFTLG9CQUFULENBQThCLENBQTlCLEVBQWlDLENBQWpDLEVBQW9DO0FBQy9DLFFBQUksTUFBTSxDQUFOLEVBQVM7QUFDVCxlQUFPLElBQVAsQ0FEUztLQUFiOztBQUlBLFFBQU0sT0FBTyxhQUFhLENBQWIsQ0FBUCxDQUx5Qzs7QUFPL0MsUUFBUSxTQUFTLGFBQWEsQ0FBYixDQUFUO1FBQ0EsU0FBUyxpQkFBVCxJQUE4QixTQUFTLGdCQUFULEVBQTRCOztBQUM5RCxlQUFPLEtBQVAsQ0FEOEQ7S0FEbEU7O0FBS0EsUUFBSSxTQUFTLGlCQUFULEVBQTRCO0FBQzVCLGVBQU8sT0FBTyxJQUFQLENBQVksQ0FBWixFQUFlLEtBQWYsQ0FBcUIsaUJBQXJCLEVBQXdDLENBQXhDLEtBQThDLE9BQU8sSUFBUCxDQUFZLENBQVosRUFBZSxLQUFmLENBQXFCLGlCQUFyQixFQUF3QyxDQUF4QyxDQUE5QyxDQURxQjtLQUFoQzs7QUFJQSxXQUFVLEVBQUUsS0FBRixDQUFRLFNBQVMsdUJBQVQsQ0FBaUMsSUFBakMsRUFBdUM7QUFBRSxlQUFPLEVBQUUsT0FBRixDQUFVLElBQVYsTUFBb0IsQ0FBQyxDQUFELENBQTdCO0tBQXZDLENBQVIsSUFDQSxFQUFFLEtBQUYsQ0FBUSxTQUFTLHVCQUFULENBQWlDLElBQWpDLEVBQXVDO0FBQUUsZUFBTyxFQUFFLE9BQUYsQ0FBVSxJQUFWLE1BQW9CLENBQUMsQ0FBRCxDQUE3QjtLQUF2QyxDQURSLENBaEJxQztDQUFwQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldEV4YWN0VHlwZSA9IGZ1bmN0aW9uIHJldHJpZXZlRGVlcFR5cGUob2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xufTtcblxuY29uc3QgY29tcGFyZU9iamVjdEtleXMgPSBmdW5jdGlvbiBjb21wYXJlT2JqZWN0S2V5cyhrZXksIGJhc2VBcnJheSkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpc1trZXldICE9PSAndW5kZWZpbmVkJyAmJiBiYXNlQXJyYXlba2V5XSA9PT0gdGhpc1trZXldO1xufTsgLy8gYHRoaXNgIGlzIHNldCB0byB0aGUgY29tcGFyaXNvbiBhcnJheVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja1NoYWxsb3dFcXVhbGl0eShhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IGdldEV4YWN0VHlwZShhKTtcblxuICAgIGlmICggICAgdHlwZSAhPT0gZ2V0RXhhY3RUeXBlKGIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBtaXNtYXRjaGVzIGNhbid0IGJlIGNvbXBhcmVkXG4gICAgICAgIHx8ICh0eXBlICE9PSAnW29iamVjdCBPYmplY3RdJyAmJiB0eXBlICE9PSAnW29iamVjdCBBcnJheV0nKSkgeyAvLyBmdW5jdGlvbnMsIFByb21pc2VzLCBldGMgY2Fubm90IGJlIGRpcmVjdGx5IGNvbXBhcmVkXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBiKSAmJiBPYmplY3Qua2V5cyhiKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICAgIGEuZXZlcnkoZnVuY3Rpb24gdmFsaWRhdGVBcnJheUl0ZW1FeGlzdHMoaXRlbSkgeyByZXR1cm4gYi5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSlcbiAgICAgICAgICAgJiYgYi5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBhLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KTtcbn1cbiJdfQ==