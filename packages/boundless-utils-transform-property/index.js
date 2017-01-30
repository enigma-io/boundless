/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 *
 * ## Example Usage
 *
 * ```js
 * import transformProperty from 'boundless-utils-transform-property';
 *
 * document.querySelector('.foo').style[transformProperty] = 'translateY(0)';
 * ```
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
