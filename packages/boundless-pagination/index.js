import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import isInteger from 'lodash.isinteger';

import Async from '../boundless-async/index';
import SegmentedControl from '../boundless-segmented-control/index';
import ArrowKeyNavigation from '../boundless-arrow-key-navigation/index';
import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

const identity = (x) => x;

/**
# Pagination
__View and navigate heterogenious content one page at a time.__

Pagination is implemented as an encapsulated view system, accepting an array of items as input.

## Component Instance Methods

When using `Pagination` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

- __`currentPage()`__
  returns the ___one___-indexed page number currently in view

- __`pageToIndex(index: number)`__
  renders the page that contains the ___zero___-indexed item
 */
export default class Pagination extends React.PureComponent {
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
        /**
         * arbitrary content to be rendered after the items in the DOM
         */
        after: PropTypes.node,

        /**
         * arbitrary content to be rendered before the items in the DOM
         */
        before: PropTypes.node,

        /**
         * allows for arbitrary content to be rendered into the control area
         */
        customControlContent: PropTypes.node,

        /**
         * called with a desired item index when that item comes into view; accepts a `Promise` if you need to fetch the row asynchronously
         */
        getItem: PropTypes.func,

        /**
         * does not render the paging controls if the number of items supplied to the view is less-than-or-equal-to the number of items to show per page via `props.numItemsPerPage`
         */
        hidePagerIfNotNeeded: PropTypes.bool,

        /**
         * a unique name for the dataset being consumed; pass a different name to cause the view to fully reset and pull brand new data
         */
        identifier: PropTypes.string.isRequired,

        /**
         * the (_one-indexed_) number of the page that should be initially displayed; must be a positive integer less than or equal to the total number of pages
         */
        initialPage: function validateInitialPage(props) {
            if (isInteger(props.initialPage) === false) {
                return new Error('`initialPage` must be an integer.');
            }

            const numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

            if (props.initialPage < 1 || props.initialPage > numberOfPages) {
                return new Error('`initialPage` must be between 1 and ' + numberOfPages + '.');
            }
        },

        /**
         * allows for arbitrary content to be rendered into pagination items as they're loading if the backing data is a `Promise`
         */
        itemLoadingContent: PropTypes.node,

        /**
         * an optional function to specify how an item should be converted to JSX, if it is not already renderable by React
         */
        itemToJSXConverterFunc: PropTypes.func,

        /**
         * content to be displayed inside of the "First page" control button
         */
        jumpToFirstControlContent: PropTypes.node,

