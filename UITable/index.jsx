/**
 * A high-performance, infinite table view.
 * @class UITable
 */

import UIView from '../UIView';
import Row from './row';
import React from 'react';
import transformProp from '../UIUtils/transform';
import {chain, each, findWhere, indexOf, map, merge, noop} from 'lodash';

/**
 * FOR FUTURE EYES
 *
 * There are a lot of places where shared this.{name} variables have been
 * used where they don't seem to be needed. This is completely on purpose to
 * reduce memory pressure during scroll operations. If you change them back to
 * normal vars, you'll see the sawtoothing in your JS profiler... so don't do it!
 */

/**
 * ORDER OF OPERATIONS
 *
 * 1. initial render w/ one row of cells
 * 2. capture table & cell sizing metrics
 * 3. apply widths to column definitions
 * 4. render pass 2 w/ column heads and the rest of the cells
 */

class UITable extends UIView {
    constructor(...args) {
        super(...args);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleMoveIntent = this.handleMoveIntent.bind(this);

        this.handleXScrollerDragStart = this.handleXScrollerDragStart.bind(this);
        this.handleYScrollerDragStart = this.handleYScrollerDragStart.bind(this);
        this.handleColumnDragStart = this.handleColumnDragStart.bind(this);
    }

    initialState() {
        return {
            chokeRender: true,
            currentActiveRowIndex: -1,
            rows: [{
                data: this.props.getRow(0),
                setIndex: 0,
                y: 0
            }],
            columns: this.props.columns.slice(0),
            xScrollerNubSize: null,
            yScrollerNubSize: null
        };
    }

    calculateXScrollerNubSize() {
        let px = this.containerWidth - Math.abs(this.xMaximumTranslation);

        return px < 12 ? 12 : px;
    }

    calculateYScrollerNubSize() {
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

        this.nRowsToRender = Math.ceil((this.containerHeight * 1.3) / this.cellHeight);

        this.rowStartIndex = 0;
        this.rowEndIndex = this.nRowsToRender;

        let tableWidth = firstRow.clientWidth;

        this.xMaximumTranslation = this.containerWidth > tableWidth ? 0 : this.containerWidth - tableWidth;

        this.yUpperBound = 0;
        this.yLowerBound = this.containerHeight - (this.nRowsToRender * this.cellHeight);

        this.setState({
            chokeRender: false,
            columns: map(this.state.columns, function discoverWidth(column, index) {
                return merge({
                    width: Math.ceil(firstRowCells[index].getBoundingClientRect().width)
                }, column);
            }),
            rows: map(new Array(this.nRowsToRender), function generateRowSlot(/*ignore*/x, index) {
                return {
                    data: this.props.getRow(index),
                    setIndex: index,
                    y: this.cellHeight * index
                };
            }, this),
            xScrollerNubSize: this.calculateXScrollerNubSize(),
            yScrollerNubSize: this.calculateYScrollerNubSize()
        });
    }

    componentDidMount() {
        this.body = React.findDOMNode(this.refs.body);
        this.nextActiveRow = null;
        this.nRowsToShift = 0;
        this.xCurrent = this.yCurrent = 0;
        this.xNext = this.yNext = null;
        this.xScrollerNub = React.findDOMNode(this.refs.xScrollerNub);
        this.yScrollerNub = React.findDOMNode(this.refs.yScrollerNub);
        this.yScrollNubPosition = 0;

        this.captureDimensions();
    }

    shouldComponentUpdate() {
        /* so we can reuse state.rows to avoid extra array allocations in the scroll handlers - in this case a few more CPU cycles are far cheaper than running up against the GC */
        return true;
    }

    componentDidUpdate() {
        if (!this.head) {
            this.head = React.findDOMNode(this.refs.head);
        } // header doesn't get rendered until the second pass

        if (this.head && typeof this.minimumColumnWidth === 'undefined') {
            let node = React.findDOMNode(this).querySelector('.ui-table-header-cell');

            if (node) {
                let nodeStyle = window.getComputedStyle(node);

                // will be NaN if not a pixel value
                this.maximumColumnWidth = parseInt(nodeStyle.maxWidth, 10);
                this.minimumColumnWidth = parseInt(nodeStyle.minWidth, 10);
            }
        }
    }

