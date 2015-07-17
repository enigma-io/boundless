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
        let container = node.parentNode;
        let fontSize = parseInt(window.getComputedStyle(node).fontSize, 10);

        // needs to take container inner padding into account, which is why we're using client<Dimension>
        let optimizeForWidth = Math.floor((fontSize / node.offsetWidth) * container.clientWidth);
        let optimizeForHeight = Math.floor((fontSize / node.offsetHeight) * container.clientHeight);

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
