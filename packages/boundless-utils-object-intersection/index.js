export default function getIntersection(obj1, obj2) {
    return Object.keys(obj2).reduce((childProps, key) => {
        if (key in obj1) {
            childProps[key] = obj1[key];
        }

        return childProps;

    }, {});
}