    handleScrollDown() {
        if (this.rowEndIndex === this.props.totalRows || this.yNext >= this.yLowerBound) {
            return;
        }

        /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this.nRowsToShift = Math.ceil(
            Math.abs(this.yNext - this.yLowerBound) / this.cellHeight
        );

        if (this.nRowsToShift + this.rowEndIndex > this.props.totalRows) {
            /* more rows than there is data available, truncate */
            this.nRowsToShift = this.props.totalRows - this.rowEndIndex;
        }

        if (this.nRowsToShift > 0) {
            if (this.nRowsToShift > this.nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this.yUpperBound -= (this.nRowsToShift - this.nRowsToRender) * this.cellHeight;
                this.yLowerBound -= (this.nRowsToShift - this.nRowsToRender) * this.cellHeight;

                this.rowStartIndex += this.nRowsToShift - this.nRowsToRender;
                this.rowEndIndex += this.nRowsToShift - this.nRowsToRender;

                this.nRowsToShift = this.nRowsToRender;
            }

            if (this.nRowsToShift > 0) {
                /* Find the lowest y-value rows and migrate them to the end of the heap */
                let rowsSorted = chain(this.state.rows).sortByOrder('y', 'asc').take(this.nRowsToShift).value();
                let nextIndex;

                each(rowsSorted, function reallocateSlot(row, arrIndex) {
                    nextIndex = this.rowEndIndex + arrIndex;
                    this.state.rows[indexOf(this.state.rows, row)] = {
                        data: this.props.getRow(nextIndex),
                        setIndex: nextIndex,
                        y: nextIndex * this.cellHeight
                    };
                }, this);

                this.rowStartIndex += this.nRowsToShift;
                this.rowEndIndex += this.nRowsToShift;

                this.yUpperBound -= this.nRowsToShift * this.cellHeight;
                this.yLowerBound -= this.nRowsToShift * this.cellHeight;

                this.setState({rows: this.state.rows});
            }
        }
    }

    handleScrollUp() {
        if (this.rowStartIndex === 0 || this.yNext <= this.yUpperBound) {
            return;
        }

        /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this.nRowsToShift = Math.ceil(
            Math.abs(this.yNext - this.yUpperBound) / this.cellHeight
        );

        if (this.rowStartIndex - this.nRowsToShift < 0) {
            this.nRowsToShift = this.rowStartIndex;
        }

        if (this.nRowsToShift > 0) {
            if (this.nRowsToShift > this.nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                let updatedBound = (this.nRowsToShift - this.nRowsToRender) * this.cellHeight;

                this.rowStartIndex -= this.nRowsToShift - this.nRowsToRender;
                this.rowEndIndex -= this.nRowsToShift - this.nRowsToRender;

                this.yUpperBound += updatedBound;
                this.yLowerBound += updatedBound;

                this.nRowsToShift = this.nRowsToRender;
            }

            if (this.nRowsToShift > 0) {
                /* Find the highest y-value rows and migrate them to the top of the heap */
                let rows = this.state.rows;
                let rowsSorted = chain(rows).sortByOrder('y', 'desc').take(this.nRowsToShift).value();
                let prevIndex;

                each(rowsSorted, function reallocateSlot(row, arrIndex) {
                    prevIndex = this.rowStartIndex - arrIndex - 1;
                    rows[indexOf(rows, row)] = {
                        data: this.props.getRow(prevIndex),
                        setIndex: prevIndex,
                        y: prevIndex * this.cellHeight
                    };
                }, this);

                this.rowStartIndex -= this.nRowsToShift;
                this.rowEndIndex -= this.nRowsToShift;

                this.yUpperBound += this.nRowsToShift * this.cellHeight;
                this.yLowerBound += this.nRowsToShift * this.cellHeight;

                this.setState({rows});
            }
        }
    }

