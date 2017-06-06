import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import { isInteger } from 'lodash';

import Async from 'boundless-async';
import SegmentedControl from 'boundless-segmented-control';
import ArrowKeyNavigation from 'boundless-arrow-key-navigation';
import omit from 'boundless-utils-omit-keys';
import uuid from 'boundless-utils-uuid';

const identity = (x) => x;
const isFunction = (x) => typeof x === 'function';
const noop = () => {};

/**
 * Pagination is implemented as an encapsulated view system, accepting an array of items as input.
 *
 * ## Component Instance Methods
 *
 * When using `Pagination` in your project, you may call the following methods on a rendered
 * instance of the component. Use [`refs`](https:// * facebook.github.io/react/docs/refs-and-the-dom.html)
 * to get the instance.
 *
 * - __`currentPage()`__ returns the ___one___-indexed page number currently in view
 *
 * - __`jumpToIndex(index: number)`__ renders the page that contains the ___zero___-indexed item
 */
export default class Pagination extends PureComponent {
    static control = {
        CUSTOM: uuid(),
        FIRST: uuid(),
        LAST: uuid(),
        NEXT: uuid(),
        PREVIOUS: uuid(),
    }

    static position = {
        ABOVE: uuid(),
        BELOW: uuid(),
        BOTH: uuid(),
    }

    static CONTROL_DATA_ATTRIBUTE = 'data-page-control'

    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * arbitrary content to be rendered after the items in the DOM
         */
        after: PropTypes.node,

        /**
         * arbitrary content to be rendered before the items in the DOM
         */
        before: PropTypes.node,

        controlWrapperProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        /**
         * allows for arbitrary content to be rendered into the control area
         */
        customControlContent: PropTypes.node,

        /**
         * called with a desired item index when that item comes into view;
         * accepts a `Promise` if you need to fetch the row asynchronously
         */
        getItem: PropTypes.func.isRequired,

        /**
         * does not render the paging controls if the number of items supplied
         * to the view is less-than-or-equal-to the number of items to show
         * per page via `props.numItemsPerPage`
         */
        hidePagerIfNotNeeded: PropTypes.bool,

        /**
         * a unique name for the data source being consumed; pass a
         * different name to cause the view to fully reset and pull fresh data
         */
        identifier: PropTypes.string.isRequired,

        /**
         * the (__one-indexed__) number of the page that should be initially
         * displayed; must be a positive integer less than or equal to
         * the total number of pages
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
         * allows for arbitrary content to be rendered into pagination items
         * as they're loading if the backing data is a `Promise`
         */
        itemLoadingContent: PropTypes.node,

        /**
         * an function to specify how an item should be converted
         * to JSX, if it is not already renderable by React
         *
         * ```jsx
         *
         * const getItem = () => ({id: 1234, text: 'foo'});
         * const objToJSX = ({id, text}) => <div data-id={id}>{text}</div>;
         *
         * <Pagination
         *     getItem={getItem}
         *     identifer='foo'
         *     itemToJSXConverter={objToJSX}
         *     totalItems={1} />
         * ```
         */
        itemToJSXConverter: PropTypes.func,

        itemWrapperProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        /**
         * content to be displayed inside of the "First page" control button
         */
        jumpToFirstPageControlContent: PropTypes.node,

        /**
         * content to be displayed inside of the "Last page" control button
         */
        jumpToLastPageControlContent: PropTypes.node,

        /**
         * content to be displayed inside of the "Next page" control button
         */
        jumpToNextPageControlContent: PropTypes.node,

        /**
         * content to be displayed inside of the "Previous page" control button
         */
        jumpToPreviousPageControlContent: PropTypes.node,

        /**
         * the maximum number of items to be displayed on each page; must be
         * greater than zero
         */
        numItemsPerPage: function validateNumItemsPerPage(props) {
            if (isInteger(props.numItemsPerPage) === false) {
                return new Error('`numItemsPerPage` must be an integer.');
            } else if (props.numItemsPerPage < 1) {
                return new Error('`numItemsPerPage` must be greater than zero.');
            }
        },

        /**
         * the maximum number of pages to be displayed in the control bar at
         * one time
         */
        numPageToggles: PropTypes.number,

        /**
         * determines whether the pagination controls are displayed above,
         * below, or both above and below the content
         */
        position: PropTypes.oneOf([
            Pagination.position.ABOVE,
            Pagination.position.BELOW,
            Pagination.position.BOTH,
        ]),

