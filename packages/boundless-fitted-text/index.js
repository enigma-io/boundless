import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import omit from '../boundless-utils-omit-keys/index';

const instances = [];

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

function rescale(instance) {
    const node = findDOMNode(instance);
    const containerBox = window.getComputedStyle(node.parentNode);
    const fontSize = toI(window.getComputedStyle(node).fontSize);

    let containerHeight = toI(containerBox.height);
    let containerWidth = toI(containerBox.width);

    // need to account for padding
    if (containerBox.boxSizing === 'border-box' || containerBox.boxSizing === 'padding-box') {
        containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
        containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
    }

    const optimizeForHeight = Math.floor((fontSize / node.offsetHeight) * containerHeight);
    const optimizeForWidth = Math.floor((fontSize / node.offsetWidth) * containerWidth);

    // the || 1 is a fallback to prevent fontSize from being set to zero, which fubars things
    node.style.fontSize = (Math.min(instance.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
}

function handleWindowResize() {
    instances.forEach((instance) => rescale(instance));
}

function registerInstance(instance) {
    if (instances.length === 0) {
        window.addEventListener('resize', handleWindowResize, true);
    }

    instances.push(instance);
}

function unregisterInstance(instance) {
    instances.splice(instances.indexOf(instance), 1);

    if (instances.length === 0) {
        window.removeEventListener('resize', handleWindowResize, true);
    }
}

/**
# FittedText
__Fit given text inside a parent container, obeying implict and explicit constraints.__

The most common use case for this class is fitting single-line text of unknown/variable length into a button or heading with finite boundaries.
 */
export default class FittedText extends React.PureComponent {
    static propTypes = {
        /**
         * any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`
         */
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        /**
         * an upper bound (in pixels) for how large the text is allowed to grow
         */
        maxFontSize: PropTypes.number,
    }

    static defaultProps = {
        component: 'span',
        maxFontSize: Number.MAX_VALUE,
    }

    static internalKeys = Object.keys(FittedText.defaultProps)

    componentDidMount() {
        rescale(this);

        // there are likely to be multiple instances of this component on a page, so it makes sense to just use
        // a shared global resize listener instead of each component having its own
        registerInstance(this);
    }

    componentDidUpdate() {
        rescale(this);
    }

    componentWillUnmount() {
        unregisterInstance(this);
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, FittedText.internalKeys)}
                className={cx('b-text', this.props.className)}>
                {this.props.children}
            </this.props.component>
        );
    }
}
