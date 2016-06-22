/**
 * A utility view for paging the display of many data items of varying sizes.
 * @class UIPagination
 */

import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import UIView from '../UIView';
import UISegmentedControl from '../UISegmentedControl';
import UIArrowKeyNavigation from '../UIArrowKeyNavigation';
import noop from '../UIUtils/noop';

import cx from 'classnames';

class Item extends UIView {
    static propTypes = {
        even: PropTypes.bool,
        data: PropTypes.object,
        index: PropTypes.number,
    }

    state = {
        data: this.props.data,
    }

    __mounted = false

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.__mounted && this.state.data === promise) {
                    this.setState({data: value});
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    }

    componentDidMount() {
        this.__mounted = true;
        this.waitForContentIfNecessary();
    }

    componentWillUnmount() {
        this.__mounted = false;
    }

    componentDidUpdate() {
        this.waitForContentIfNecessary();
    }

    getClasses(extraClasses) {
        return cx({
            'ui-pagination-item': true,
            'ui-pagination-item-even': this.props.even,
            'ui-pagination-item-odd': !this.props.even,
            'ui-pagination-item-loading': this.state.data instanceof Promise,
        }) + (extraClasses ? ' ' + extraClasses : '');
    }

    render() {
        if (this.state.data instanceof Promise) {
            return (<div {...this.props} className={this.getClasses()} />);
        }

        return React.cloneElement(this.state.data, {
            ...this.props,
            className: this.getClasses(this.state.data.props.className),
            'data-index': this.props.index,
            data: null,
            even: null,
            index: null,
        });
    }
}

export default class UIPagination extends UIView {
    static controls = {
        FIRST: 'FIRST',
        PREVIOUS: 'PREVIOUS',
        NEXT: 'NEXT',
        LAST: 'LAST',
    }

    static positions = {
        ABOVE: 'ABOVE',
        BELOW: 'BELOW',
        BOTH: 'BOTH',
    }

    static propTypes = {
        getItem: PropTypes.func,
        hidePagerIfNotNeeded: PropTypes.bool,
        identifier: PropTypes.string.isRequired,
        jumpToFirstControlText: PropTypes.string,
        jumpToLastControlText: PropTypes.string,
        listWrapperProps: PropTypes.object,
        nextPageControlText: PropTypes.string,

        numItemsPerPage: function validateNumItemsPerPage(props) {
            if (!Number.isInteger(props.numItemsPerPage)) {
                return new Error('`numItemsPerPage` must be an integer.');
            } else if (props.numItemsPerPage < 1) {
                return new Error('`numItemsPerPage` must be greater than zero.');
            }
        },

        numPageToggles: PropTypes.number,

        pagerPosition: function validatePagerPosition(props) {
            if (!Number.isInteger(props.pagerPosition)) {
                return new Error('`pagerPosition` must be an integer.');
            }

            const numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

            if (props.pagerPosition < 1 || props.pagerPosition > numberOfPages) {
                return new Error('`pagerPosition` must be between 1 and ' + numberOfPages + '.');
            }
        },

        position: PropTypes.oneOf(Object.keys(UIPagination.positions)),
        previousPageControlText: PropTypes.string,
        showJumpToFirst: PropTypes.bool,
        showJumpToLast: PropTypes.bool,
        toggleWrapperProps: PropTypes.object,
        totalItems: PropTypes.number.isRequired,
    }

    static defaultProps = {
        options: [],
        getItem: noop,
        hidePagerIfNotNeeded: false,
        jumpToFirstControlText: '« First',
        jumpToLastControlText: 'Last »',
        listWrapperProps: {},
        nextPageControlText: 'Next ›',
        numItemsPerPage: 10,
        numPageToggles: 5,
        pagerPosition: 1,
        position: UIPagination.positions.ABOVE,
        previousPageControlText: '‹ Previous',
        showJumpToFirst: true,
        showJumpToLast: true,
        toggleWrapperProps: {},
    }

