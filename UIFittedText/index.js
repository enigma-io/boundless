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
        let node = ReactDOM.findDOMNode(this);
        let container = node.parentNode;
        let containerBox = window.getComputedStyle(container);
        let containerHeight = toI(containerBox.height);
        let containerWidth = toI(containerBox.width);
        let fontSize = toI(window.getComputedStyle(node).fontSize);

        if (   containerBox.boxSizing === 'border-box'
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
            <span {...this.props.attrs}
                  className={cx({
                      'ui-text': true,
                      [this.props.className]: !!this.props.className,
                      [this.props.attrs.className]: !!this.props.attrs.className,
                  })}
                  id={this.props.id || this.props.attrs.id}
                  style={{...this.props.style, ...this.props.attrs.style}}>
                {this.props.children}
            </span>
        );
    }
}

UIFittedText.defaultProps = {
    attrs: {},
    maxFontSize: Number.MAX_VALUE,
};

UIFittedText.propTypes = {
    attrs: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    maxFontSize: React.PropTypes.number,
    style: React.PropTypes.object,
};

export default UIFittedText;
