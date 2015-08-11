import UIView from '../UIView';
import Row from './row';
import React from 'react';
import transformProp from '../UIUtils/transform';
import {chain, each, indexOf, map, merge, noop, toArray} from 'lodash';

/**
 * 1) Initial render w/ one row of cells
 * 2) Capture cell widths
 * 3) apply widths to column definitions
 * 4) render pass 2 w/ column heads and the rest of the cells
 */

class UITable extends UIView {
    initialState() {
        return {
            chokeRender: true,
            rows: [{
                data: this.props.getRow(0),
                y: 0
            }],
            columns: this.props.columns.slice(0)
        };
    }

    captureDimensions() {
        let firstRowCells = this.body.getElementsByClassName('ui-table-row')[0].getElementsByClassName('ui-table-cell');

        this.cellHeight = firstRowCells[0].clientHeight;

        let containerHeight = React.findDOMNode(this).clientHeight;
        let numRowsToRender = Math.ceil(containerHeight / this.cellHeight + ((containerHeight * 0.2) / this.cellHeight));

        this.rowStartIndex = 0;
        this.rowEndIndex = numRowsToRender;
        this.yLowerBound = containerHeight - numRowsToRender * this.cellHeight;
        this.yUpperBound = 0;

        let modifiedColumns = this.state.columns.slice(0);

        each(toArray(firstRowCells), function discoverWidth(node, index) {
            modifiedColumns[index] = merge({
                width: Math.ceil(node.getBoundingClientRect().width)
            }, modifiedColumns[index]);
        });

        this.setState({
            chokeRender: false,
            columns: modifiedColumns,
            rows: map(new Array(numRowsToRender), (/*ignore*/x, index) => {
                return {
                    data: this.props.getRow(index),
                    y: this.cellHeight * index
                };
            })
        });
    }