    state = {
        currentPage: this.props.pagerPosition,
        numberOfPages: Math.ceil(this.props.totalItems / this.props.numItemsPerPage),
        numItemsPerPage: this.props.numItemsPerPage,
        numPageToggles: this.props.numPageToggles,
        totalItems: this.props.totalItems,
        shownItems: [{data: this.props.getItem(0)}],
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            findDOMNode(this.refs.item_0).focus();
        }
    }

    componentDidMount() {
        this.setState({shownItems: this.generateItems(this.state.currentPage)});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.identifier !== this.props.identifier) {
            this.setState({
                currentPage: 1,
                shownItems: this.generateItems(1, nextProps.getItem),
            });
        }
    }

    currentPage = () => this.state.currentPage

    createPageButtonOptions() {
        const options = [];
        const numberOfPages = this.state.numberOfPages;
        const currentPage = this.state.currentPage;
        const numPageToggles = this.props.numPageToggles;
        const startPage = currentPage - ((currentPage - 1) % numPageToggles);
        const endPage = Math.min(startPage + numPageToggles - 1, numberOfPages);

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlText,
                value: UIPagination.controls.FIRST,
                disabled: this.state.currentPage === 1,
                className: 'ui-pagination-control ui-pagination-control-first',
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlText,
            value: UIPagination.controls.PREVIOUS,
            disabled: this.state.currentPage === 1,
            className: 'ui-pagination-control ui-pagination-control-previous',
        });

        for (let i = startPage; i <= endPage; i++) {
            options.push({
                className: 'ui-pagination-control',
                'data-page-number': i,
                selected: i === this.state.currentPage,
                content: i,
                value: i,
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlText,
            value: UIPagination.controls.NEXT,
            disabled: this.state.currentPage === this.state.numberOfPages,
            className: 'ui-pagination-control ui-pagination-control-next',
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlText,
                value: UIPagination.controls.LAST,
                disabled: this.state.currentPage === this.state.numberOfPages,
                className: 'ui-pagination-control ui-pagination-control-last',
            });
        }

        return options;
    }

    generateItems(currentPage, getItem = this.props.getItem) {
        const generatedItems = [];
        const firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
        const lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

        for (let i = firstItemIndex; i <= lastItemIndex; i++) {
            generatedItems.push({data: getItem(i)});
        }

        return generatedItems;
    }

    handleClick = (value) => {
        const values = UIPagination.controls;
        let pageNumber;

        switch (value) {
        case values.FIRST:
            pageNumber = 1;
            break;
        case values.PREVIOUS:
            pageNumber = this.state.currentPage - 1;
            break;
        case values.NEXT:
            pageNumber = this.state.currentPage + 1;
            break;
        case values.LAST:
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

    renderItems() {
        const props = this.props.listWrapperProps;

        return (
            <UIArrowKeyNavigation
                {...props}
                ref='itemList'
                className={cx({
                    'ui-pagination-items': true,
                    [props.className]: !!props.className,
                })}>
                {this.state.shownItems.map((item, index) => {
                    return (
                        <Item
                            ref={`item_${index}`}
                            key={index}
                            data={item.data}
                            even={index % 2 === 0}
                            index={this.state.currentPage - 1 + index} />
                    );
                })}
            </UIArrowKeyNavigation>
        );
    }

    renderControls(position) {
        if (   this.props.hidePagerIfNotNeeded
            && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        const props = this.props.toggleWrapperProps;
        const position_lower = position.toLowerCase();
        const position_capitalized = position_lower[0].toUpperCase() + position_lower.slice(1);

        return (
            <UISegmentedControl
                {...props}
                ref={`segmentedControl${position_capitalized}`}
                className={cx({
                    'ui-pagination-controls': true,
                    [`ui-pagination-controls-${position_lower}`]: true,
                    [props.className]: !!props.className,
                })}
                options={this.createPageButtonOptions()}
                onOptionSelected={this.handleClick} />
        );
    }

    renderView() {
        const {props} = this;
        const position = UIPagination.positions;

        return (
            <div
                ref='paginatedView'
                className='ui-pagination'>
                {
                      (props.position === position.ABOVE || props.position === position.BOTH)
                    ? this.renderControls(position.ABOVE)
                    : noop
                }

                {this.renderItems()}

                {
                      (props.position === position.BELOW || props.position === position.BOTH)
                    ? this.renderControls(position.BELOW)
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
                    'ui-pagination-wrapper': true,
                    [this.props.className]: !!this.props.className,
                })}>
                {this.renderView()}
            </div>
        );
    }
}
