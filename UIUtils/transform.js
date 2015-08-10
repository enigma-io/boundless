export default (function detectTransformProperty() {
    let availableProp;
    let props = [
        'transform',
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform'
    ];

    for (let i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.body.style) {
            availableProp = props[i];
            break;
        }
    }

    return availableProp;
})();
