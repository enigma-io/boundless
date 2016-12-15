/**
 * Returns the appropriate vendor-prefixed property for use in programmatic
 * transform style manipulation.
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */
export default (function detectTransformProperty() {
    const possibilities = [
        'transform',
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform',
        'webkit-transform', // used in JSDOM
    ];

    for (let i = 0, len = possibilities.length; i < len; i++) {
        if (possibilities[i] in document.documentElement.style) {
            return possibilities[i];
        }
    }

    return false;
})();
