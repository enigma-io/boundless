/**
 * A utility view for paging the display of many data items of varying sizes.
 * @class UIPagination
 */

import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import omit from 'lodash.omit';

import UIView from '../UIView';
import UISegmentedControl from '../UISegmentedControl';
import UIArrowKeyNavigation from '../UIArrowKeyNavigation';
import noop from '../UIUtils/noop';

class Item extends UIView {
    static propTypes = {
        even: PropTypes.bool,
        data: PropTypes.object,
        index: PropTypes.number,
        itemToJSXConverterFunc: PropTypes.func,
    }

    static internal_keys = Object.keys(Item.propTypes)

    state = {
        data: this.maybeConvertToJSX(this.props.data),
    }

    __mounted = false

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({data: this.maybeConvertToJSX(nextProps.data)});
        }
    }

    maybeConvertToJSX(data) {
        return data instanceof Promise ? data : this.props.itemToJSXConverterFunc(data);
    }

    waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.__mounted && this.state.data === promise) {
                    this.setState({data: this.props.itemToJSXConverterFunc(value)});
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
            return (<div {...omit(this.props, Item.internal_keys)} className={this.getClasses()} />);
        }

        return React.cloneElement(this.state.data, {
            ...omit(this.props, Item.internal_keys),
            className: this.getClasses(this.state.data.props.className),
            'data-index': this.props.index,
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
        itemToJSXConverterFunc: PropTypes.func,
        jumpToFirstControlContent: PropTypes.node,
        jumpToLastControlContent: PropTypes.node,
        listWrapperProps: PropTypes.object,
        nextPageControlContent: PropTypes.node,

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
        previousPageControlContent: PropTypes.node,
        showJumpToFirst: PropTypes.bool,
        showJumpToLast: PropTypes.bool,
        toggleWrapperProps: PropTypes.object,
        totalItems: PropTypes.number.isRequired,
    }

    static internal_keys = Object.keys(UIPagination.propTypes)

    static defaultProps = {
        getItem: noop,
        hidePagerIfNotNeeded: false,
        itemToJSXConverterFunc: data => data,
        jumpToFirstControlContent: '« First',
        jumpToLastControlContent: 'Last »',
        listWrapperProps: {},
        nextPageControlContent: 'Next ›',
        numItemsPerPage: 10,
        numPageToggles: 5,
        pagerPosition: 1,
        position: UIPagination.positions.ABOVE,
        previousPageControlContent: '‹ Previous',
        showJumpToFirst: true,
        showJumpToLast: true,
        toggleWrapperProps: {},
    }

    state = {
        currentPage: this.props.pagerPosition,
        numberOfPages: Math.ceil(this.props.totalItems / this.props.numItemsPerPage),
        totalItems: this.props.totalItems,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            findDOMNode(this.refs.item_0).focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        const numberOfPages = Math.ceil(nextProps.totalItems / nextProps.numItemsPerPage);

        this.setState({
            currentPage:   nextProps.identifier === this.props.identifier
                         ? Math.min(this.state.currentPage, numberOfPages)
                         : 1,
            numberOfPages: numberOfPages,
            totalItems: nextProps.totalItems,
        });
    }

    currentPage = () => this.state.currentPage

    createPageButtonOptions() {
        const options = [];
        const currentPage = this.state.currentPage;
        const numPageToggles = this.props.numPageToggles;
        const startPage = currentPage - ((currentPage - 1) % numPageToggles);
        const endPage = Math.min(startPage + numPageToggles - 1, this.state.numberOfPages);

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlContent,
                value: UIPagination.controls.FIRST,
                disabled: this.state.currentPage === 1,
                className: 'ui-pagination-control ui-pagination-control-first',
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlContent,
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
            content: this.props.nextPageControlContent,
            value: UIPagination.controls.NEXT,
            disabled: this.state.currentPage === this.state.numberOfPages,
            className: 'ui-pagination-control ui-pagination-control-next',
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlContent,
                value: UIPagination.controls.LAST,
                disabled: this.state.currentPage === this.state.numberOfPages,
                className: 'ui-pagination-control ui-pagination-control-last',
            });
        }

        return options;
    }

    generateItems(currentPage) {
        const generatedItems = [];
        const firstItemIndex = (currentPage - 1) * this.props.numItemsPerPage;
        const lastItemIndex = Math.min(this.props.totalItems, firstItemIndex + this.props.numItemsPerPage) - 1;

        for (let i = firstItemIndex; i <= lastItemIndex; i++) {
            generatedItems.push({data: this.props.getItem(i)});
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

        this.setState({ currentPage: pageNumber });
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
                {this.generateItems(this.state.currentPage).map((item, index) => {
                    return (
                        <Item
                            ref={`item_${index}`}
                            key={index}
                            data={item.data}
                            even={index % 2 === 0}
                            index={this.state.currentPage - 1 + index}
                            itemToJSXConverterFunc={this.props.itemToJSXConverterFunc} />
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
                {...omit(this.props, UIPagination.internal_keys)}
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
