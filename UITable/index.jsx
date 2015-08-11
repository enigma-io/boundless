import UIView from '../UIView';
import React from 'react';
import transformProp from '../UIUtils/transform';
import {each, map, merge, noop, toArray} from 'lodash';

/**
 * 1) Initial render w/ one row of cells
 * 2) Capture cell widths
 * 3) apply widths to column definitions
 * 4) render pass 2 w/ column heads and the rest of the cells
 */

class UITable extends UIView {
    initialState() {
        return {
            columns: this.props.columns.slice(0),
            visibleRowRangeStart: null,
            visibleRowRangeEnd: null
        };
    }

    getClasses() {
        return ['ui-table-wrapper'].concat(this.props.className).join(' ');
    }

    captureDimensions() {
        if (this.props.rows.length
            && this.state.visibleRowRangeEnd === null) {
            let firstRowCells = this.body.getElementsByClassName('ui-table-row')[0].getElementsByClassName('ui-table-cell');

            this.cellHeight = firstRowCells[0].clientHeight;

            let containerHeight = React.findDOMNode(this).clientHeight;
            let numRowsToRender = Math.ceil(containerHeight / this.cellHeight + ((containerHeight * 0.2) / this.cellHeight));

            this.yBound = containerHeight - (numRowsToRender + 1) * this.cellHeight; // +1 for the header

            let columns = this.state.columns;

            each(toArray(firstRowCells), function discoverWidth(node, index) {
                columns[index] = merge({width: Math.ceil(node.getBoundingClientRect().width)}, columns[index]);
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

    normalizeCoordinate(delta, bound) {
        if (bound > 0
            || delta > 0) {
            return 0;
        } else if (delta < bound) {
            return bound;
        }

        return delta;
    }

    applyTranslations(dx, dy) {
        if (dx !== this.xCurrent) {
            this.head.style[transformProp] = `translateX(${dx}px)`;
        }

        this.body.style[transformProp] = `translate(${dx}px, ${dy}px)`;

        this.xCurrent = dx;
        this.yCurrent = dy;
    }

    handleMoveIntent(event) {
        event.preventDefault();

        if (event.deltaX === this.xCurrent
            && event.deltaY === this.yCurrent) {
            return;
        }

        if (!this.xBound) {
            this.xBound = React.findDOMNode(this).clientWidth - this.body.clientWidth;
        } // lazy calculate the table width on first move

        if (!this.head) {
            this.head = React.findDOMNode(this.refs.head);
        } // header doesn't get rendered until the second pass

        let xNext = this.xCurrent - event.deltaX;
        let yNext = this.yCurrent - event.deltaY;
        let start = this.state.visibleRowRangeStart;
        let end = this.state.visibleRowRangeEnd;

        if (yNext < this.yCurrent
            && yNext <= this.yBound
            && this.state.visibleRowRangeEnd < this.props.rows.length) {
            let rowShiftAmount = Math.ceil((Math.abs(yNext - this.yBound)) / this.cellHeight);
            let numRows = this.props.rows.length;

            if (rowShiftAmount + end > numRows) {
                rowShiftAmount = numRows - end;
            }

            this.setState({
                visibleRowRangeStart: start + rowShiftAmount,
                visibleRowRangeEnd: end + rowShiftAmount
            });

            yNext += rowShiftAmount * this.cellHeight;
        } else if (yNext > this.yCurrent
            && yNext > 0
            && this.state.visibleRowRangeStart > 0) {
            let rowShiftAmount = Math.ceil((Math.abs(yNext + this.yBound)) / this.cellHeight);

            if (start - rowShiftAmount < 0) {
                rowShiftAmount = start;
            }

            this.setState({
                visibleRowRangeStart: start - rowShiftAmount,
                visibleRowRangeEnd: end - rowShiftAmount
            });

            yNext -= rowShiftAmount * this.cellHeight;
        }

        this.applyTranslations(
            this.normalizeCoordinate(xNext, this.xBound),
            this.normalizeCoordinate(yNext, this.yBound)
        );
    }

    renderCellContent(content, width) {
        if (typeof width === 'number') {
            return (
                <div className='ui-table-cell-inner'>
                    <span className='ui-table-cell-inner-text'>{content}</span>
                </div>
            );
        }

        return content;
    }

    renderCells(datum) {
        return map(this.state.columns, (definition, index) => {
            return (
                <div key={index}
                    className='ui-table-cell'
                    style={{width: definition.width ? definition.width + 'px' : null}}>
                    {this.renderCellContent(datum[definition.mapping], definition.width)}
                </div>
            );
        });
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
                <div className='ui-table-row'
                    key={datum.id}>
                    {this.renderCells(datum)}
                </div>
            );
        }

        return rows;
    }

    renderBody() {
        let useComputed = typeof this.state.visibleRowRangeStart === 'number';

        // render a single row to grab width metrics
        let start = useComputed ? this.state.visibleRowRangeStart : 0;
        let end = useComputed ? this.state.visibleRowRangeEnd : 1;

        return (
            <div ref='body' className='ui-table-body'>
                {this.renderRows(start, end)}
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
                <div ref='head' className='ui-table-header'>
                    <div className='ui-table-row'>
                        {this.renderCells(moddedData)}
                    </div>
                </div>
            );
        }
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

    render() {
        return (
            <div className={this.getClasses()}
                 onWheel={this.handleMoveIntent.bind(this)}>
                <div ref='table'
                       className='ui-table'>
                    {this.renderHead()}
                    {this.renderBody()}
                </div>
                {this.renderScrollbars()}
            </div>
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
