import UIView from '../UIView';
import React from 'react';

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

class UIText extends UIView {
    constructor(...args) {
        super(...args);

        this.rescale = this.rescale.bind(this);
    }

    getClasses() {
        return ['ui-text'].concat(this.props.className || []).join(' ');
    }

    componentDidMount() {
        this.rescale();

        window.addEventListener('resize', this.rescale, true);
    }

    componentDidUpdate() {
        this.rescale();

        window.removeEventListener('resize', this.rescale, true);
    }

    render() {
        return (
            <span {...this.props}
                  className={this.getClasses()}>
                {this.props.children}
            </span>
        );
    }

    rescale() {
        let node = React.findDOMNode(this);
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
}

UIText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};

UIText.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    maxFontSize: React.PropTypes.number
};

export default UIText;
