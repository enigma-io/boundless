import UIView from '../UIView';
import React from 'react';

class UIText extends UIView {
    componentDidMount() {
        this.rescale();
    }

    componentDidUpdate() {
        this.rescale();
    }

    render() {
        return (
            <span className='ui-text'>{this.props.text}</span>
        );
    }

    rescale() {
        let node = React.findDOMNode(this);
        let nodeBox = node.getBoundingClientRect();
        let fontSize = window.getComputedStyle(node).fontSize;
        let parentBox = window.getBoundingClientRect(node.parentNode);

        let optimizeForWidth = Math.floor((parseInt(fontSize, 10) / nodeBox.right - nodeBox.left) * (parentBox.right - parentBox.left));
        let optimizeForHeight = Math.floor((parseInt(fontSize, 10) / nodeBox.bottom - nodeBox.top) * (parentBox.bottom - parentBox.top));

        node.style.fontSize = Math.min(this.props.maxSize, optimizeForHeight, optimizeForWidth);
    }
}

UIText.defaultProps = {
    maxSize: Number.MAX_VALUE
};

UIText.propTypes = {
    maxSize: React.PropTypes.number,
    text: React.PropTypes.string
};

export default UIText;

// 50px
// 20px, 10px
