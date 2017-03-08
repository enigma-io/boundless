export default (function detectTransformProperty() {
    const props = [
        'transform',
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform',
        'webkit-transform',
    ];

    for (let i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
})();
