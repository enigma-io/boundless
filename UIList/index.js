/**
 * A generic list view, supporting unstyled, bulleted and numbered output.
 * @class UIList
 */

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

    renderContent() {
        let nodeType = this.props.type ? 'li' : 'span';

        return this.props.items.map((item, index) => {
            return React.createElement(nodeType, {
                className: 'ui-list-item',
                ref: `item_${index}`,
                key: this.createHashedKey(item) + index, // in case 2 pieces of content are identical
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
            ...this.props.attrs,
            ref: 'list',
            className: cx({
                'ui-list': true,
                'ui-list-bulleted': this.props.type === 'bullet',
                'ui-list-numbered': this.props.type === 'number',
                'ui-list-plain': this.props.type !== 'bullet' && this.props.type !== 'number',
                [this.props.className]: !!this.props.className,
                [this.props.attrs.className]: !!this.props.attrs.className,
            }),
            id: this.props.id || this.props.attrs.id,
            onKeyDown: this.handleKeyDown.bind(this),
            style: {...this.props.style, ...this.props.attrs.style},
            children: this.renderContent(),
        });
    }
}

UIList.propTypes = {
    attrs: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.node),
    type: React.PropTypes.oneOf(['bullet', 'number']),
    style: React.PropTypes.object,
};

UIList.defaultProps = {
    attrs: {},
    items: [],
};

export default UIList;
