/**
 * Returns an intersection of the first argument against the second argument's keys.
 * e.g. used in Typeahead to identify which props are meant for Input
 *
 * @param  {Object} obj1
 * @param  {Object} obj2
 *
 * @return {Object} key: values in obj1 matching the keys supplied in obj2
 */

export default function getIntersection(obj1, obj2) {
    return Object.keys(obj2).reduce((childProps, key) => {
        if (key in obj1) {
            childProps[key] = obj1[key];
        }

        return childProps;

    }, {});
}
