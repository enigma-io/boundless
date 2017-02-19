/**
 * Returns a new object that is an intersection of the keys between the first and second object arguments.
 */
export default function getIntersection(obj1, obj2) {
    return Object.keys(obj2).reduce((childProps, key) => {
        if (key in obj1) {
            childProps[key] = obj1[key];
        }

        return childProps;

    }, {});
}