    handleMoveIntent(event) {
        event.preventDefault();

        if ((event.deltaX === 0 && event.deltaY === 0)
            || this.manuallyScrollingY && event.deltaY === 0
            || this.manuallyScrollingX && event.deltaX === 0) {
            return;
        }

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this.xNext = this.manuallyScrollingY ? 0 : this.xCurrent - event.deltaX;

        if (this.xNext > 0) {
            this.xNext = 0;
        } else if (this.xNext < this.xMaximumTranslation) {
            this.xNext = this.xMaximumTranslation;
        }

        this.yNext = this.manuallyScrollingX ? 0 : this.yCurrent - event.deltaY;

        if (this.yNext < this.yCurrent) {
            this.handleScrollDown();
        } else if (this.yNext > this.yCurrent) {
            this.handleScrollUp();
        }

        if (this.yNext > 0) {
            this.yNext = 0;
        } else if (this.yNext < this.yLowerBound) {
            this.yNext = this.yLowerBound;
        }

        if (this.xNext !== this.xCurrent) {
            this.head.style[transformProp] = `translate3d(${this.xNext}px, 0px, 0px)`;
        }

        /* Move wrapper */
        this.body.style[transformProp] = `translate3d(${this.xNext}px, ${this.yNext}px, 0px)`;

        /* move scrollbar nubs */
        this.xScrollerNub.style[transformProp] = `translate3d(${Math.abs(this.xNext)}px, 0px, 0px)`;

        this.yScrollNubPosition = (this.rowStartIndex / this.props.totalRows) * this.containerHeight;

        if (this.yScrollNubPosition + this.state.yScrollerNubSize > this.containerHeight) {
            this.yScrollNubPosition = this.containerHeight - this.state.yScrollerNubSize;
        }

        this.yScrollerNub.style[transformProp] = `translate3d(0px, ${this.yScrollNubPosition}px, 0px)`;

        this.xCurrent = this.xNext;
        this.yCurrent = this.yNext;
    }

    handleColumnResize(delta) {
        if (delta === 0) {
            return;
        }

        let adjustedDelta = delta;
        let newTableWidth = 0;

        let copy = map(this.state.columns, function alterMatch(definition) {
            if (definition.mapping !== this.manuallyResizingColumn.mapping) {
                newTableWidth += definition.width;

                return definition;
            }

            /* Before any measurements are applied, first we need to compare the delta to the known cell width thresholds and scale appropriately. */

            if (   adjustedDelta < 0
                && !isNaN(this.minimumColumnWidth)
                && definition.width + adjustedDelta < this.minimumColumnWidth) {
                    adjustedDelta = this.minimumColumnWidth - definition.width;
            } else if (!isNaN(this.maximumColumnWidth)
                       && definition.width + adjustedDelta > this.maximumColumnWidth) {
                adjustedDelta = this.maximumColumnWidth - definition.width;
            }

            newTableWidth += definition.width + adjustedDelta;

            return merge(definition, {
                width: definition.width + adjustedDelta
            });
        }, this);

        if (newTableWidth <= this.containerWidth) {
            this.xMaximumTranslation = 0;
        } else {
            this.xMaximumTranslation -= adjustedDelta;
        }

        this.setState({
            columns: copy,
            xScrollerNubSize: this.calculateXScrollerNubSize()
        }, () => {
            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
            if (adjustedDelta < 0) {
                this.handleMoveIntent({
                    deltaX: adjustedDelta,
                    deltaY: 0,
                    preventDefault: noop
                });
            }
        });
    }

    handleColumnDragStart(event) {
        if (event.button === 0) {
            this.lastColumnX = event.clientX;
            this.manuallyResizingColumn = this.state.columns[event.target.getAttribute('data-column-index')];
        }
    }

    handleXScrollerDragStart(event) {
        if (event.button === 0) {
            this.lastXScroll = event.clientX;
            this.manuallyScrollingX = true;
        }
    }