        /**
         * content to be displayed inside of the "Last page" control button
         */
        jumpToLastControlContent: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-pagination-item-list` node
         */
        listWrapperProps: PropTypes.object,

        /**
         * content to be displayed inside of the "Next page" control button
         */
        nextPageControlContent: PropTypes.node,

        /**
         * the maximum number of items to be displayed on each page; must be greater than zero
         */
        numItemsPerPage: function validateNumItemsPerPage(props) {
            if (isInteger(props.numItemsPerPage) === false) {
                return new Error('`numItemsPerPage` must be an integer.');
            } else if (props.numItemsPerPage < 1) {
                return new Error('`numItemsPerPage` must be greater than zero.');
            }
        },

        /**
         * the maximum number of pages to be displayed in the control bar at one time
         */
        numPageToggles: PropTypes.number,

        /**
         * determines whether the pagination controls are displayed above, below, or both above and below the content
         */
        position: PropTypes.oneOf(Object.keys(Pagination.positions)),

        /**
         * content to be displayed inside of the "Previous page" control button
         */
        previousPageControlContent: PropTypes.node,

        /**
         * whether the "First page" control button should be displayed
         */
        showJumpToFirst: PropTypes.bool,

        /**
         * whether the "Last page" control button should be displayed
         */
        showJumpToLast: PropTypes.bool,

        /**
         * renders an element called `.b-pagination-control-state` that contains the current state of the pagination like "1 of 10"; alternatively, this prop also accepts a function that it will call with the currentPage and totalPages for you to format:

         * ```jsx
         * showPaginatedState={
         *     (currentPage, totalPages) => (
         *         <div className='foo'>
         *             You're on page {currentPage} of {totalPages} pages!
         *         </div>
         *     )
         * }
         * ```
         */
        showPaginationState: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the SegmentedControl node(s), `.b-pagination-controls`
         */
        toggleWrapperProps: PropTypes.object,

        /**
         * the total number of items to be displayed in the view
         */
        totalItems: PropTypes.number.isRequired,
    }

    static defaultProps = {
        after: null,
        before: null,
        customControlContent: null,
        getItem: noop,
        hidePagerIfNotNeeded: false,
        identifier: uuid(),
        initialPage: 1,
        itemLoadingContent: null,
        itemToJSXConverterFunc: identity,
        jumpToFirstControlContent: '« First',
        jumpToLastControlContent: 'Last »',
        listWrapperProps: {},
        nextPageControlContent: 'Next ›',
        numItemsPerPage: 10,
        numPageToggles: 5,
        position: Pagination.positions.ABOVE,
        previousPageControlContent: '‹ Previous',
        showJumpToFirst: true,
        showJumpToLast: true,
        showPaginationState: true,
        toggleWrapperProps: {},
        totalItems: null,
    }

    static internalKeys = Object.keys(Pagination.defaultProps)

    state = {
        currentPage: this.props.initialPage,
        targetIndex: (this.props.initialPage - 1) * this.props.numItemsPerPage,
    }

    currentPage = () => this.state.currentPage
    getPageForIndex = (index, itemsPerPage = this.props.numItemsPerPage) => Math.ceil((index + 1) / itemsPerPage)
    totalPages = () => Math.ceil(this.props.totalItems / this.props.numItemsPerPage)

    firstVisibleItemIndex = () => (this.currentPage() - 1) * this.props.numItemsPerPage

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.currentPage()) {
            findDOMNode(this.refs.item_0).focus();
        }
    }

    componentWillReceiveProps() {
        const oldProps = this.props;

        // use transactional `setState()` syntax to ensure that pending state updates are honored,
        // like those from `pageToIndex()`
        this.setState((state, props) => {
            // NOTE: `props` here is technically the `nextProps` you'd receive from the first cWRP argument
            // so that's why we're caching `oldProps` outside the `setState`
            if (props.identifier !== oldProps.identifier) {
                return {
                    currentPage: 1,
                    targetIndex: 0,
                };
            }

            return {
                currentPage: this.getPageForIndex(state.targetIndex, props.numItemsPerPage),
                targetIndex: state.targetIndex,
            };
        });
    }

    pageToIndex = (i) => {
        if (i < 0 || i >= this.props.totalItems) {
            return new Error(`Cannot page to invalid index ${i}.`);
        }

        this.setState({
            currentPage: this.getPageForIndex(i),
            targetIndex: i,
        });
    }

    createPageButtonOptions() {
        const options = [];
        const currentPage = this.currentPage();
        const numPageToggles = this.props.numPageToggles;
        const totalPages = this.totalPages();
        const startPage = currentPage - ((currentPage - 1) % numPageToggles);
        const endPage = Math.min(startPage + numPageToggles - 1, totalPages);

        if (this.props.showPaginationState) {
            options.push({
                selected: false,
                content: isFunction(this.props.showPaginationState)
                         ? this.props.showPaginationState(currentPage, totalPages)
                         : `${currentPage} of ${totalPages}`,
                value: '',
                disabled: true,
                className: 'b-pagination-control b-pagination-control-state',
            });
        }

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlContent,
                value: Pagination.controls.FIRST,
                disabled: this.currentPage() === 1,
                className: 'b-pagination-control b-pagination-control-first',
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlContent,
            value: Pagination.controls.PREVIOUS,
            disabled: this.currentPage() === 1,
            className: 'b-pagination-control b-pagination-control-previous',
        });

        for (let i = startPage; i <= endPage; i++) {
            options.push({
                className: 'b-pagination-control',
                'data-page-number': i,
                selected: i === this.currentPage(),
                content: i,
                value: i,
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlContent,
            value: Pagination.controls.NEXT,
            disabled: this.currentPage() === totalPages,
            className: 'b-pagination-control b-pagination-control-next',
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlContent,
                value: Pagination.controls.LAST,
                disabled: this.currentPage() === totalPages,
                className: 'b-pagination-control b-pagination-control-last',
            });
        }

        if (this.props.customControlContent) {
            options.push({
                selected: false,
                content: this.props.customControlContent,
                value: uuid(),
                disabled: true,
                className: 'b-pagination-control b-pagination-control-custom',
            });
        }

        return options;
    }

    generateItems() {
        const generatedItems = [];
        const firstItemIndex = this.firstVisibleItemIndex();
        const lastItemIndex = Math.min(this.props.totalItems, firstItemIndex + this.props.numItemsPerPage) - 1;

        for (let i = firstItemIndex; i <= lastItemIndex; i += 1) {
            generatedItems.push({data: this.props.getItem(i)});
        }

        return generatedItems;
    }

    handleClick = (value) => {
        let nextTargetIndex;

        switch (value) {
        case Pagination.controls.FIRST:
            nextTargetIndex = 0;
            break;
        case Pagination.controls.PREVIOUS:
            nextTargetIndex = this.firstVisibleItemIndex() - this.props.numItemsPerPage;
            break;
        case Pagination.controls.NEXT:
            nextTargetIndex = this.firstVisibleItemIndex() + this.props.numItemsPerPage;
            break;
        case Pagination.controls.LAST:
            nextTargetIndex = this.props.totalItems - 1;
            break;
        default:
            nextTargetIndex = parseInt(value, 10) * this.props.numItemsPerPage - 1;
        }

        this.setState({
            currentPage: this.getPageForIndex(nextTargetIndex),
            targetIndex: nextTargetIndex,
        });
    }

    renderItems() {
        const props = this.props.listWrapperProps;
        const indexOffset = this.props.numItemsPerPage * (this.currentPage() - 1);

        return (
            <ArrowKeyNavigation
                {...props}
                ref='itemList'
                className={cx('b-pagination-items', props.className)}>
                {this.generateItems().map((item, index) => {
                    return (
                        <Async
                            ref={`item_${index}`}
                            key={index}
                            className={cx('b-pagination-item', {
                                'b-pagination-item-even': index % 2 === 0,
                                'b-pagination-item-odd': index % 2 !== 0,
                            })}
                            convertToJSXFunc={this.props.itemToJSXConverterFunc}
                            data={item.data}
                            data-pagination-index={indexOffset + index}
                            loadingContent={this.props.itemLoadingContent} />
                    );
                })}
            </ArrowKeyNavigation>
        );
    }

    renderControls(position) {
        if (   this.props.hidePagerIfNotNeeded
            && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        const props = this.props.toggleWrapperProps;
        const positionLower = position.toLowerCase();
        const positionCapitalized = positionLower[0].toUpperCase() + positionLower.slice(1);

        return (
            <SegmentedControl
                {...props}
                ref={`segmentedControl${positionCapitalized}`}
                className={cx('b-pagination-controls', props.className, {
                    [`b-pagination-controls-${positionLower}`]: true,
                })}
                options={this.createPageButtonOptions()}
                onOptionSelected={this.handleClick} />
        );
    }

    renderView() {
        const {props} = this;
        const position = Pagination.positions;

        return (
            <div
                ref='paginatedView'
                className='b-pagination'>
                {
                      (props.position === position.ABOVE || props.position === position.BOTH)
                    ? this.renderControls(position.ABOVE)
                    : noop
                }
                {props.before}

                {this.renderItems()}

                {props.after}

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
                {...omit(this.props, Pagination.internalKeys)}
                ref='wrapper'
                className={cx('b-pagination-wrapper', this.props.className)}>
                {this.renderView()}
            </div>
        );
    }
}
