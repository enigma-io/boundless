/**
 * A high-performance, infinite table view.
 * @class UITable
 */

import React from 'react';
import UIView from '../UIView';
import Row from './row';
import transformProp from '../UIUtils/transform';
import noop from '../UIUtils/noop';

/**
 * FOR FUTURE EYES
 *
 * There are a lot of places where shared this.{name} variables have been
 * used where they don't seem to be needed. This is completely on purpose to
 * reduce memory pressure during scroll operations. If you change them back to
 * normal vars, you'll see more GCs in your JS profiler... so don't do it!
 */

/**
 * ORDER OF OPERATIONS
 *
 * 1. initial render w/ one row of cells
 * 2. capture table & cell sizing metrics
 * 3. apply widths to column definitions
 * 4. render pass 2 w/ column heads and the rest of the cells
 */

let _findWhereIndex = null;

/** @ignore */
const findWhere = function findWhere(array, property, value) {
    _findWhereIndex = array.length - 1;

    while (_findWhereIndex > -1) {
        if (array[_findWhereIndex][property] === value) {
            return array[_findWhereIndex];
        }

        _findWhereIndex -= 1;
    }
}; // optimized specifically to only look for a single key:value match

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
            ariaSpokenOutput: '',
            chokeRender: true,
            currentActiveRowIndex: -1,
            rows: [{
                data: this.props.getRow(0),
                setIndex: 0,
                y: 0,
            }],
            rowsOrderedByY: [0],
            columns: this.props.columns.slice(0),
            xScrollerNubSize: null,
            yScrollerNubSize: null,
        };
    }

    resetInternalCaches() {
        this._xCurrent = this._yCurrent = 0;
        this._xNext = this._yNext = 0;
        this._lastXScrollNubPosition = this._xScrollNubPosition = 0;
        this._lastYScrollNubPosition = this._yScrollNubPosition = 0;

        // temporary variables in various calculations
        this._iterator = null;
        this._nextActiveRow = null;
        this._nRowsToShift = null;
        this._orderedYArrayTargetIndex = null;
        this._rowPointer = null;
        this._shiftDelta = null;
        this._targetIndex = null;

        this._calculateXScrollerNubSize = null;
        this._calculateYScrollerNubSize = null;

        this._componentDidUpdate_node = null;
        this._componentDidUpdate_nodeStyle = null;

        this._captureConstraints_firstRow = null;
        this._captureConstraints_firstRowCells = null;
        this._captureConstraints_container = null;
        this._captureConstraints_tableWidth = null;
        this._captureConstraints_generatedRows = null;
        this._captureConstraints_rowsOrderedByY = null;

        this._ariaExposeFullRowData = null;
    }

    componentDidMount() {
        this.captureConstraints();
    }

    componentWillReceiveProps() {
        this.setState(this.initialState(), () => this.captureConstraints());
    }

    shouldComponentUpdate() {
        /* so we can reuse state.rows to avoid extra array allocations in the scroll handlers - in this case a few more CPU cycles are far cheaper than running up against the GC */
        return true;
    }

    componentDidUpdate() {
        if (this.refs.head && this._minimumColumnWidth !== undefined) {
            this._componentDidUpdate_node = this.refs.wrapper.getElementsByClassName('ui-table-header-cell')[0];

            if (this._componentDidUpdate_node) {
                this._componentDidUpdate_nodeStyle = window.getComputedStyle(this._componentDidUpdate_node);

                // will be NaN if not a pixel value
                this._maximumColumnWidth = parseInt(this._componentDidUpdate_nodeStyle.maxWidth, 10);
                this._minimumColumnWidth = parseInt(this._componentDidUpdate_nodeStyle.minWidth, 10);
            }
        }
    }

    calculateXScrollerNubSize() {
        this._calculateXScrollerNubSize = this._containerWidth - Math.abs(this._xMaximumTranslation);

        return this._calculateXScrollerNubSize < 12 ? 12 : this._calculateXScrollerNubSize;
    }

    calculateYScrollerNubSize() {
        this._calculateYScrollerNubSize = this._containerHeight * (this.nRowsToRender / this.props.totalRows);

        return this._calculateYScrollerNubSize < 12 ? 12 : this._calculateYScrollerNubSize;
    }

    captureConstraints() {
        this.resetInternalCaches();

        this._captureConstraints_firstRow = this.refs.body.getElementsByClassName('ui-table-row')[0];
        this._captureConstraints_firstRowCells = this._captureConstraints_firstRow.getElementsByClassName('ui-table-cell');
        this._captureConstraints_container = this.refs.wrapper;

        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */

        this._cellHeight = this._captureConstraints_firstRowCells[0].clientHeight || 40;
        this._rowWidth = this._captureConstraints_firstRow.clientWidth;
        this._containerHeight = this._captureConstraints_container.clientHeight || 150;
        this._containerWidth = this._captureConstraints_container.clientWidth || 500;
        this._xScrollerWidth = this.refs.xScroller.clientWidth;

        this.nRowsToRender = Math.ceil((this._containerHeight * 1.3) / this._cellHeight);

        if (this.nRowsToRender > this.props.totalRows) {
            this.nRowsToRender = this.props.totalRows;
        } // rendering more rows than we have content is not constructive.

        this._rowStartIndex = 0;
        this._rowEndIndex = this.nRowsToRender;

        this._captureConstraints_tableWidth = this._captureConstraints_firstRow.clientWidth || 500;

        this._xMaximumTranslation =   this._containerWidth > this._captureConstraints_tableWidth
                                   ? 0
                                   : this._containerWidth - this._captureConstraints_tableWidth;

        this._yUpperBound = 0;
        this._yLowerBound = this._containerHeight - (this.nRowsToRender * this._cellHeight);

        this._captureConstraints_generatedRows = [];
        this._captureConstraints_rowsOrderedByY = [];

        for (this._iterator = 0; this._iterator < this.nRowsToRender; this._iterator += 1) {
            this._captureConstraints_generatedRows.push({
                data: this.props.getRow(this._iterator),
                setIndex: this._iterator,
                y: this._cellHeight * this._iterator,
            });

            this._captureConstraints_rowsOrderedByY.push(this._iterator);
        }

        this.setState({
            chokeRender: false,
            columns: this.state.columns.map(function discoverWidth(column, index) {
                return {
                    ...column,
                    width: Math.ceil(this._captureConstraints_firstRowCells[index].getBoundingClientRect().width),
                };
            }, this),
            rows: this._captureConstraints_generatedRows,
            rowsOrderedByY: this._captureConstraints_rowsOrderedByY,
            xScrollerNubSize: this.calculateXScrollerNubSize(),
            yScrollerNubSize: this.calculateYScrollerNubSize(),
        });
    }

    handleScrollDown() {
        if (   this._rowEndIndex === this.props.totalRows
            || this._yNext >= this._yLowerBound) {
            return;
        }

        /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this._nRowsToShift = Math.ceil(
            Math.abs(this._yNext - this._yLowerBound) / this._cellHeight
        );

        if (this._nRowsToShift + this._rowEndIndex + 1 > this.props.totalRows) {
            /* more rows than there is data available, truncate */
            this._nRowsToShift = this.props.totalRows - this._rowEndIndex + 1;
        }

        if (this._nRowsToShift > 0) {
            if (this._nRowsToShift > this.nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this._shiftDelta = this._nRowsToShift - this.nRowsToRender;

                this._yUpperBound -= this._shiftDelta * this._cellHeight;
                this._yLowerBound -= this._shiftDelta * this._cellHeight;

                this._rowStartIndex += this._shiftDelta;
                this._rowEndIndex += this._shiftDelta;

                this._nRowsToShift = this.nRowsToRender;
            }

            if (this._nRowsToShift > 0) {
                /* move the lowest Y-value rows to the bottom of the ordering array */
                this._orderedYArrayTargetIndex = 0;

                for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator++) {
                    this._targetIndex = this._rowEndIndex + this._iterator;

                    this._rowPointer = this.state.rows[this.state.rowsOrderedByY[this._orderedYArrayTargetIndex]];
                    this._rowPointer.data = this.props.getRow(this._targetIndex);
                    this._rowPointer.setIndex = this._targetIndex;
                    this._rowPointer.y = this._targetIndex * this._cellHeight;

                    this.state.rowsOrderedByY.push(this.state.rowsOrderedByY.shift());
                }

                this._rowStartIndex += this._nRowsToShift;
                this._rowEndIndex += this._nRowsToShift;

                this._yUpperBound -= this._nRowsToShift * this._cellHeight;
                this._yLowerBound -= this._nRowsToShift * this._cellHeight;

                this.setState({rows: this.state.rows});
            }
        }
    }

    handleScrollUp() {
        if (this._rowStartIndex === 0 || this._yNext <= this._yUpperBound) {
            return;
        }

        /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this._nRowsToShift = Math.ceil(
            Math.abs(this._yNext - this._yUpperBound) / this._cellHeight
        );

        if (this._rowStartIndex - this._nRowsToShift < 0) {
            this._nRowsToShift = this._rowStartIndex;
        }

        if (this._nRowsToShift > 0) {
            if (this._nRowsToShift > this.nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this._shiftDelta = this._nRowsToShift - this.nRowsToRender;

                this._yUpperBound += this._shiftDelta * this._cellHeight;
                this._yLowerBound += this._shiftDelta * this._cellHeight;

                this._rowStartIndex -= this._shiftDelta;
                this._rowEndIndex -= this._shiftDelta;

                this._nRowsToShift = this.nRowsToRender;
            }

            if (this._nRowsToShift > 0) {
                /* move the highest Y-value rows to the top of the ordering array */
                this._orderedYArrayTargetIndex = this.state.rowsOrderedByY.length - 1;

                for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator++) {
                    this._targetIndex = this._rowStartIndex - this._iterator - 1;

                    this._rowPointer = this.state.rows[this.state.rowsOrderedByY[this._orderedYArrayTargetIndex]];
                    this._rowPointer.data = this.props.getRow(this._targetIndex);
                    this._rowPointer.setIndex = this._targetIndex;
                    this._rowPointer.y = this._targetIndex * this._cellHeight;

                    this.state.rowsOrderedByY.unshift(this.state.rowsOrderedByY.pop());
                }

                this._rowStartIndex -= this._nRowsToShift;
                this._rowEndIndex -= this._nRowsToShift;

                this._yUpperBound += this._nRowsToShift * this._cellHeight;
                this._yLowerBound += this._nRowsToShift * this._cellHeight;

                this.setState({rows: this.state.rows});
            }
        }
    }

    handleMoveIntent(event) {
        event.preventDefault();

        if ((event.deltaX === 0 && event.deltaY === 0)
            || this._manuallyScrollingY && event.deltaY === 0
            || this._manuallyScrollingX && event.deltaX === 0) {
            return;
        }

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this._xNext = this._manuallyScrollingY ? 0 : this._xCurrent - event.deltaX;

        if (this._xNext > 0) {
            this._xNext = 0;
        } else if (this._xNext < this._xMaximumTranslation) {
            this._xNext = this._xMaximumTranslation;
        }

        this._yNext = this._manuallyScrollingX ? 0 : this._yCurrent - event.deltaY;

        if (this._yNext < this._yCurrent) {
            this.handleScrollDown();
        } else if (this._yNext > this._yCurrent) {
            this.handleScrollUp();
        }

        if (this._yNext > 0) {
            this._yNext = 0;
        } else if (this._yNext < this._yLowerBound) {
            this._yNext = this._yLowerBound;
        }

        this._xScrollNubPosition =   (Math.abs(this._xNext) / (this._rowWidth - this._containerWidth))
                                  * (this._xScrollerWidth - this.state.xScrollerNubSize);

        if (this._xScrollNubPosition + this.state.xScrollerNubSize > this._xScrollerWidth) {
            this._xScrollNubPosition = this._xScrollerWidth - this.state.xScrollerNubSize;
        }

        this._yScrollNubPosition = (this._rowStartIndex / this.props.totalRows) * this._containerHeight;

        if (this._yScrollNubPosition + this.state.yScrollerNubSize > this._containerHeight) {
            this._yScrollNubPosition = this._containerHeight - this.state.yScrollerNubSize;
        }

        /* Do all transforms grouped together */

        // Header
        if (this._xNext !== this._xCurrent) {
            this.refs.head.style[transformProp] = 'translate3d(' + this._xNext + 'px, 0px, 0px)';
        }

        // Wrapper
        this.refs.body.style[transformProp] = 'translate3d(' + this._xNext + 'px, ' + this._yNext + 'px, 0px)';

        // X-Nub
        if (this._xScrollNubPosition !== this._lastXScrollNubPosition) {
            this.refs.xScrollerNub.style[transformProp] = 'translate3d(' + this._xScrollNubPosition + 'px, 0px, 0px)';
            this._lastXScrollNubPosition = this._xScrollNubPosition;
        }

        // Y-nub
        if (this._yScrollNubPosition !== this._lastYScrollNubPosition) {
            this.refs.yScrollerNub.style[transformProp] = 'translate3d(0px, ' + this._yScrollNubPosition + 'px, 0px)';
            this._lastYScrollNubPosition = this._yScrollNubPosition;
        }

        this._xCurrent = this._xNext;
        this._yCurrent = this._yNext;
    }

    handleColumnResize(delta) {
        if (delta === 0) {
            return;
        }

        let adjustedDelta = delta;
        let newTableWidth = 0;

        let copy = this.state.columns.map(definition => {
            if (definition.mapping !== this._manuallyResizingColumn.mapping) {
                newTableWidth += definition.width;

                return definition;
            }

            /* Before any measurements are applied, first we need to compare the delta to the known cell width thresholds and scale appropriately. */

            if (   adjustedDelta < 0
                && !isNaN(this._minimumColumnWidth)
                && definition.width + adjustedDelta < this._minimumColumnWidth) {
                    adjustedDelta = this._minimumColumnWidth - definition.width;
            } else if (!isNaN(this._maximumColumnWidth)
                       && definition.width + adjustedDelta > this._maximumColumnWidth) {
                adjustedDelta = this._maximumColumnWidth - definition.width;
            }

            newTableWidth += definition.width + adjustedDelta;

            return {
                ...definition,
                width: definition.width + adjustedDelta,
            };
        });

        if (newTableWidth <= this._containerWidth) {
            this._xMaximumTranslation = 0;
        } else {
            this._xMaximumTranslation -= adjustedDelta;
        }

        this.setState({
            columns: copy,
            xScrollerNubSize: this.calculateXScrollerNubSize(),
        }, () => {
            this._rowWidth = this.refs.body.getElementsByClassName('ui-table-row')[0].clientWidth;

            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
            if (adjustedDelta < 0) {
                this.handleMoveIntent({
                    deltaX: adjustedDelta,
                    deltaY: 0,
                    preventDefault: noop,
                });
            }
        });
    }

    handleColumnDragStart(event) {
        if (event.button === 0) {
            this._lastColumnX = event.clientX;

            this._manuallyResizingColumn = this.state.columns[event.target.getAttribute('data-column-index')];

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.nativeEvent.preventDefault();
        }
    }

    handleXScrollerDragStart(event) {
        if (event.button === 0) {
            this._lastXScroll = event.clientX;
            this._manuallyScrollingX = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.nativeEvent.preventDefault();
        }
    }

    handleYScrollerDragStart(event) {
        if (event.button === 0) {
            this._lastYScroll = event.clientY;
            this._manuallyScrollingY = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.nativeEvent.preventDefault();
        }
    }

    handleDragMove(event) {
        if (event.button === 0) {
            if (this._manuallyResizingColumn) {
                this.handleColumnResize(event.clientX - this._lastColumnX);

                this._lastColumnX = event.clientX;
            }

            if (this._manuallyScrollingX) {
                this.handleMoveIntent({
                    deltaX: event.clientX - this._lastXScroll,
                    deltaY: 0,
                    preventDefault: noop,
                });

                this._lastXScroll = event.clientX;
            }

            if (this._manuallyScrollingY) {
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: ((event.clientY - this._lastYScroll) / this._containerHeight)
                            * this.props.totalRows
                            * this._cellHeight,
                    preventDefault: noop,
                });

                this._lastYScroll = event.clientY;
            }
        }
    }

    handleDragEnd() {
        // If the mouseup happens outside the table, it won't be detected without this listener
        window.removeEventListener('mouseup', this.handleDragEnd, true);

        this._manuallyScrollingX = this._manuallyScrollingY = this._manuallyResizingColumn = false;
    }

    handleRowClick(event, clickedRowData) {
        if (this.props.onRowInteract) {
            event.persist();
            this.props.onRowInteract(event, clickedRowData);
        }

        this.setState({
            currentActiveRowIndex: findWhere(
                this.state.rows, 'data', clickedRowData
            ).setIndex,
        });
    }

    renderRows() {
        return this.state.rows.map((row, index) => {
            return (
                <Row key={index}
                     active={row.setIndex === this.state.currentActiveRowIndex}
                     columns={this.state.columns}
                     data={row.data}
                     even={row.setIndex % 2 === 0}
                     y={row.y}
                     onInteract={this.handleRowClick}
                     onCellInteract={this.props.onCellInteract} />
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

    renderColumnResizeHandle(column, index) {
        if (column.resizable) {
            return (
                <div className='ui-table-header-cell-resize-handle'
                     data-column-index={index}
                     onMouseDown={this.handleColumnDragStart} />
            );
        }
    }

    renderHead() {
        if (!this.state.chokeRender) {
            return (
                <div ref='head' className='ui-table-header'>
                    <div className='ui-table-row ui-table-header-row'>
                        {this.state.columns.map((column, index) => {
                            return (
                                <div key={index}
                                     className='ui-table-cell ui-table-header-cell'
                                     style={{width: typeof column.width === 'number' ? column.width : null}}>
                                    <div className='ui-table-cell-inner'>
                                        <span className='ui-table-cell-inner-text'>{column.title}</span>
                                    </div>

                                    {this.renderColumnResizeHandle(column, index)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }

    renderScrollbars() {
        return (
            <div>
                <div ref='xScroller'
                     className='ui-table-x-scroller'
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

    changeActiveRow(delta) {
        this._nextActiveRow = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex + delta);

        if (this._nextActiveRow) {
            this.setState({
                ariaSpokenOutput: this._nextActiveRow.data[this.state.columns[0].mapping],
                currentActiveRowIndex: this._nextActiveRow.setIndex,
            });

            if (
                   (delta === -1 && this._nextActiveRow.y * -1 > this._yCurrent)
                || (delta === 1 && this._nextActiveRow.y * -1 - this._cellHeight < this._yCurrent - this._containerHeight + this._cellHeight) // 1 unit of cellHeight is removed to compensate for the header row
            ) { // Destination row is outside the viewport, so simulate a scroll
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: this._cellHeight * delta,
                    preventDefault: noop,
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
                deltaY: (   (    this._rowStartIndex > this.state.currentActiveRowIndex
                              && this.state.currentActiveRowIndex - this._rowStartIndex)
                         || (    this._rowStartIndex < this.state.currentActiveRowIndex
                              && this.state.currentActiveRowIndex - this._rowStartIndex)
                         + delta) * this._cellHeight,
                preventDefault: noop,
            });

            // start the process again, now that the row is available
            window.requestAnimationFrame(() => this.changeActiveRow(delta));
        }

        this._nextActiveRow = null;
    }

    ariaExposeFullRowData() {
        this._ariaExposeFullRowData = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex);

        if (this._ariaExposeFullRowData) {
            this.setState({
                ariaSpokenOutput: this.state.columns.map(column => {
                    return `${column.title}: ${this._ariaExposeFullRowData.data[column.mapping]}`;
                }).join('\n'),
            });
        }
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
        case 'Enter':
            this.ariaExposeFullRowData();
            event.preventDefault();
            break;
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    renderNotification() {
        return (
            <div ref='aria'
                 className={this.props.offscreenClass}
                 aria-live='polite'>
                {this.state.ariaSpokenOutput}
            </div>
        );
    }

    render() {
        return (
            <div {...this.props}
                 ref='wrapper'
                 className={'ui-table-wrapper ' + this.props.className}
                 onKeyDown={this.handleKeyDown}
                 onMouseMove={this.handleDragMove}
                 onWheel={this.handleMoveIntent}
                 tabIndex='0'>
                <div ref='table'
                     className='ui-table'>
                    {this.renderHead()}
                    {this.renderBody()}
                </div>
                {this.renderNotification()}
                {this.renderScrollbars()}
            </div>
        );
    }
}

UITable.propTypes = {
    columns: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            mapping: React.PropTypes.string,
            resizable: React.PropTypes.bool,
            title: React.PropTypes.string,
            width: React.PropTypes.number,
        })
    ),
    getRow: React.PropTypes.func,
    offscreenClass: React.PropTypes.string,
    onCellInteract: React.PropTypes.func,
    onRowInteract: React.PropTypes.func,
    name: React.PropTypes.string,
    totalRows: React.PropTypes.number,
};

UITable.defaultProps = {
    className: '',
    columns: [],
    getRow: noop,
    offscreenClass: 'ui-offscreen',
    totalRows: 0,
};

export default UITable;
