import UIView from '../UIView';
import Row from './row';
import React from 'react';
import transformProp from '../UIUtils/transform';
import {chain, each, indexOf, map, merge, noop} from 'lodash';

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
                setIndex: 0,
                y: 0
            }],
            columns: this.props.columns.slice(0),
            xNubSize: null,
            yNubSize: null
        };
    }

    calculateXNubSize() {
        let px = this.containerWidth - Math.abs(this.xBound);

        return px < 12 ? 12 : px;
    }

    calculateYNubSize() {
        let px = this.rowEndIndex / this.props.totalRows;

        return px < 12 ? 12 : px;
    }

    captureDimensions() {
        let firstRow = this.body.getElementsByClassName('ui-table-row')[0];
        let firstRowCells = firstRow.getElementsByClassName('ui-table-cell');
        let container = React.findDOMNode(this);

        this.cellHeight = firstRowCells[0].clientHeight;
        this.containerHeight = container.clientHeight;
        this.containerWidth = container.clientWidth;

        let numRowsToRender = Math.ceil((this.containerHeight * 1.3) / this.cellHeight);

        this.rowStartIndex = 0;
        this.rowEndIndex = numRowsToRender;

        let tableWidth = firstRow.clientWidth;

        this.xBound = this.containerWidth - tableWidth;

        this.yUpperBound = 0;
        this.yLowerBound = this.containerHeight - (numRowsToRender * this.cellHeight);

        this.setState({
            chokeRender: false,
            columns: map(this.state.columns, function discoverWidth(column, index) {
                return merge({
                    width: Math.ceil(firstRowCells[index].getBoundingClientRect().width)
                }, column);
            }),
            rows: map(new Array(numRowsToRender), function generateRowSlot(/*ignore*/x, index) {
                return {
                    data: this.props.getRow(index),
                    setIndex: index,
                    y: this.cellHeight * index
                };
            }, this),
            xNubSize: this.calculateXNubSize(),
            yNubSize: this.calculateYNubSize()
        });
    }

    componentDidMount() {
        this.xCurrent = this.yCurrent = 0;
        this.body = React.findDOMNode(this.refs.body);
        this.xNub = React.findDOMNode(this.refs.xNub);
        this.yNub = React.findDOMNode(this.refs.yNub);

        this.captureDimensions();
    }

    handleScrollDown(yNext) {
        let maxIndex = this.props.totalRows;

        if (yNext < this.yLowerBound
            && this.rowEndIndex < maxIndex) {
            /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request
            the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            let nRowsToShift = Math.ceil((Math.abs(yNext - this.yLowerBound)) / this.cellHeight);

            if (nRowsToShift + this.rowEndIndex > maxIndex) {
                /* more rows than there is data available, truncate */
                nRowsToShift = maxIndex - this.rowEndIndex;
            }

            if (nRowsToShift > 0) {
                let rowsModified = this.state.rows.slice(0);
                let numRowsAvailable = rowsModified.length;

                if (nRowsToShift > numRowsAvailable) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    let updatedBound = (nRowsToShift - numRowsAvailable) * this.cellHeight;

                    this.yUpperBound -= updatedBound;
                    this.yLowerBound -= updatedBound;

                    this.rowStartIndex += nRowsToShift - numRowsAvailable;
                    this.rowEndIndex += nRowsToShift - numRowsAvailable;

                    nRowsToShift = numRowsAvailable;
                }

                if (nRowsToShift > 0) {
                    /* Find the lowest y-value rows and migrate them to the end of the heap */
                    let rowsSorted = chain(rowsModified).sortByOrder('y', 'asc').take(nRowsToShift).value();
                    let nextIndex;

                    each(rowsSorted, function reallocateSlot(row, arrIndex) {
                        nextIndex = this.rowEndIndex + arrIndex;
                        rowsModified[indexOf(rowsModified, row)] = {
                            data: this.props.getRow(nextIndex),
                            setIndex: nextIndex,
                            y: nextIndex * this.cellHeight
                        };
                    }, this);

                    this.rowStartIndex += nRowsToShift;
                    this.rowEndIndex += nRowsToShift;

                    this.yUpperBound -= nRowsToShift * this.cellHeight;
                    this.yLowerBound -= nRowsToShift * this.cellHeight;

                    this.setState({rows: rowsModified});
                }
            }
        }
    }

    handleScrollUp(yNext) {
        if (yNext > this.yUpperBound
            && this.rowStartIndex > 0) {
            /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request
            the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            let nRowsToShift = Math.ceil((Math.abs(yNext - this.yUpperBound)) / this.cellHeight);

            if (this.rowStartIndex - nRowsToShift < 0) {
                nRowsToShift = this.rowStartIndex;
            }

            if (nRowsToShift > 0) {
                let rowsModified = this.state.rows.slice(0);
                let numRowsAvailable = rowsModified.length;

                if (nRowsToShift > numRowsAvailable) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    let updatedBound = (nRowsToShift - numRowsAvailable) * this.cellHeight;

                    this.rowStartIndex -= nRowsToShift - numRowsAvailable;
                    this.rowEndIndex -= nRowsToShift - numRowsAvailable;

                    this.yUpperBound += updatedBound;
                    this.yLowerBound += updatedBound;

                    nRowsToShift = numRowsAvailable;
                }

                if (nRowsToShift > 0) {
                    /* Find the highest y-value rows and migrate them to the top of the heap */
                    let rowsSorted = chain(rowsModified).sortByOrder('y', 'desc').take(nRowsToShift).value();
                    let prevIndex;

                    each(rowsSorted, function reallocateSlot(row, arrIndex) {
                        prevIndex = this.rowStartIndex - arrIndex - 1;
                        rowsModified[indexOf(rowsModified, row)] = {
                            data: this.props.getRow(prevIndex),
                            setIndex: prevIndex,
                            y: prevIndex * this.cellHeight
                        };
                    }, this);

                    this.rowStartIndex -= nRowsToShift;
                    this.rowEndIndex -= nRowsToShift;

                    this.yUpperBound += nRowsToShift * this.cellHeight;
                    this.yLowerBound += nRowsToShift * this.cellHeight;

                    this.setState({rows: rowsModified});
                }
            }
        }
    }

    normalizeCoordinate(next, bound) {
        if (next > 0) {
            return 0;
        } else if (next < bound) {
            return bound;
        }

        return next;
    }

    applyTranslations(xNext, yNext) {
        if (xNext !== this.xCurrent) {
            this.head.style[transformProp] = `translate3d(${xNext}px, 0px, 0px)`;
        }

        this.body.style[transformProp] = `translate3d(${xNext}px, ${yNext}px, 0px)`;

        this.xCurrent = xNext;
        this.yCurrent = yNext;
    }

    applyXProgress() {
        this.xNub.style[transformProp] = `translate3d(${Math.abs(this.xCurrent)}px, 0px, 0px)`;
    }

    applyYProgress() {
        let yPos = (this.rowStartIndex / this.props.totalRows) * this.containerHeight;

        if (yPos + this.state.yNubSize > this.containerHeight) {
            yPos = this.containerHeight - this.state.yNubSize;
        }

        this.yNub.style[transformProp] = `translate3d(0px, ${yPos}px, 0px)`;
    }

    handleMoveIntent(event) {
        event.preventDefault();

        if (event.deltaX === this.xCurrent
            && event.deltaY === this.yCurrent) {
            return;
        }

        if (!this.head) {
            this.head = React.findDOMNode(this.refs.head);
        } // header doesn't get rendered until the second pass

        /* lock the translation axis if the user is manually manipulating the synthetic scrollbars */
        let xNext = this.manuallyScrollingY ? 0 : this.xCurrent - event.deltaX;
        let yNext = this.manuallyScrollingX ? 0 : this.yCurrent - event.deltaY;

        if (yNext < this.yCurrent) {
            this.handleScrollDown(yNext);
        } else if (yNext > this.yCurrent) {
            this.handleScrollUp(yNext);
        }

        this.applyTranslations(
            this.normalizeCoordinate(xNext, this.xBound),
            this.normalizeCoordinate(yNext, this.yLowerBound)
        );

        this.applyXProgress();
        this.applyYProgress();
    }

    handleColumnResize(delta) {
        if (delta === 0) {
            return;
        }

        if (typeof this.minimumColumnWidth === 'undefined') {
            let style = window.getComputedStyle(
                React.findDOMNode(this).querySelector('.ui-table-header-cell')
            );

            // will be NaN if not a pixel value
            this.maximumColumnWidth = parseInt(style.maxWidth, 10);
            this.minimumColumnWidth = parseInt(style.minWidth, 10);
        }

        let adjustedDelta = delta;
        let copy = map(this.state.columns, function alterMatch(definition) {
            if (definition.mapping !== this.manuallyResizingColumn.mapping) {
                return definition;
            }

            /* Before any measurements are applied, first we need to compare the delta to the known
            cell width thresholds and scale appropriately. */

            if (adjustedDelta < 0
                && !isNaN(this.minimumColumnWidth)
                && definition.width + adjustedDelta < this.minimumColumnWidth) {
                    adjustedDelta = this.minimumColumnWidth - definition.width;
            } else if (!isNaN(this.maximumColumnWidth)
                       && definition.width + adjustedDelta > this.maximumColumnWidth) {
                adjustedDelta = this.maximumColumnWidth - definition.width;
            }

            return merge(definition, {
                width: definition.width + adjustedDelta
            });
        }, this);

        /* The xBound is then modified (the basis for all horizontal translation operations) and
        also the xNubSize, which is recomputed in the following setState. */
        this.xBound -= adjustedDelta;

        this.setState({
            columns: copy,
            xNubSize: this.calculateXNubSize()
        }, () => {
            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than the
            overall container, whitespace will appear regardless. */
            if (adjustedDelta < 0) {
                this.handleMoveIntent({
                    deltaX: adjustedDelta,
                    deltaY: 0,
                    preventDefault: noop
                });
            }
        });
    }

    handleColumnDragStart(reference, event) {
        if (event.buttons === 1) {
            this.lastColumnX = event.clientX;
            this.manuallyResizingColumn = reference;
        }
    }

    handleXScrollerDragStart(event) {
        if (event.buttons === 1) {
            this.lastXScroll = event.clientX;
            this.manuallyScrollingX = true;
        }
    }

    handleYScrollerDragStart(event) {
        if (event.buttons === 1) {
            this.lastYScroll = event.clientY;
            this.manuallyScrollingY = true;
        }
    }

    handleDragMove(event) {
        if (event.buttons === 1) {
            if (this.manuallyResizingColumn) {
                this.handleColumnResize(event.clientX - this.lastColumnX);

                this.lastColumnX = event.clientX;
            }

            if (this.manuallyScrollingX) {
                this.handleMoveIntent({
                    deltaX: event.clientX - this.lastXScroll,
                    deltaY: 0,
                    preventDefault: noop
                });

                this.lastXScroll = event.clientX;
            }

            if (this.manuallyScrollingY) {
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: ((event.clientY - this.lastYScroll) / this.containerHeight) * this.props.totalRows * this.cellHeight,
                    preventDefault: noop
                });

                this.lastYScroll = event.clientY;
            }
        }
    }

    handleDragEnd() {
        if (this.manuallyResizingColumn) {
            this.manuallyResizingColumn = null;
        }

        if (this.manuallyScrollingX) {
            this.manuallyScrollingX = false;
        }

        if (this.manuallyScrollingY) {
            this.manuallyScrollingY = false;
        }
    }

    renderRows() {
        return map(this.state.rows, function generateRow(row, index) {
            return (
                <Row key={index}
                     columns={this.state.columns}
                     data={row.data}
                     even={(row.setIndex) % 2 === 0}
                     y={row.y} />
            );
        }, this);
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
            return (
                <div ref='head' className='ui-table-header'>
                    <div className='ui-table-row ui-table-header-row'>
                        {map(this.state.columns, function generateColumnCell(column, index) {
                            return (
                                <div key={index}
                                     className='ui-table-cell ui-table-header-cell'
                                     style={{width: typeof column.width === 'number' ? column.width : null}}>
                                    <div className='ui-table-cell-inner'>
                                        <span className='ui-table-cell-inner-text'>{column.title}</span>
                                    </div>
                                    <div className='ui-table-header-cell-resize-handle'
                                         onMouseDown={this.handleColumnDragStart.bind(this, column)} />
                                </div>
                            );
                        }, this)}
                    </div>
                </div>
            );
        }
    }

    renderScrollbars() {
        return (
            <div>
                <div className='ui-table-x-scroller'
                     onMouseDown={this.handleXScrollerDragStart.bind(this)}>
                    <div ref='xNub'
                         className='ui-table-x-scroller-nub'
                         style={{width: this.state.xNubSize}} />
                </div>
                <div className='ui-table-y-scroller'
                     onMouseDown={this.handleYScrollerDragStart.bind(this)}>
                    <div ref='yNub'
                         className='ui-table-y-scroller-nub'
                         style={{height: this.state.yNubSize}} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='ui-table-wrapper'
                 onMouseMove={this.handleDragMove.bind(this)}
                 onMouseUp={this.handleDragEnd.bind(this)}
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
    getRow: React.PropTypes.func,
    totalRows: React.PropTypes.number
};

UITable.defaultProps = {
    columns: [],
    getRow: noop
};

export default UITable;