    handleYScrollerDragStart(event) {
        if (event.button === 0) {
            this.lastYScroll = event.clientY;
            this.manuallyScrollingY = true;
        }
    }

    handleDragMove(event) {
        if (event.button === 0) {
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

    handleRowClick(event, clickedRowData) {
        if (this.props.onRowClick) {
            this.props.onRowClick(event, clickedRowData);
        }

        this.setState({currentActiveRowIndex: findWhere(this.state.rows, {data: clickedRowData}).setIndex});
    }

    renderRows() {
        return map(this.state.rows, function generateRow(row, index) {
            return (
                <Row key={index}
                     active={row.setIndex === this.state.currentActiveRowIndex}
                     columns={this.state.columns}
                     data={row.data}
                     even={(row.setIndex) % 2 === 0}
                     y={row.y}
                     onClick={this.handleRowClick}
                     onCellClick={this.props.onCellClick} />
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
                                         data-column-index={index}
                                         onMouseDown={this.handleColumnDragStart} />
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
                     onMouseDown={this.handleXScrollerDragStart}>
                    <div ref='xScrollerNub'
                         className='ui-table-x-scroller-nub'
                         style={{width: this.state.xScrollerNubSize}} />
                </div>
                <div className='ui-table-y-scroller'
                     onMouseDown={this.handleYScrollerDragStart}>
                    <div ref='yScrollerNub'
                         className='ui-table-y-scroller-nub'
                         style={{height: this.state.yScrollerNubSize}} />
                </div>
            </div>
        );
    }

    getClasses() {
        return ['ui-table-wrapper'].concat(this.props.className || []).join(' ');
    }

    changeActiveRow(delta, currentIndex) {
        this.nextActiveRow = findWhere(this.state.rows, {setIndex: this.state.currentActiveRowIndex + delta});

        if (this.nextActiveRow) {
            this.setState({ currentActiveRowIndex: this.nextActiveRow.setIndex });

            if (
                   (delta === -1 && this.nextActiveRow.y * -1 > this.yCurrent)
                || (delta === 1 && this.nextActiveRow.y * -1 - this.cellHeight < this.yCurrent - this.containerHeight + this.cellHeight) // 1 unit of cellHeight is removed to compensate for the header row
            ) { // Destination row is outside the viewport, so simulate a scroll
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: this.cellHeight * delta,
                    preventDefault: noop
                });
            }
        } else if (   (delta === -1 && this.state.currentActiveRowIndex > 0)
                   || (delta === 1 && this.state.currentActiveRowIndex < this.props.totalRows)) {
            /*
                The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                in the viewport.
             */
            this.handleMoveIntent({
                deltaX: 0,
                deltaY: (   (    this.rowStartIndex > this.state.currentActiveRowIndex
                              && this.state.currentActiveRowIndex - this.rowStartIndex)
                         || (    this.rowStartIndex < this.state.currentActiveRowIndex
                              && this.state.currentActiveRowIndex - this.rowStartIndex)
                         + delta) * this.cellHeight,
                preventDefault: noop
            });

            // start the process again, now that the row is available
            window.requestAnimationFrame(() => this.changeActiveRow(delta));
        }

        this.nextActiveRow = null;
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'ArrowDown':
            this.changeActiveRow(1);
            event.preventDefault();
            break;
        case 'ArrowUp':
            this.changeActiveRow(-1);
            event.preventDefault();
            break;
        }
    }

    render() {
        return (
            <div className={this.getClasses()}
                 onKeyDown={this.handleKeyDown}
                 onMouseMove={this.handleDragMove}
                 onMouseUp={this.handleDragEnd}
                 onWheel={this.handleMoveIntent}
                 tabIndex='0'>
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
    onCellClick: React.PropTypes.func,
    onRowClick: React.PropTypes.func,
    totalRows: React.PropTypes.number
};

UITable.defaultProps = {
    columns: [],
    getRow: noop
};

export default UITable;
