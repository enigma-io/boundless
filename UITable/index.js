/**
 * React wrapper for Table.
 * @class UITable
 */

import React, { PropTypes } from 'react';
import UIView from '../UIView';
import Table from './table';

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

        static: PropTypes.bool,
    }

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

            // internal use only, renders the table without any event listeners (minimal computation)
            static_mode: this.props.static,
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

    onlyColumnWidthChangedAndMatchesTableInternals(current_columns, prev_columns, table_internal_columns) {
        /* the columns should exactly match in the proper order, or the widths should be the same as the internal column
        representation, meaning the change is a reaction to being alerted by `props.onColumnResize` */
        return current_columns.every((column, index) => {
            return    column === prev_columns[index]
                   || (column.mapping === prev_columns[index].mapping && column.width === table_internal_columns[index].width);
        });
    }

    componentDidUpdate(prev_props) {
        const changed_props = [];
        let key;

        /* bidirectional key change detection */

        for (key in this.props) {
            if (this.props[key] !== prev_props[key]) {
                changed_props.push(key);
            }
        }

        for (key in prev_props) {
            if (prev_props[key] !== this.props[key] && changed_props.indexOf(key) === -1) {
                changed_props.push(key);
            }
        }

        if (changed_props.length) {
            if (changed_props.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(this.props.jumpToRowIndex);
            }

            if (changed_props.length === 1 && changed_props[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (this.onlyColumnWidthChangedAndMatchesTableInternals(this.props.columns, prev_props.columns, this.table.columns)) {
                    return;
                }
            }

            this.table.regenerate(this.getSubviewConfiguration());
        }
    }

    renderXScroll() {
        if (!this.props.static) {
            return (
                <div ref='x-scroll-track' className='ui-table-x-scroll-track'>
                    <div ref='x-scroll-handle' className='ui-table-x-scroll-handle' />
                </div>
            );
        }
    }

    renderYScroll() {
        if (!this.props.static) {
            return (
                <div ref='y-scroll-track' className='ui-table-y-scroll-track'>
                    <div ref='y-scroll-handle' className='ui-table-y-scroll-handle' />
                </div>
            );
        }
    }

    renderAria() {
        if (!this.props.static) {
            return (
                <div ref='aria' className={this.props.offscreenClass || 'ui-offscreen'} aria-live='polite' />
            );
        }
    }

    render() {
        return (
            <div
                {...this.props}
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
