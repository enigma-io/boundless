/**
 * React wrapper for TableView.
 * @class UITable
 */

import React from 'react';
import UIView from '../UIView';
import TableView from './table';

export default class UITable extends UIView {
    static propTypes = {
        columns: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                mapping: React.PropTypes.string,
                resizable: React.PropTypes.bool,
                title: React.PropTypes.string,
                width: React.PropTypes.number,
            })
        ),
        getRow: React.PropTypes.func,
        identifier: React.PropTypes.string,
        offscreenClass: React.PropTypes.string,
        onCellInteract: React.PropTypes.func,
        onRowInteract: React.PropTypes.func,
        preserveScrollState: React.PropTypes.bool,
        throttleInterval: React.PropTypes.number,
        totalRows: React.PropTypes.number,
    }

    static defaultProps = {
        className: '',
        offscreenClass: 'ui-offscreen',
        preserveScrollState: true,
    }

    getTableViewConfiguration() {
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
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows,
        };
    }
    componentDidMount() {
        this.table = new TableView(this.getTableViewConfiguration());
    }

    componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    }

    componentDidUpdate() {
        this.table.regenerate(this.getTableViewConfiguration());
    }

    render() {
        return (
            <div {...this.props}
                 ref='wrapper'
                 className={'ui-table-wrapper ' + this.props.className}
                 data-set-identifier={this.props.identifier}
                 tabIndex='0'>
                <div ref='table' className='ui-table'>
                    <div ref='header' className='ui-table-header' />
                    <div ref='body' className='ui-table-body' />
                </div>

                <div ref='x-scroll-track' className='ui-table-x-scroll-track'>
                    <div ref='x-scroll-handle' className='ui-table-x-scroll-handle' />
                </div>

                <div ref='y-scroll-track' className='ui-table-y-scroll-track'>
                    <div ref='y-scroll-handle' className='ui-table-y-scroll-handle' />
                </div>

                <div ref='aria' className={this.props.offscreenClass || 'ui-offscreen'} aria-live='polite' />
            </div>
        );
    }
}
