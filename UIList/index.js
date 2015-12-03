/**
 * A generic list view, supporting unstyled, bulleted and numbered output.
 * @class UIList
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';

class UIList extends UIView {
    initialState() {
        return {
            activeItem: null,
        };
    }

    setFocus(index) {
        this.refs[`item_${index}`].focus();
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
        const items = this.props.items;
        const activeItem = this.state.activeItem;

        const next = () => {
            this.setFocus(this.getNextItemIndex(activeItem));
            event.preventDefault();
        };

        const prev = () => {
            event.preventDefault();
            this.setFocus(this.getPreviousItemIndex(activeItem));
        };

        if (key === 'Tab') {
            const activeItemIndex = items.indexOf(activeItem);

            if (event.shiftKey && activeItemIndex !== 0) {
                prev();
            } else if (!event.shiftKey && activeItemIndex !== items.length - 1) {
                next();
            }
        } else {
            switch (key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                prev();
                break;

            case 'ArrowDown':
            case 'ArrowRight':
                next();
                break;
            }
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    renderContent() {
        const nodeType = this.props.type ? 'li' : 'span';

        return this.props.items.map((item, index) => {
            return React.createElement(nodeType, {
                className: 'ui-list-item',
                ref: `item_${index}`,
                key: index,
                tabIndex: 0,
                onBlur: () => this.state.activeItem === item && this.setState({activeItem: null}),
                onFocus: () => this.setState({activeItem: item}),
                children: item,
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
            ...this.props,
            ref: 'list',
            className: cx({
                'ui-list': true,
                'ui-list-bulleted': this.props.type === 'bullet',
                'ui-list-numbered': this.props.type === 'number',
                'ui-list-plain': this.props.type !== 'bullet' && this.props.type !== 'number',
                [this.props.className]: !!this.props.className,
            }),
            onKeyDown: this.handleKeyDown.bind(this),
            children: this.renderContent(),
        });
    }
}

UIList.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.node),
    type: React.PropTypes.oneOf(['bullet', 'number']),
};

UIList.defaultProps = {
    items: [],
};

export default UIList;
