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
import uuid from '../UIUtils/uuid';

class Item extends React.Component {
    static propTypes = {
        even: PropTypes.bool,
        data: PropTypes.object,
        dataToJSXConverterFunc: PropTypes.func,
        index: PropTypes.number,
        loadingContent: PropTypes.node,
    }

    static internal_keys = Object.keys(Item.propTypes)

    state = {
        data: this.props.data,
    }

    mounted = false

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.mounted && this.state.data === promise) {
                    this.setState({data: value});
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.waitForContentIfNecessary();
    }

    componentDidUpdate() {
        this.waitForContentIfNecessary();
    }

    componentWillUnmount() {
        this.mounted = false;
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
            return (
                <div {...omit(this.props, Item.internal_keys)} className={this.getClasses()}>
                    {this.props.loadingContent}
                </div>
            );
        }

        const jsx = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

        return React.cloneElement(jsx, {
            ...omit(this.props, Item.internal_keys),
            className: this.getClasses(jsx.props.className),
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
        customControlContent: PropTypes.node,
        getItem: PropTypes.func,
        hidePagerIfNotNeeded: PropTypes.bool,
        identifier: PropTypes.string.isRequired,
        itemLoadingContent: PropTypes.node,
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
        showPaginationState: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),
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
    }

    getFirstVisibleItemIndex() {
        return (this.state.currentPage - 1) * this.props.numItemsPerPage;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            findDOMNode(this.refs.item_0).focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        const numberOfPages = Math.ceil(nextProps.totalItems / nextProps.numItemsPerPage);
        const currentFirstIndex = this.getFirstVisibleItemIndex();

        this.setState({
            currentPage:   nextProps.identifier === this.props.identifier
                         ? Math.min(this.state.currentPage, numberOfPages)
                         : 1,
            numberOfPages: numberOfPages,

           // try to maintain the current items in view if we're looking at the same data source
        }, nextProps.identifier === this.props.identifier ? () => this.pageToIndex(currentFirstIndex) : undefined);
    }

    currentPage = () => this.state.currentPage

    pageToIndex = i => {
        if (i < 0 || i >= this.props.totalItems) {
            return new Error(`Cannot page to invalid index ${i}.`);
        }

        this.setState({ currentPage: Math.ceil((i + 1) / this.props.numItemsPerPage) });
    }

    createPageButtonOptions() {
        const options = [];
        const currentPage = this.state.currentPage;
        const numPageToggles = this.props.numPageToggles;
        const startPage = currentPage - ((currentPage - 1) % numPageToggles);
        const endPage = Math.min(startPage + numPageToggles - 1, this.state.numberOfPages);
        const totalPages = Math.ceil(this.props.totalItems / this.props.numItemsPerPage);

        if (this.props.showPaginationState) {
            options.push({
                selected: false,
                content:   typeof this.props.showPaginationState === 'function'
                         ? this.props.showPaginationState(currentPage, totalPages)
                         : `${currentPage} of ${totalPages}`,
                value: '',
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-state',
            });
        }

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

        if (this.props.customControlContent) {
            options.push({
                selected: false,
                content: this.props.customControlContent,
                value: uuid(),
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-custom',
            });
        }

        return options;
    }

    generateItems() {
        const generatedItems = [];
        const firstItemIndex = this.getFirstVisibleItemIndex();
        const lastItemIndex = Math.min(this.props.totalItems, firstItemIndex + this.props.numItemsPerPage) - 1;

        for (let i = firstItemIndex; i <= lastItemIndex; i += 1) {
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

        this.setState({currentPage: pageNumber});
    }

    renderItems() {
        const props = this.props.listWrapperProps;
        const indexOffset = this.props.numItemsPerPage * (this.state.currentPage - 1);

        return (
            <UIArrowKeyNavigation
                {...props}
                ref='itemList'
                className={cx({
                    'ui-pagination-items': true,
                    [props.className]: !!props.className,
                })}>
                {this.generateItems().map((item, index) => {
                    return (
                        <Item
                            ref={`item_${index}`}
                            key={index}
                            data={item.data}
                            dataToJSXConverterFunc={this.props.itemToJSXConverterFunc}
                            even={index % 2 === 0}
                            index={indexOffset + index}
                            loadingContent={this.props.itemLoadingContent} />
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
