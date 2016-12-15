/**
 * React wrapper for Table.
 * @class ReactTable
 */

import React, {PropTypes} from 'react';
import omit from 'lodash.omit';

import Table, {
    BODY,
    HEADER,
    OFFSCREEN,
    WRAPPER,
    X_SCROLL_TRACK,
    X_SCROLL_TRACK_HANDLE,
    Y_SCROLL_TRACK,
    Y_SCROLL_TRACK_HANDLE,
} from '../index';

function didColumnsChange(currentColumns, prevColumns, tableInternalColumns) {
    /*
        1. there should be the same number of columns
        2. the columns should exactly match in the proper order
        3. each column property should be exactly the same
     */

    if (currentColumns.length !== prevColumns.length) {
        return true;
    }

    // did the column descriptors change in some way, or did the width change?
    // this will also catch if the order of the columns changed when comparing
    // the mapping property
    return currentColumns.some((column, index) => {
        return    column.mapping !== prevColumns[index].mapping
               || column.title !== prevColumns[index].title
               || column.resizable !== prevColumns[index].resizable
               || (column.width !== undefined && column.width !== tableInternalColumns[index].width);
    });
}

const columnChildSpec = PropTypes.shape({
    tag: PropTypes.string,
    attributes: PropTypes.object,
});

export default class ReactTable extends React.PureComponent {
    static propTypes = {
        allowScrollPropagation: PropTypes.bool,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                cellChangeFunc: PropTypes.func,
                children: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                    columnChildSpec,
                    PropTypes.arrayOf(columnChildSpec),
                ]),
                mapping: PropTypes.string,
                resizable: PropTypes.bool,
                title: PropTypes.string,
                width: PropTypes.number,
            })
        ),
        fitColumnsToTableWidth: PropTypes.bool,
        getRow: PropTypes.func,
        identifier: PropTypes.string,
        jumpToRowIndex: PropTypes.number,
        offscreenClass: PropTypes.string,
        onActiveRowChanged: PropTypes.func,
        onCellInteract: PropTypes.func,
        onColumnResize: PropTypes.func,
        onHeaderCellInteract: PropTypes.func,
        onRowChanged: PropTypes.func,
        onRowInteract: PropTypes.func,
        preserveScrollState: PropTypes.bool,
        throttleInterval: PropTypes.number,
        totalRows: PropTypes.number,
    }

    static internalKeys = Object.keys(ReactTable.propTypes)

    static defaultProps = {
        allowScrollPropagation: false,
        className: '',
        fitColumnsToTableWidth: false,
        offscreenClass: 'ui-offscreen',
        preserveScrollState: true,
    }

    getSubviewConfiguration() {
        return {
            wrapper: this.refs.wrapper,
            header: this.refs.header,
            body: this.refs.body,
            'x-scroll-track': this.refs['x-scroll-track'],
            'x-scroll-handle': this.refs['x-scroll-handle'],
            'y-scroll-track': this.refs['y-scroll-track'],
            'y-scroll-handle': this.refs['y-scroll-handle'],
            aria: this.refs.aria,

            activeRowChangedFunc: this.props.onActiveRowChanged,
            allowScrollPropagation: this.props.allowScrollPropagation,
            cellClickFunc: this.props.onCellInteract,
            columns: this.props.columns,
            columnResizeFunc: this.props.onColumnResize,
            fitColumnsToTable: this.props.fitColumnsToTableWidth,
            headerColumnClickFunc: this.props.onHeaderCellInteract,
            rowChangeFunc: this.props.onRowChanged,
            rowClickFunc: this.props.onRowInteract,
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows,
        };
    }

    componentDidMount() {
        this.table = new Table(this.getSubviewConfiguration());

        if (this.props.jumpToRowIndex !== undefined) {
            this.table.jumpToRowIndex(this.props.jumpToRowIndex);
        }
    }

    componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    }

    componentDidUpdate(prevProps) {
        const {props} = this;
        const changedProps = [];
        let key;

        /* bidirectional key change detection */

        for (key in props) {
            if (props[key] !== prevProps[key]) {
                changedProps.push(key);
            }
        }

        for (key in prevProps) {
            if (prevProps[key] !== props[key] && changedProps.indexOf(key) === -1) {
                changedProps.push(key);
            }
        }

        if (changedProps.length) {
            if (changedProps.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(props.jumpToRowIndex);
            }

            if (changedProps.length === 1 && changedProps[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (didColumnsChange(props.columns, prevProps.columns, this.table.columns) === false) {
                    return;
                }
            }

            this.table.regenerate(this.getSubviewConfiguration());
        }
    }

    renderXScroll() {
        return (
            <div ref='x-scroll-track' className={X_SCROLL_TRACK}>
                <div ref='x-scroll-handle' className={X_SCROLL_TRACK_HANDLE} />
            </div>
        );
    }

    renderYScroll() {
        return (
            <div ref='y-scroll-track' className={Y_SCROLL_TRACK}>
                <div ref='y-scroll-handle' className={Y_SCROLL_TRACK_HANDLE} />
            </div>
        );
    }

    renderAria() {
        return (
            <div ref='aria' className={this.props.offscreenClass || OFFSCREEN} aria-live='polite' />
        );
    }

    render() {
        return (
            <div
                {...omit(this.props, ReactTable.internalKeys)}
                ref='wrapper'
                className={`${WRAPPER} ${this.props.className}`}
                data-set-identifier={this.props.identifier}
                tabIndex='0'>
                <div ref='header' className={HEADER} />
                <div ref='body' className={BODY} />

                {this.renderXScroll()}
                {this.renderYScroll()}
                {this.renderAria()}
            </div>
        );
    }
}