    componentDidMount() {
        this.xCurrent = this.yCurrent = 0;
        this.body = React.findDOMNode(this.refs.body);

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

    handleScrollDown(dy) {
        let endIndex = this.rowEndIndex;
        let maxIndex = this.props.totalRows;

        if (dy < this.yCurrent
            && dy <= this.yLowerBound
            && endIndex < maxIndex) {
            /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request
            the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            let shiftIndex = Math.ceil((Math.abs(dy - this.yLowerBound)) / this.cellHeight);
            let nSlots = shiftIndex;

            if (nSlots + endIndex > maxIndex) {
                /* more rows than there is data available, truncate */
                nSlots = maxIndex - endIndex;
            }

            if (nSlots > 0) {
                let rowsModified = this.state.rows.slice(0);

                if (nSlots > rowsModified.length) {
                    /* a very large scroll delta, bump the boundaries by the amount
                    not covered by our row slots */
                    this.yLowerBound -= (nSlots - rowsModified.length) * this.cellHeight;
                    this.yUpperBound -= (nSlots - rowsModified.length) * this.cellHeight;
                    nSlots = rowsModified.length;
                }

                if (nSlots > 0) {
                    /* Find the n lowest rows and migrate them in order. */
                    let rowsAsc = chain(rowsModified).sortByOrder('y', 'asc').take(nSlots).value();
                    let pointer;

                    for (let i = 0, len = rowsAsc.length; i < len; i++) {
                        pointer = indexOf(rowsModified, rowsAsc[i]);
                        rowsModified[pointer] = {
                            data: this.props.getRow(endIndex + shiftIndex + i),
                            y: (endIndex + i) * this.cellHeight
                        };
                    }

                    this.rowStartIndex += shiftIndex;
                    this.rowEndIndex += shiftIndex;
                    this.yLowerBound -= nSlots * this.cellHeight;
                    this.yUpperBound -= nSlots * this.cellHeight;

                    this.setState({rows: rowsModified});
                }
            }
        }
    }

    handleScrollUp(dy) {
        let startIndex = this.rowStartIndex;

        if (dy > this.yCurrent
            && dy > this.yUpperBound
            && startIndex > 0) {
            /* Scrolling up, so we want to move the highest Y value to the lowest position and request
            the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            let shiftIndex = Math.ceil((Math.abs(dy - this.yUpperBound)) / this.cellHeight);
            let nSlots = shiftIndex;

            if (startIndex - nSlots < 0) {
                nSlots = startIndex;
            }

            if (nSlots > 0) {
                let rowsModified = this.state.rows.slice(0);

                if (nSlots > rowsModified.length) {
                    /* a very large scroll delta, bump the boundaries by the amount
                    not covered by our row slots */
                    this.yLowerBound += (nSlots - rowsModified.length) * this.cellHeight;
                    this.yUpperBound += (nSlots - rowsModified.length) * this.cellHeight;
                    nSlots = rowsModified.length;
                }

                if (nSlots > 0) {
                    /* Find the n highest rows and migrate them in order. */
                    let rowsDesc = chain(rowsModified).sortByOrder('y', 'desc').take(nSlots).value();
                    let pointer;

                    for (let i = 0, len = rowsDesc.length; i < len; i++) {
                        pointer = indexOf(rowsModified, rowsDesc[i]);
                        rowsModified[pointer] = {
                            data: this.props.getRow(startIndex - shiftIndex - i),
                            y: (startIndex - i - 1) * this.cellHeight
                        };
                    }

                    this.rowStartIndex -= shiftIndex;
                    this.rowEndIndex -= shiftIndex;
                    this.yLowerBound += nSlots * this.cellHeight;
                    this.yUpperBound += nSlots * this.cellHeight;

                    this.setState({rows: rowsModified});
                }
            }
        }
    }

    handleMoveIntent(event) {
        event.preventDefault();
        event.stopPropagation();

        if (event.deltaX === this.xCurrent
            && event.deltaY === this.yCurrent) {
            return;
        }

        if (!this.xBound) {
            this.xBound = React.findDOMNode(this).clientWidth - this.body.children[0].clientWidth;
        } // lazy calculate the table width on first move

        if (!this.head) {
            this.head = React.findDOMNode(this.refs.head);
        } // header doesn't get rendered until the second pass

        let yNext = this.yCurrent - event.deltaY;

        this.handleScrollDown(yNext);
        this.handleScrollUp(yNext);

        let xNext = this.xCurrent - event.deltaX;

        this.applyTranslations(
            this.normalizeCoordinate(xNext, this.xBound),
            this.normalizeCoordinate(yNext, this.yLowerBound)
        );
    }

    renderRows() {
        return map(this.state.rows, (row, index) => {
            return (
                <Row key={index}
                     columns={this.state.columns}
                     data={row.data}
                     y={row.y} />
            );
        });
    }

    renderBody() {
        return (
            <div ref='body'
                 className='ui-table-body'>
                {this.renderRows()}
            </div>
        );
    }

    renderHead() {
        if (!this.state.chokeRender) {
            let moddedData = {};

            this.state.columns.forEach(function pareDown(definition) {
                moddedData[definition.mapping] = definition.title;
            });

            return (
                <div ref='head' className='ui-table-header'>
                    <Row columns={this.state.columns}
                         data={moddedData} />
                </div>
            );
        }
    }

    // renderScrollbars() {
    //     return (
    //         <div>
    //             <div className='ui-table-x-scroller'>
    //                 <div ref='xNub'
    //                      className='ui-table-x-scroller-nub'
    //                      style={{
    //                         width: this.state.xNubSize,
    //                         [transformProp]: `translateX(${this.state.xProgress})`
    //                      }} />
    //             </div>
    //             <div className='ui-table-y-scroller'>
    //                 <div ref='yNub'
    //                      className='ui-table-y-scroller-nub'
    //                      style={{
    //                         height: this.state.yNubSize,
    //                         [transformProp]: `translateY(${this.state.yProgress})`
    //                      }} />
    //             </div>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div className='ui-table-wrapper'
                 onWheel={this.handleMoveIntent.bind(this)}>
                <div ref='table'
                       className='ui-table'>
                    {this.renderHead()}
                    {this.renderBody()}
                </div>
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
    getRow: React.PropTypes.func
};

UITable.defaultProps = {
    columns: [],
    getRow: noop
};

export default UITable;
