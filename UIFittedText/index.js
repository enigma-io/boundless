/**
 * Fit given text inside a parent container, obeying implict and explicit constraints.
 * @class UIFittedText
 */

import React from 'react';
import ReactDOM from 'react-dom';
import UIView from '../UIView';
import cx from 'classnames';

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

class UIFittedText extends UIView {
    componentDidMount() {
        this.rescale = this.rescale.bind(this);
        this.rescale();

        window.addEventListener('resize', this.rescale, true);
    }

    componentDidUpdate() {
        this.rescale();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.rescale, true);
    }

    rescale() {
        const node = ReactDOM.findDOMNode(this);
        const container = node.parentNode;
        const containerBox = window.getComputedStyle(container);
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

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE,
};

UIFittedText.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    maxFontSize: React.PropTypes.number,
};

export default UIFittedText;
