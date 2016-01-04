/**
 * A controller view for managing the aggregate state of multiple, related radio-style buttons.
 * @class UIPaginatedView
 */

import React from 'react';
import UIView from '../UIView';
import UISegmentedControl from '../UISegmentedControl';
import UIList from '../UIList';
import Item from './item';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIPaginatedView extends UIView {
    initialState() {
        return {
            currentPage: this.props.pagerPosition,
            numberOfPages: Math.ceil(this.props.totalItems / this.props.numItemsPerPage),
            numItemsPerPage: this.props.numItemsPerPage,
            numPageToggles: this.props.numPageToggles,
            totalItems: this.props.totalItems,
            items: [{data: this.props.getItem(0)}],
            shownItems: [{data: this.props.getItem(0)}],
        };
    }

    componentDidUpdate(oldProps, oldState) {
        if (oldState.currentPage !== this.state.currentPage) {
            this.refs.itemList.refs.item_0.focus();
        }
    }

    componentDidMount() {
        this.setState({shownItems: this.generateItems(this.state.currentPage)});
    }

    createPageButtonOptions() {
        let options = [];
        const numberOfPages = this.state.numberOfPages;
        const currentPage = this.state.currentPage;
        const numPageToggles = this.props.numPageToggles;
        const startPage = currentPage - ((currentPage - 1) % numPageToggles);
        const endPage = Math.min(startPage + numPageToggles - 1, numberOfPages);

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlText,
                value: UIPaginatedView.controlValues.FIRST,
                disabled: this.state.currentPage === 1,
                className: 'ui-paginated-view-controls-first',
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlText,
            value: UIPaginatedView.controlValues.PREVIOUS,
            disabled: this.state.currentPage === 1,
            className: 'ui-paginated-view-controls-previous',
        });

        for (let i = startPage; i <= endPage; i++) {
            options.push({
                selected: i === this.state.currentPage,
                content: i,
                value: i,
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlText,
            value: UIPaginatedView.controlValues.NEXT,
            disabled: this.state.currentPage === this.state.numberOfPages,
            className: 'ui-paginated-view-controls-next',
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlText,
                value: UIPaginatedView.controlValues.LAST,
                disabled: this.state.currentPage === this.state.numberOfPages,
                className: 'ui-paginated-view-controls-last',
            });
        }

        return options;
    }

    currentPage() {
        return this.state.currentPage;
    }

    generateItems(currentPage) {
        const generatedItems = [];
        const firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
        const lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

        for (let i = firstItemIndex; i <= lastItemIndex; i++) {
            generatedItems.push({data: this.props.getItem(i)});
        }

        return generatedItems;
    }

    handleClick(value) {
        let pageNumber;

        switch (value) {
        case UIPaginatedView.controlValues.FIRST:
            pageNumber = 1;
            break;
        case UIPaginatedView.controlValues.PREVIOUS:
            pageNumber = this.state.currentPage - 1;
            break;
        case UIPaginatedView.controlValues.NEXT:
            pageNumber = this.state.currentPage + 1;
            break;
        case UIPaginatedView.controlValues.LAST:
            pageNumber = this.state.numberOfPages;
            break;
        default:
            pageNumber = parseInt(value, 10);
        }

        this.setState({
            currentPage: pageNumber,
            shownItems: this.generateItems(pageNumber),
        });
    }

    itemsToArray() {
        let items = [];

        this.state.shownItems.map((item, index) => {
            items.push(
                <Item
                    key={index}
                    data={item.data}
                    even={index % 2 === 0} />
            );
        });

        return items;
    }

    renderItems() {
        return (
            <UIList
                {...this.props.listWrapperProps}
                ref='itemList'
                className={cx({
                    'ui-paginated-view-item-list': true,
                    [this.props.listWrapperProps.className]: !!this.props.listWrapperProps.className,
                })}
                items={this.itemsToArray()} />
        );
    }

    renderControls(position) {
        const positionLowerCase = position.toLowerCase();

        return (
            <UISegmentedControl
                {...this.props.toggleWrapperProps}
                ref={'segmentedControl' + (positionLowerCase[0].toUpperCase() + positionLowerCase.slice(1))}
                className={cx({
                    'ui-paginated-view-controls': true,
                    ['ui-paginated-view-controls-' + positionLowerCase]: true,
                    [this.props.toggleWrapperProps.className]: !!this.props.toggleWrapperProps.className,
                })}
                options={this.createPageButtonOptions()}
                onOptionSelected={this.handleClick.bind(this)}/>
        );
    }

    renderView() {
        return (
            <div
                ref='paginatedView'
                className='ui-paginated-view'>
                {
                    (   this.props.position === UIPaginatedView.position.ABOVE
                     || this.props.position === UIPaginatedView.position.BOTH)
                    ? this.renderControls(UIPaginatedView.position.ABOVE)
                    : noop
                }
                {this.renderItems()}
                {
                    (   this.props.position === UIPaginatedView.position.BELOW
                     || this.props.position === UIPaginatedView.position.BOTH)
                    ? this.renderControls(UIPaginatedView.position.BELOW)
                    : noop
                }
            </div>
        );
    }

    render() {
        return (
            <div
                {...this.props}
                ref='wrapper'
                className={cx({
                    'ui-paginated-view-wrapper': true,
                    [this.props.className]: !!this.props.className,
                })}>
                {this.renderView()}
            </div>
        );
    }
}

UIPaginatedView.controlValues = {
    FIRST: 'FIRST',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    LAST: 'LAST',
};

UIPaginatedView.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BOTH: 'BOTH',
};

UIPaginatedView.propTypes = {
    getItem: React.PropTypes.func,
    jumpToFirstControlText: React.PropTypes.string,
    jumpToLastControlText: React.PropTypes.string,
    listWrapperProps: React.PropTypes.object,
    nextPageControlText: React.PropTypes.string,
    numItemsPerPage: function(props) {
        if (!Number.isInteger(props.numItemsPerPage)) {
            return new Error('`numItemsPerPage` must be an integer.');
        }

        if (props.numItemsPerPage < 1 || props.numItemsPerPage > props.totalItems) {
            return new Error('`numItemsPerPage` must be between 1 and ' + props.totalItems + '.');
        }
    },
    numPageToggles: React.PropTypes.number,
    pagerPosition: function(props) {
        if (!Number.isInteger(props.pagerPosition)) {
            return new Error('`pagerPosition` must be an integer.');
        }

        const numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.pagerPosition < 1 || props.pagerPosition > numberOfPages) {
            return new Error('`pagerPosition` must be between 1 and ' + numberOfPages + '.');
        }
    },
    position: React.PropTypes.oneOf(Object.keys(UIPaginatedView.position)),
    previousPageControlText: React.PropTypes.string,
    showJumpToFirst: React.PropTypes.bool,
    showJumpToLast: React.PropTypes.bool,
    toggleWrapperProps: React.PropTypes.object,
    totalItems: React.PropTypes.number.isRequired,
};

UIPaginatedView.defaultProps = {
    options: [],
    getItem: noop,
    jumpToFirstControlText: '« First',
    jumpToLastControlText: 'Last »',
    listWrapperProps: {},
    nextPageControlText: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    pagerPosition: 1,
    position: UIPaginatedView.position.ABOVE,
    previousPageControlText: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    toggleWrapperProps: {},
};

export default UIPaginatedView;
