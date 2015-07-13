import UIView from '../UIView';
import React from 'react';

class UIList extends UIView {
    initialState() {
        return {
            activeItem: null
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

    setFocus(index) {
        React.findDOMNode(this.refs[index]).focus();
    }

    getNextItemIndex(currentItem) {
        let next = this.props.items.indexOf(currentItem) + 1;

        return next < this.props.items.length ? next : 0;
    }

    getPreviousItemIndex(currentItem) {
        let previous = this.props.items.indexOf(currentItem) - 1;

        return previous < 0 ? this.props.items.length - 1 : previous;
    }

    handleKeyDown(event) {
        const key = event.key;
        const hasType = !!this.props.type;
        const items = this.props.items;
        const activeItem = this.state.activeItem;

        if (hasType) {
            if (key === 'ArrowUp') {
                this.setFocus(this.getPreviousItemIndex(activeItem));
                event.preventDefault();
            } else if (key === 'ArrowDown') {
                this.setFocus(this.getNextItemIndex(activeItem));
                event.preventDefault();
            }
        } else {
            let activeItemIndex = items.indexOf(activeItem);

            if (key === 'ArrowLeft'
                || (key === 'Tab' && event.shiftKey && activeItemIndex !== 0)) {
                this.setFocus(this.getPreviousItemIndex(activeItem));
                event.preventDefault();
            } else if (key === 'ArrowRight'
                       || (key === 'Tab' && !event.shiftKey && activeItemIndex !== items.length - 1)) {
                this.setFocus(this.getNextItemIndex(activeItem));
                event.preventDefault();
            }
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
