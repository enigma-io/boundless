/**
 * A generic list view, supporting unstyled, bulleted and numbered output.
 * @class UIList
 */

import UIView from '../UIView';
import React from 'react';
import {indexOf, map} from 'lodash';

class UIList extends UIView {
    initialState() {
        return {
            activeItem: null
        };
    }

    getClasses() {
        let classes = ['ui-list'];

        switch (this.props.type) {
        case 'bullet':
            classes.push('ui-list-bulleted');
            break;

        case 'number':
            classes.push('ui-list-numbered');
            break;

        default:
            classes.push('ui-list-plain');
            break;
        }

        return classes.concat(this.props.className || []).join(' ');
    }

    setFocus(index) {
        React.findDOMNode(this.refs[index]).focus();
    }

    getNextItemIndex(currentItem) {
        let next = indexOf(this.props.items, currentItem) + 1;

        return next < this.props.items.length ? next : 0;
    }

    getPreviousItemIndex(currentItem) {
        let previous = indexOf(this.props.items, currentItem) - 1;

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
            let activeItemIndex = indexOf(items, activeItem);

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

    renderContent() {
        let nodeType = this.props.type ? 'li' : 'span';

        return map(this.props.items, (item, index) => {
            return React.createElement(nodeType, {
                className: 'ui-list-item',
                ref: index,
                key: this.createHashedKey(item) + index, // in case 2 pieces of content are identical
                tabIndex: 0,
                onBlur: () => this.state.activeItem === item && this.setState({activeItem: null}),
                onFocus: () => this.setState({activeItem: item}),
                children: item
            });
        });
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
            className: this.getClasses(),
            onKeyDown: this.handleKeyDown.bind(this),
            children: this.renderContent()
        });
    }
}

UIList.defaultProps = {
    items: []
};

UIList.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    items: React.PropTypes.arrayOf(React.PropTypes.node),
    type: React.PropTypes.oneOf(['bullet', 'number'])
};

export default UIList;
