import UIView from '../UIView';
import React from 'react';

// TODO: remap incoming props to have fasthash of content for unique, but consistent key

class UIList extends UIView {
    initialState() {
        return {
            activeItem: null,
            isRTL: document.documentElement.getAttribute('dir') === 'rtl'
        };
    }

    render() {
        let nodeType = 'div';

        switch (this.props.type) {
        case 'bullet':
            nodeType = 'ul';
            break;

        case 'number':
            nodeType = 'ol';
            break;
        }

        return React.createElement(nodeType, {
            className: 'ui-list',
            onKeyDown: this.handleKeyDown.bind(this),
            children: this.renderContent()
        });
    }

    renderContent() {
        let nodeType = this.props.type ? 'li' : 'span';

        return this.props.items.map((item, index) => {
            return React.createElement(nodeType, {
                className: 'ui-list-item',
                ref: index,
                key: this.createHashedKey(item) + index, // in case 2 pieces of content are identical
                tabIndex: 0,
                onBlur: this.handleItemBlur.bind(this, item),
                onFocus: this.handleItemFocus.bind(this, item),
                children: item
            });
        });
    }

    getNextItemIndex(currentItem) {
        let next = this.props.items.indexOf(currentItem) + 1;

        return next < this.props.items.length ? next : 0;
    }

    getPreviousItemIndex(currentItem) {
        let previous = this.props.items.indexOf(currentItem) - 1;

        return previous < 0 ? this.props.items.length - 1 : previous;
    }

    setFocus(index) {
        React.findDOMNode(this.refs[index]).focus();
    }

    handleKeyDown(event) {
        const key = event.key;
        const rtl = this.state.isRTL;
        const hasType = !!this.props.type;
        const items = this.props.items;
        const activeItem = this.state.activeItem;
        const atEnd = items.indexOf(activeItem) + 1 === items.length;
        const atStart = items.indexOf(activeItem) === 0;

        if (key === 'ArrowLeft'
            || (key === 'ArrowUp' && hasType)
            || (key === 'Tab' && !atEnd && !event.shiftKey)) {
            this.setFocus(this['get' + (rtl ? 'Next' : 'Previous') + 'ItemIndex'](activeItem));
        } else if (key === 'ArrowRight'
            || (key === 'ArrowDown' && hasType)
            || (key === 'Tab' && !atStart && event.shiftKey)) {
            this.setFocus(this['get' + (rtl ? 'Previous' : 'Next') + 'ItemIndex'](activeItem));
        }
    }

    handleItemBlur(item) {
        if (this.state.activeItem === item) {
            this.setState({activeItem: null});
        }
    }

    handleItemFocus(item) {
        this.setState({activeItem: item});
    }
}

UIList.defaultProps = {
    items: []
};

UIList.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.node),
    type: React.PropTypes.oneOf(['bullet', 'number'])
};

export default UIList;