        /**
         * whether the "first page" control button should be displayed
         */
        showJumpToFirstPageControl: PropTypes.bool,

        /**
         * whether the "last page" control button should be displayed
         */
        showJumpToLastPageControl: PropTypes.bool,

        /**
         * whether the "next page" control button should be displayed
         */
        showJumpToNextPageControl: PropTypes.bool,

        /**
         * whether the "previous page" control button should be displayed
         */
        showJumpToPreviousPageControl: PropTypes.bool,

        /**
         * renders an element called `.b-pagination-control-state` that
         * contains the current state of the pagination like "1 of 10";
         * alternatively, this prop also accepts a function that it will
         * call with the currentPage and totalPages for you to format:

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
         * the total number of items to be displayed in the view
         */
        totalItems: PropTypes.number.isRequired,
    }

    static defaultProps = {
        after: null,
        before: null,
        controlWrapperProps: {},
        customControlContent: null,
        getItem: noop,
        hidePagerIfNotNeeded: false,
        identifier: uuid(),
        initialPage: 1,
        itemLoadingContent: undefined,
        itemToJSXConverter: identity,
        itemWrapperProps: {},
        jumpToFirstPageControlContent: '⇤',
        jumpToLastPageControlContent: '⇥',
        jumpToNextPageControlContent: '→',
        jumpToPreviousPageControlContent: '←',
        numItemsPerPage: 10,
        numPageToggles: 5,
        position: Pagination.position.ABOVE,
        showJumpToFirstPageControl: true,
        showJumpToLastPageControl: true,
        showJumpToNextPageControl: true,
        showJumpToPreviousPageControl: true,
        showPaginationState: true,
        totalItems: null,
    }

    static internalKeys = Object.keys(Pagination.defaultProps)

    mounted = false

    state = {
        currentPage: this.props.initialPage,
        targetIndex: (this.props.initialPage - 1) * this.props.numItemsPerPage,
    }

    /**
     * @public
     */
    currentPage = () => this.state.currentPage

    getPageForIndex = (index, itemsPerPage = this.props.numItemsPerPage) => Math.ceil((index + 1) / itemsPerPage)
    totalPages = () => Math.ceil(this.props.totalItems / this.props.numItemsPerPage)

    firstVisibleItemIndex = () => (this.currentPage() - 1) * this.props.numItemsPerPage

    componentDidMount()     { this.mounted = true; }
    componentWillUnmount()  { this.mounted = false; }

    componentDidUpdate(_, prevState) {
        if (prevState.currentPage !== this.currentPage()) {
            findDOMNode(this.refs.item_0).focus();
        }
    }

    componentWillReceiveProps() {
        const oldProps = this.props;

        // use transactional `setState()` syntax to ensure that pending state updates are honored,
        // like those from `jumpToIndex()`
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

    /**
     * @public
     */
    jumpToIndex = (i) => {
        if (i < 0 || i >= this.props.totalItems) {
            throw Error(`Cannot page to invalid index ${i}.`);
        }

        this.setState({
            currentPage: this.getPageForIndex(i),
            targetIndex: i,
        });
    }

    generateControls() {
        const options = [];
        const currentPage = this.currentPage();
        const totalPages = this.totalPages();
        const startPage = currentPage - ((currentPage - 1) % this.props.numPageToggles);
        const endPage = Math.min(startPage + this.props.numPageToggles - 1, totalPages);

        if (this.props.showPaginationState) {
            options.push({
                children: isFunction(this.props.showPaginationState)
                          ? this.props.showPaginationState(currentPage, totalPages)
                          : `${currentPage} / ${totalPages}`,
                className: 'b-pagination-control b-pagination-control-state',
                disabled: true,
            });
        }

        if (this.props.showJumpToFirstPageControl) {
            options.push({
                [Pagination.CONTROL_DATA_ATTRIBUTE]: Pagination.control.FIRST,
                children: this.props.jumpToFirstPageControlContent,
                className: 'b-pagination-control b-pagination-control-first',
                disabled: currentPage === 1,
            });
        }

        if (this.props.showJumpToPreviousPageControl) {
            options.push({
                [Pagination.CONTROL_DATA_ATTRIBUTE]: Pagination.control.PREVIOUS,
                children: this.props.jumpToPreviousPageControlContent,
                className: 'b-pagination-control b-pagination-control-previous',
                disabled: currentPage === 1,
            });
        }

        for (let i = startPage; i <= endPage; i++) {
            options.push({
                [Pagination.CONTROL_DATA_ATTRIBUTE]: i,
                children: i,
                className: 'b-pagination-control',
                pressed: currentPage === i,
            });
        }

        if (this.props.showJumpToNextPageControl) {
            options.push({
                [Pagination.CONTROL_DATA_ATTRIBUTE]: Pagination.control.NEXT,
                children: this.props.jumpToNextPageControlContent,
                className: 'b-pagination-control b-pagination-control-next',
                disabled: currentPage === totalPages,
            });
        }

        if (this.props.showJumpToLastPageControl) {
            options.push({
                [Pagination.CONTROL_DATA_ATTRIBUTE]: Pagination.control.LAST,
                children: this.props.jumpToLastPageControlContent,
                className: 'b-pagination-control b-pagination-control-last',
                disabled: currentPage === totalPages,
            });
        }

        if (this.props.customControlContent) {
            options.push({
                children: this.props.customControlContent,
                className: 'b-pagination-control b-pagination-control-custom',
                disabled: true,
            });
        }

        return options;
    }

    generateItems() {
        const items = [];
        const firstIndex = this.firstVisibleItemIndex();
        const lastIndex = Math.min(this.props.totalItems, firstIndex + this.props.numItemsPerPage) - 1;

        for (let i = firstIndex; i <= lastIndex; i += 1) {
            items.push(this.props.getItem(i));
        }

        return items;
    }

    handlePageSelected = (option) => {
        let nextTargetIndex;

        switch (option[Pagination.CONTROL_DATA_ATTRIBUTE]) {
        case undefined:
            return;

        case Pagination.control.FIRST:
            nextTargetIndex = 0;
            break;

        case Pagination.control.PREVIOUS:
            nextTargetIndex = this.firstVisibleItemIndex() - this.props.numItemsPerPage;
            break;

        case Pagination.control.NEXT:
            nextTargetIndex = this.firstVisibleItemIndex() + this.props.numItemsPerPage;
            break;

        case Pagination.control.LAST:
            nextTargetIndex = this.props.totalItems - 1;
            break;

        default:
            nextTargetIndex = parseInt(option[Pagination.CONTROL_DATA_ATTRIBUTE], 10) * this.props.numItemsPerPage - 1;
        }

        this.setState({
            currentPage: this.getPageForIndex(nextTargetIndex),
            targetIndex: nextTargetIndex,
        });
    }

    handleItemPromiseFulfillment = (payload) => {
        if (this.mounted) {
            return this.props.itemToJSXConverter(payload);
        }
    }

    renderItems() {
        const props = this.props.itemWrapperProps;

        return (
            <ArrowKeyNavigation
                {...props}
                className={cx('b-pagination-items', props.className)}>
                {this.generateItems().map((item, index) => {
                    return (
                        <Async
                            ref={index === 0 ? 'item_0' : null}
                            key={index}
                            className={cx('b-pagination-item', {
                                'b-pagination-item-even': index % 2 === 0,
                                'b-pagination-item-odd': index % 2 !== 0,
                            })}
                            data-pagination-index={this.props.numItemsPerPage * (this.currentPage() - 1) + index}
                            pendingContent={this.props.itemLoadingContent}>
                            {item instanceof Promise
                             ? item.then(this.handleItemPromiseFulfillment, this.handleItemPromiseFulfillment)
                             : this.props.itemToJSXConverter(item)}
                        </Async>
                    );
                })}
            </ArrowKeyNavigation>
        );
    }

    renderControls(position) {
        if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        return (
            <SegmentedControl
                {...this.props.controlWrapperProps}
                className={cx('b-pagination-controls', this.props.controlWrapperProps.className, {
                    ['b-pagination-controls-above']: position === Pagination.position.ABOVE,
                    ['b-pagination-controls-below']: position === Pagination.position.BELOW,
                })}
                options={this.generateControls()}
                onOptionSelected={this.handlePageSelected} />
        );
    }

    renderView() {
        const { position } = this.props;
        const p = Pagination.position;

        return (
            <div className='b-pagination'>
                {position === p.ABOVE || position === p.BOTH ? this.renderControls(p.ABOVE) : null}
                {this.props.before}
                {this.renderItems()}
                {this.props.after}
                {position === p.BELOW || position === p.BOTH ? this.renderControls(p.BELOW) : null}
            </div>
        );
    }

    render() {
        return (
            <div {...omit(this.props, Pagination.internalKeys)} className={cx('b-pagination-wrapper', this.props.className)}>
                {this.renderView()}
            </div>
        );
    }
}
