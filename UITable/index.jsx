import UIView from '../UIView';
import UITableRow from './row';
import React from 'react';
import {merge} from 'lodash';

require('array.from');

function noop() {}

/**
 * 1) Initial render w/ one row of cells
 * 2) Capture cell widths
 * 3) apply widths to column definitions
 * 4) render pass 2 w/ column heads and the rest of the cells
 */

let transformProp = (function detectTransformProperty() {
    let availableProp;
    let props = [
        'transform',
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform'
    ];

    for (let i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.body.style) {
            availableProp = props[i];
            break;
        }
    }

    return availableProp;
})();

class UITable extends UIView {
    initialState() {
        return {
            columns: this.props.columns,
            rowYPositions: {},
            visibleRowRangeStart: null,
            visibleRowRangeEnd: null,
            visibleColumnRangeStart: null,
            visibleColumnRangeEnd: null
        };
    }

    getClasses() {
        return ['ui-table-wrapper'].concat(this.props.className).join(' ');
    }

    captureDimensions() {
        if (this.props.rows.length) {
            let firstRowCells = this.body.getElementsByClassName('ui-table-row')[0].getElementsByClassName('ui-table-cell');

            this.cellHeight = firstRowCells[0].clientHeight;

            let containerHeight = React.findDOMNode(this).clientHeight;
            let numRowsToRender = Math.ceil(containerHeight / this.cellHeight + ((containerHeight * 0.2) / this.cellHeight));

            this.head = React.findDOMNode(this.refs.head);
            this.yBound = containerHeight - (numRowsToRender + 1) * this.cellHeight; // +1 for the header

            let columns = this.state.columns;

            Array.from(firstRowCells, function discoverWidth(node, index) {
                columns[index] = merge({width: node.clientWidth}, columns[index]);
            });

            this.setState({
                columns,
                visibleRowRangeStart: 0,
                visibleRowRangeEnd: numRowsToRender
            });
        }
    }

    componentDidMount() {
        this.xCurrent = this.yCurrent = 0;
        this.body = React.findDOMNode(this.refs.body);

        this.captureDimensions();
    }

    componentDidUpdate() {
        this.captureDimensions();
    }

    render() {
        return (
            <div className={this.getClasses()}
                 onWheel={this.handleMoveIntent.bind(this)}>
                <table ref='table'
                       className='ui-table'>
                    {this.renderBody()}
                    {this.renderHead()}
                </table>
                {this.renderScrollbars()}
            </div>
        );
    }

    renderHead() {
        if (typeof this.state.visibleRowRangeStart === 'number') {
            let moddedData = {};

            this.state.columns.forEach(function pareDown(definition) {
                moddedData[definition.mapping] = definition.title;
            });

            return (
                <thead ref='head' className='ui-table-header'>
                    <UITableRow columns={this.state.columns}
                                data={moddedData} />
                </thead>
            );
        }
    }

    renderBody() {
        let useComputed = typeof this.state.visibleRowRangeStart === 'number';

        // render a single row to grab width metrics
        let start = useComputed ? this.state.visibleRowRangeStart : 0;
        let end = useComputed ? this.state.visibleRowRangeEnd : 1;

        return (
            <tbody ref='body' className='ui-table-body'>
                {this.renderRows(start, end)}
            </tbody>
        );
    }

    renderRows(start, end) {
        let data = this.props.rows;
        let len = data.length;
        let rows = [];
        let i = start;
        let cap = end;
        let datum;

        if (cap > len) {
            cap = len;
        }

        for (; i < cap; i += 1) {
            datum = data[i];

            rows.push(
                <UITableRow ref={'row' + i}
                            key={datum.id}
                            columns={this.state.columns}
                            data={datum}
                            y={this.state.rowYPositions['row' + i]} />
            );
        }

        return rows;
    }

    renderScrollbars() {
        return (
            <div>
                <div className='ui-table-x-scroller'>
                    <div ref='xNub'
                         className='ui-table-x-scroller-nub'
                         style={{
                            width: this.state.xNubSize,
                            [transformProp]: `translateX(${this.state.xProgress})`
                         }} />
                </div>
                <div className='ui-table-y-scroller'>
                    <div ref='yNub'
                         className='ui-table-y-scroller-nub'
                         style={{
                            height: this.state.yNubSize,
                            [transformProp]: `translateY(${this.state.yProgress})`
                         }} />
                </div>
            </div>
        );
    }

    applyTranslation(dx, dy) {
        if (dx !== this.xCurrent) {
            this.head.style[transformProp] = `translateX(${dx}px)`;
        }

        this.body.style[transformProp] = `translate(${dx}px, ${dy}px)`;

        this.xCurrent = dx;
        this.yCurrent = dy;
    }

    normalize(delta, bound) {
        if (bound > 0
            || delta > 0) {
            return 0;
        } else if (delta < bound) {
            return bound;
        }

        return delta;
    }

    handleMoveIntent(event) {
        event.preventDefault();

        if (event.deltaX === this.xCurrent
            && event.deltaY === this.yCurrent) {
            return;
        }

        if (!this.xBound) { // lazy calculate the table width on first move
            this.xBound = React.findDOMNode(this).clientWidth - this.body.clientWidth;
        }

        this.applyTranslation(
            this.normalize(this.xCurrent - event.deltaX, this.xBound),
            this.normalize(this.yCurrent - event.deltaY, this.yBound)
        );
    }
}

UITable.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    columns: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            mapping: React.PropTypes.string,
            resizable: React.PropTypes.bool,
            title: React.PropTypes.string,
            width: React.PropTypes.number
        })
    ),
    onCellInteract: React.PropTypes.func,
    onRowInteract: React.PropTypes.func,
    rows: React.PropTypes.arrayOf(React.PropTypes.object)
};

UITable.defaultProps = {
    className: [],
    columns: [],
    onCellInteract: noop,
    onRowInteract: noop,
    rows: []
};

export default UITable;
