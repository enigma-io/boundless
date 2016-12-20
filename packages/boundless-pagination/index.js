import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import isInteger from 'lodash.isinteger';

import SegmentedControl from '../boundless-segmented-control/index';
import ArrowKeyNavigation from '../boundless-arrow-key-navigation/index';
import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

const identity = (x) => x;

/**
 * A utility component for handling promises as children and eventually doing something with their resolved payload.
 */
class Item extends React.PureComponent {
    static propTypes = {
        convertToJSXFunc: PropTypes.func,
        data: PropTypes.object,
        even: PropTypes.bool,
        index: PropTypes.number,
        loadingContent: PropTypes.node,
    }

    static defaultProps = {
        convertToJSXFunc: noop,
        data: null,
        even: true,
        index: 0,
        loadingContent: null,
    }

    static internalKeys = Object.keys(Item.defaultProps)

    mounted = false
    state = {}

    convertDataToJSXOrWait(props = this.props) {
        if (props.data instanceof Promise) {
            this.setState({component: null});

            const closurePromise = props.data;

            props.data.then((resolvedPayload) => {
                if (this.mounted) {
                    this.setState((state, currentProps) => ({
                        component: currentProps.data === closurePromise
                                   ? currentProps.convertToJSXFunc(resolvedPayload, currentProps.index)
                                   : state.component,
                    }));
                } // only replace if we're looking at the same promise, otherwise do nothing
            }, noop);

            return;
        }

        this.setState({component: props.convertToJSXFunc(props.data, props.index)});
    }

    componentWillMount()                 { this.convertDataToJSXOrWait(); }
    componentDidMount()                  { this.mounted = true; }
    componentWillReceiveProps(nextProps) { this.convertDataToJSXOrWait(nextProps); }
    componentWillUnmount()               { this.mounted = false; }

    getClasses(extraClasses) {
        return cx('b-pagination-item', extraClasses, {
            'b-pagination-item-even': this.props.even,
            'b-pagination-item-odd': !this.props.even,
            'b-pagination-item-loading': this.state.component === null,
        });
    }

    render() {
        if (this.state.component === null) {
            return (
                <div {...omit(this.props, Item.internalKeys)} className={this.getClasses()}>
                    {this.props.loadingContent}
                </div>
            );
        }

        return React.cloneElement(this.state.component, {
            ...omit(this.props, Item.internalKeys),
            className: this.getClasses(this.state.component.props && this.state.component.props.className),
            'data-pagination-index': this.props.index,
        });
    }
}

/**
 * A utility component for paging the display of many data items, possibly varying in DOM layout/size.
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
        after: PropTypes.node,
        before: PropTypes.node,
        customControlContent: PropTypes.node,
        getItem: PropTypes.func,
        hidePagerIfNotNeeded: PropTypes.bool,
        identifier: PropTypes.string.isRequired,

        initialPage: function validateInitialPage(props) {
            if (isInteger(props.initialPage) === false) {
                return new Error('`initialPage` must be an integer.');
            }

            const numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

            if (props.initialPage < 1 || props.initialPage > numberOfPages) {
                return new Error('`initialPage` must be between 1 and ' + numberOfPages + '.');
            }
        },

        itemLoadingContent: PropTypes.node,
        itemToJSXConverterFunc: PropTypes.func,
        jumpToFirstControlContent: PropTypes.node,
        jumpToLastControlContent: PropTypes.node,
        listWrapperProps: PropTypes.object,
        nextPageControlContent: PropTypes.node,

        numItemsPerPage: function validateNumItemsPerPage(props) {
            if (isInteger(props.numItemsPerPage) === false) {
                return new Error('`numItemsPerPage` must be an integer.');
            } else if (props.numItemsPerPage < 1) {
                return new Error('`numItemsPerPage` must be greater than zero.');
            }
        },

        numPageToggles: PropTypes.number,
        position: PropTypes.oneOf(Object.keys(Pagination.positions)),
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
                        <Item
                            ref={`item_${index}`}
                            key={index}
                            convertToJSXFunc={this.props.itemToJSXConverterFunc}
                            data={item.data}
                            even={index % 2 === 0}
                            index={indexOffset + index}
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
