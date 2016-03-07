/**
 * Fit given text inside a parent container, obeying implict and explicit constraints.
 * @class UIFittedText
 */

import React from 'react';
import {findDOMNode} from 'react-dom';
import UIView from '../UIView';
import cx from 'classnames';

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

export default class UIFittedText extends UIView {
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

    componentDidMount() {
        this.rescale();

        window.addEventListener('resize', this.rescale, true);
    }

    componentDidUpdate() {
        this.rescale();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.rescale, true);
    }

    rescale = () => {
        const node = findDOMNode(this);
        const containerBox = window.getComputedStyle(node.parentNode);
        const fontSize = toI(window.getComputedStyle(node).fontSize);

        let containerHeight = toI(containerBox.height);
        let containerWidth = toI(containerBox.width);

        if (   containerBox.boxSizing === 'border-box'
            || containerBox.boxSizing === 'padding-box') { // need to account for padding
            containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
            containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
        }

        const optimizeForHeight = Math.floor((fontSize / node.offsetHeight) * containerHeight);
        const optimizeForWidth = Math.floor((fontSize / node.offsetWidth) * containerWidth);

        // the || 1 is a fallback to prevent fontSize from being set to zero, which fubars things
        node.style.fontSize = (Math.min(this.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
    }

    render() {
        return (
            <span {...this.props}
                  className={cx({
                      'ui-text': true,
                      [this.props.className]: !!this.props.className,
                  })}>
                {this.props.children}
            </span>
        );
    }
}
