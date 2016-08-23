/**
 * Fit given text inside a parent container, obeying implict and explicit constraints.
 * @class UIFittedText
 */

import React from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import omit from 'lodash.omit';

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

    if (containerBox.boxSizing === 'border-box' || containerBox.boxSizing === 'padding-box') { // need to account for padding
        containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
        containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
    }

    const optimizeForHeight = Math.floor((fontSize / node.offsetHeight) * containerHeight);
    const optimizeForWidth = Math.floor((fontSize / node.offsetWidth) * containerWidth);

    // the || 1 is a fallback to prevent fontSize from being set to zero, which fubars things
    node.style.fontSize = (Math.min(instance.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
}

function handleWindowResize() {
    instances.forEach(instance => rescale(instance));
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

export default class UIFittedText extends React.PureComponent {
    static defaultProps = {
        maxFontSize: Number.MAX_VALUE,
    }

    static propTypes = {
        children: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        maxFontSize: React.PropTypes.number,
    }

    static internalKeys = Object.keys(UIFittedText.propTypes)

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
            <span {...omit(this.props, UIFittedText.internalKeys)}
                  className={cx({
                      'ui-text': true,
                      [this.props.className]: !!this.props.className,
                  })}>
                {this.props.children}
            </span>
        );
    }
}
