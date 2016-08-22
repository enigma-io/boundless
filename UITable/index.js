/**
 * React wrapper for Table.
 * @class UITable
 */

import React, {PropTypes} from 'react';
import omit from 'lodash.omit';
import Table from 'enigma-table';

import UIView from '../UIView';

function didColumnsChange(current_columns, prev_columns, table_internal_columns) {
    /*
        1. there should be the same number of columns
        2. the columns should exactly match in the proper order
        3. each column property should be exactly the same
     */

    if (current_columns.length !== prev_columns.length) {
        return true;
    }

    // did the column descriptors change in some way, or did the width change?
    // this will also catch if the order of the columns changed when comparing
    // the mapping property
    return current_columns.some((column, index) => {
        return    column.mapping !== prev_columns[index].mapping
               || column.title !== prev_columns[index].title
               || column.resizable !== prev_columns[index].resizable
               || (column.width !== undefined && column.width !== table_internal_columns[index].width);
    });
}

export default class UITable extends UIView {
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

    static internal_keys = Object.keys(UITable.propTypes)

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

    componentDidUpdate(prev_props) {
        const {props} = this;
        const changed_props = [];
        let key;

        /* bidirectional key change detection */

        for (key in props) {
            if (props[key] !== prev_props[key]) {
                changed_props.push(key);
            }
        }

        for (key in prev_props) {
            if (prev_props[key] !== props[key] && changed_props.indexOf(key) === -1) {
                changed_props.push(key);
            }
        }

        if (changed_props.length) {
            if (changed_props.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(props.jumpToRowIndex);
            }

            if (changed_props.length === 1 && changed_props[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (didColumnsChange(props.columns, prev_props.columns, this.table.columns) === false) {
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
                {...omit(this.props, UITable.internal_keys)}
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
