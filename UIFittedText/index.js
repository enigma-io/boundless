/**
 * Fit given text inside a parent container, obeying implict and explicit constraints.
 * @class UIFittedText
 */

import UIView from '../UIView';
import React from 'react';
import ReactDOM from 'react-dom';
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
        let node = ReactDOM.findDOMNode(this);
        let container = node.parentNode;
        let containerBox = window.getComputedStyle(container);
        let containerHeight = toI(containerBox.height);
        let containerWidth = toI(containerBox.width);
        let fontSize = toI(window.getComputedStyle(node).fontSize);

        if (containerBox.boxSizing === 'border-box'
            || containerBox.boxSizing === 'padding-box') { // need to account for padding
            containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
            containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
        }

        let optimizeForHeight = Math.floor((fontSize / node.offsetHeight) * containerHeight);
        let optimizeForWidth = Math.floor((fontSize / node.offsetWidth) * containerWidth);

        node.style.fontSize = Math.min(this.props.maxFontSize, optimizeForHeight, optimizeForWidth) + 'px';
    }

    render() {
        return (
            <span {...this.props}
                  className={cx({'ui-text': true, [this.props.className]: !!this.props.className})}>
                {this.props.children}
            </span>
        );
    }
}

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};

UIFittedText.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    className: React.PropTypes.string,
    maxFontSize: React.PropTypes.number
};

export default UIFittedText;
