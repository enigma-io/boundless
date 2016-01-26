/**
 * A generic list view, supporting unstyled, bulleted and numbered output.
 * @class UIList
 */

import React from 'react';
import UIView from '../UIView';
import UIArrowKeyNavigation from '../UIArrowKeyNavigation';
import cx from 'classnames';

class UIList extends UIView {
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

        return (
            <UIArrowKeyNavigation
                {...this.props}
                ref='list'
                className={cx({
                    'ui-list': true,
                    'ui-list-bulleted': this.props.type === 'bullet',
                    'ui-list-numbered': this.props.type === 'number',
                    'ui-list-plain': this.props.type !== 'bullet' && this.props.type !== 'number',
                    [this.props.className]: !!this.props.className,
                })}
                component={nodeType}>
                {this.renderContent()}
            </UIArrowKeyNavigation>
        );
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
