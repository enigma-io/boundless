import {createElement, PropTypes, PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';

const instances = [];

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

function rescale(instance) {
    const node = findDOMNode(instance);
    const containerBox = window.getComputedStyle(node.parentNode);
    const fontSize = toI(window.getComputedStyle(node).fontSize);

    if (instance.baseFontSize === null) {
        instance.baseFontSize = fontSize;
    }

    let containerHeight = toI(containerBox.height);
    let containerWidth = toI(containerBox.width);

    // need to account for padding
    if (containerBox.boxSizing === 'border-box' || containerBox.boxSizing === 'padding-box') {
        containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
        containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
    }

    const optimizeForHeight = Math.floor((fontSize / node.offsetHeight) * containerHeight);
    const optimizeForWidth = Math.floor((fontSize / node.offsetWidth) * containerWidth);

    // if upscaling is allowed, that changes the math a bit
    if (instance.props.upscale) {
        node.style.fontSize = (Math.max(optimizeForHeight, optimizeForWidth) || 1) + 'px';
    } else {
        node.style.fontSize = (Math.min(instance.baseFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
    }
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
This component can be useful in situations where an internationalized string is being placed into the UI and it's unclear if all variations of it will fit without excessive amounts of edge-case CSS. Ultimately, it's good at making sure what you put in doesn't overflow.
 */
export default class FittedText extends PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * any valid HTML tag name
         */
        component: PropTypes.string,

        /**
         * controls if FittedText will automatically scale up the content to fit the available space; normally the component
         * only scales text down as needed to fit
         */
        upscale: PropTypes.bool,
    }

    static defaultProps = {
        component: 'span',
        upscale: false,
    }

    static internalKeys = Object.keys(FittedText.defaultProps)

    // set during the first rescale() run
    baseFontSize = null

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
