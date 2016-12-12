/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */
export default (function detectTransformProperty() {
    const props = [
        'transform',
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform',
        'webkit-transform', // used in JSDOM
    ];

    for (let i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
})();
