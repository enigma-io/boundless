/**
 * React wrapper for Table.
 * @class UITable
 */

import React, {PropTypes} from 'react';
import omit from 'lodash.omit';
import Table from 'enigma-table';

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

export default class UITable extends React.PureComponent {
    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                mapping: PropTypes.string,
                resizable: PropTypes.bool,
                title: PropTypes.string,
                width: PropTypes.number,
            })
        ),
        getRow: PropTypes.func,
        identifier: PropTypes.string,
        jumpToRowIndex: PropTypes.number,
        offscreenClass: PropTypes.string,
        onCellInteract: PropTypes.func,
        onColumnResize: PropTypes.func,
        onRowInteract: PropTypes.func,
        preserveScrollState: PropTypes.bool,
        throttleInterval: PropTypes.number,
        totalRows: PropTypes.number,
    }

    static internalKeys = Object.keys(UITable.propTypes)

    static defaultProps = {
        className: '',
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

            columns: this.props.columns,
            rowClickFunc: this.props.onRowInteract,
            cellClickFunc: this.props.onCellInteract,
            onColumnResize: this.props.onColumnResize,
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows,
        };
    }

    componentDidMount() {
        this.table = new Table(this.getSubviewConfiguration());

        if (this.props.jumpToRowIndex) {
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
            <div ref='x-scroll-track' className='ui-table-x-scroll-track'>
                <div ref='x-scroll-handle' className='ui-table-x-scroll-handle' />
            </div>
        );
    }

    renderYScroll() {
        return (
            <div ref='y-scroll-track' className='ui-table-y-scroll-track'>
                <div ref='y-scroll-handle' className='ui-table-y-scroll-handle' />
            </div>
        );
    }

    renderAria() {
        return (
            <div ref='aria' className={this.props.offscreenClass || 'ui-offscreen'} aria-live='polite' />
        );
    }

    render() {
        return (
            <div
                {...omit(this.props, UITable.internalKeys)}
                ref='wrapper'
                className={'ui-table-wrapper ' + this.props.className}
                data-set-identifier={this.props.identifier}
                tabIndex='0'>
                <div ref='header' className='ui-table-header' />
                <div ref='body' className='ui-table-body' />

                {this.renderXScroll()}
                {this.renderYScroll()}
                {this.renderAria()}
            </div>
        );
    }
}
