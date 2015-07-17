import UIView from '../UIView';
import React from 'react';

class UIText extends UIView {
    getClassNames() {
        return ['ui-text'].concat(this.props.className).join(' ');
    }

    componentDidMount() {
        this.rescale();
    }

    componentDidUpdate() {
        this.rescale();
    }

    render() {
        return (
            <span className={this.getClassNames()}>{this.props.children}</span>
        );
    }

    rescale() {
        let node = React.findDOMNode(this);
        let container = node.parentNode;
        let fontSize = parseInt(window.getComputedStyle(node).fontSize, 10);

        // needs to take container inner padding into account, which is why we're using client<Dimension>
        let optimizeForWidth = Math.floor((fontSize / node.offsetWidth) * container.clientWidth);
        let optimizeForHeight = Math.floor((fontSize / node.offsetHeight) * container.clientHeight);

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
