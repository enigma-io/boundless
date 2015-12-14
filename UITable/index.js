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

let cache_findWhereIndex = null;

/** @ignore */
const findWhere = function findWhere(array, property, value) {
    cache_findWhereIndex = array.length - 1;

    while (cache_findWhereIndex > -1) {
        if (array[cache_findWhereIndex][property] === value) {
            return array[cache_findWhereIndex];
        }

        cache_findWhereIndex -= 1;
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

    componentDidMount() {
        this.xCurrent = this.yCurrent = 0;
        this.xNext = this.yNext = null;
        this.lastXScrollNubPosition = this.xScrollNubPosition = 0;
        this.lastYScrollNubPosition = this.yScrollNubPosition = 0;

        // temporary variables in various calculations
        this.cache_iterator = null;
        this.cache_nextActiveRow = null;
        this.cache_nRowsToShift = null;
        this.cache_orderedYArrayTargetIndex = null;
        this.cache_rowPointer = null;
        this.cache_shiftDelta = null;
        this.cache_targetIndex = null;

        this.cache_calculateXScrollerNubSize = null;
        this.cache_calculateYScrollerNubSize = null;

        this.cache_componentDidUpdate_node = null;
        this.cache_componentDidUpdate_nodeStyle = null;

        this.cache_captureDimensions_firstRow = null;
        this.cache_captureDimensions_firstRowCells = null;
        this.cache_captureDimensions_container = null;
        this.cache_captureDimensions_tableWidth = null;
        this.cache_captureDimensions_generatedRows = null;
        this.cache_captureDimensions_rowsOrderedByY = null;

        this.cache_ariaExposeFullRowData = null;

        this.captureDimensions();
    }

    componentWillReceiveProps() {
        this.setState(this.initialState(), () => this.captureDimensions());
    }

    shouldComponentUpdate() {
        /* so we can reuse state.rows to avoid extra array allocations in the scroll handlers - in this case a few more CPU cycles are far cheaper than running up against the GC */
        return true;
    }

    componentDidUpdate() {
        if (this.refs.head && this.minimumColumnWidth !== undefined) {
            this.cache_componentDidUpdate_node = this.refs.wrapper.getElementsByClassName('ui-table-header-cell')[0];

            if (this.cache_componentDidUpdate_node) {
                this.cache_componentDidUpdate_nodeStyle = window.getComputedStyle(this.cache_componentDidUpdate_node);

                // will be NaN if not a pixel value
                this.maximumColumnWidth = parseInt(this.cache_componentDidUpdate_nodeStyle.maxWidth, 10);
                this.minimumColumnWidth = parseInt(this.cache_componentDidUpdate_nodeStyle.minWidth, 10);
            }
        }
    }

    calculateXScrollerNubSize() {
        this.cache_calculateXScrollerNubSize = this.containerWidth - Math.abs(this.xMaximumTranslation);

        return this.cache_calculateXScrollerNubSize < 12 ? 12 : this.cache_calculateXScrollerNubSize;
    }

    calculateYScrollerNubSize() {
        this.cache_calculateYScrollerNubSize = this.containerHeight * (this.nRowsToRender / this.props.totalRows);

        return this.cache_calculateYScrollerNubSize < 12 ? 12 : this.cache_calculateYScrollerNubSize;
    }

    captureDimensions() {
        this.cache_captureDimensions_firstRow = this.refs.body.getElementsByClassName('ui-table-row')[0];
        this.cache_captureDimensions_firstRowCells = this.cache_captureDimensions_firstRow.getElementsByClassName('ui-table-cell');
        this.cache_captureDimensions_container = this.refs.wrapper;

        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */

        this.cellHeight = this.cache_captureDimensions_firstRowCells[0].clientHeight || 40;
        this.rowWidth = this.cache_captureDimensions_firstRow.clientWidth;
        this.containerHeight = this.cache_captureDimensions_container.clientHeight || 150;
        this.containerWidth = this.cache_captureDimensions_container.clientWidth || 500;
        this.xScrollerWidth = this.refs.xScroller.clientWidth;

        this.nRowsToRender = Math.ceil((this.containerHeight * 1.3) / this.cellHeight);

        if (this.nRowsToRender > this.props.totalRows) {
            this.nRowsToRender = this.props.totalRows;
        } // rendering more rows than we have content is not constructive.

        this.rowStartIndex = 0;
        this.rowEndIndex = this.nRowsToRender;

        this.cache_captureDimensions_tableWidth = this.cache_captureDimensions_firstRow.clientWidth || 500;

        this.xMaximumTranslation =   this.containerWidth > this.cache_captureDimensions_tableWidth
                                   ? 0
                                   : this.containerWidth - this.cache_captureDimensions_tableWidth;

        this.yUpperBound = 0;
        this.yLowerBound = this.containerHeight - (this.nRowsToRender * this.cellHeight);

        this.cache_captureDimensions_generatedRows = [];
        this.cache_captureDimensions_rowsOrderedByY = [];

        for (this.cache_iterator = 0; this.cache_iterator < this.nRowsToRender; this.cache_iterator += 1) {
            this.cache_captureDimensions_generatedRows.push({
                data: this.props.getRow(this.cache_iterator),
                setIndex: this.cache_iterator,
                y: this.cellHeight * this.cache_iterator,
            });

            this.cache_captureDimensions_rowsOrderedByY.push(this.cache_iterator);
        }

        this.setState({
            chokeRender: false,
            columns: this.state.columns.map(function discoverWidth(column, index) {
                return {
                    ...column,
                    width: Math.ceil(this.cache_captureDimensions_firstRowCells[index].getBoundingClientRect().width),
                };
            }, this),
            rows: this.cache_captureDimensions_generatedRows,
            rowsOrderedByY: this.cache_captureDimensions_rowsOrderedByY,
            xScrollerNubSize: this.calculateXScrollerNubSize(),
            yScrollerNubSize: this.calculateYScrollerNubSize(),
        });
    }

    handleScrollDown() {
        if (   this.rowEndIndex === this.props.totalRows
            || this.yNext >= this.yLowerBound) {
            return;
        }

        /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this.cache_nRowsToShift = Math.ceil(
            Math.abs(this.yNext - this.yLowerBound) / this.cellHeight
        );

        if (this.cache_nRowsToShift + this.rowEndIndex > this.props.totalRows) {
            /* more rows than there is data available, truncate */
            this.cache_nRowsToShift = this.props.totalRows - this.rowEndIndex;
        }

        if (this.cache_nRowsToShift > 0) {
            if (this.cache_nRowsToShift > this.nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this.cache_shiftDelta = this.cache_nRowsToShift - this.nRowsToRender;

                this.yUpperBound -= this.cache_shiftDelta * this.cellHeight;
                this.yLowerBound -= this.cache_shiftDelta * this.cellHeight;

                this.rowStartIndex += this.cache_shiftDelta;
                this.rowEndIndex += this.cache_shiftDelta;

                this.cache_nRowsToShift = this.nRowsToRender;
            }

            if (this.cache_nRowsToShift > 0) {
                /* move the lowest Y-value rows to the bottom of the ordering array */
                this.cache_orderedYArrayTargetIndex = 0;

                for (this.cache_iterator = 0; this.cache_iterator < this.cache_nRowsToShift; this.cache_iterator++) {
                    this.cache_targetIndex = this.rowEndIndex + this.cache_iterator;

                    this.cache_rowPointer = this.state.rows[this.state.rowsOrderedByY[this.cache_orderedYArrayTargetIndex]];
                    this.cache_rowPointer.data = this.props.getRow(this.cache_targetIndex);
                    this.cache_rowPointer.setIndex = this.cache_targetIndex;
                    this.cache_rowPointer.y = this.cache_targetIndex * this.cellHeight;

                    this.state.rowsOrderedByY.push(this.state.rowsOrderedByY.shift());
                }

                this.rowStartIndex += this.cache_nRowsToShift;
                this.rowEndIndex += this.cache_nRowsToShift;

                this.yUpperBound -= this.cache_nRowsToShift * this.cellHeight;
                this.yLowerBound -= this.cache_nRowsToShift * this.cellHeight;

                this.setState({rows: this.state.rows});
            }
        }
    }

    handleScrollUp() {
        if (this.rowStartIndex === 0 || this.yNext <= this.yUpperBound) {
            return;
        }

        /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this.cache_nRowsToShift = Math.ceil(
            Math.abs(this.yNext - this.yUpperBound) / this.cellHeight
        );

        if (this.rowStartIndex - this.cache_nRowsToShift < 0) {
            this.cache_nRowsToShift = this.rowStartIndex;
        }

        if (this.cache_nRowsToShift > 0) {
            if (this.cache_nRowsToShift > this.nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this.cache_shiftDelta = this.cache_nRowsToShift - this.nRowsToRender;

                this.yUpperBound += this.cache_shiftDelta * this.cellHeight;
                this.yLowerBound += this.cache_shiftDelta * this.cellHeight;

                this.rowStartIndex -= this.cache_shiftDelta;
                this.rowEndIndex -= this.cache_shiftDelta;

                this.cache_nRowsToShift = this.nRowsToRender;
            }

            if (this.cache_nRowsToShift > 0) {
                /* move the highest Y-value rows to the top of the ordering array */
                this.cache_orderedYArrayTargetIndex = this.state.rowsOrderedByY.length - 1;

                for (this.cache_iterator = 0; this.cache_iterator < this.cache_nRowsToShift; this.cache_iterator++) {
                    this.cache_targetIndex = this.rowStartIndex - this.cache_iterator - 1;

                    this.cache_rowPointer = this.state.rows[this.state.rowsOrderedByY[this.cache_orderedYArrayTargetIndex]];
                    this.cache_rowPointer.data = this.props.getRow(this.cache_targetIndex);
                    this.cache_rowPointer.setIndex = this.cache_targetIndex;
                    this.cache_rowPointer.y = this.cache_targetIndex * this.cellHeight;

                    this.state.rowsOrderedByY.unshift(this.state.rowsOrderedByY.pop());
                }

                this.rowStartIndex -= this.cache_nRowsToShift;
                this.rowEndIndex -= this.cache_nRowsToShift;

                this.yUpperBound += this.cache_nRowsToShift * this.cellHeight;
                this.yLowerBound += this.cache_nRowsToShift * this.cellHeight;

                this.setState({rows: this.state.rows});
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

        this.xScrollNubPosition = (Math.abs(this.xNext) / (this.rowWidth - this.containerWidth)) * this.xScrollerWidth;

        if (this.xScrollNubPosition + this.state.xScrollerNubSize > this.xScrollerWidth) {
            this.xScrollNubPosition = this.xScrollerWidth - this.state.xScrollerNubSize;
        }

        this.yScrollNubPosition = (this.rowStartIndex / this.props.totalRows) * this.containerHeight;

        if (this.yScrollNubPosition + this.state.yScrollerNubSize > this.containerHeight) {
            this.yScrollNubPosition = this.containerHeight - this.state.yScrollerNubSize;
        }

        /* Do all transforms grouped together */

        // Header
        if (this.xNext !== this.xCurrent) {
            this.refs.head.style[transformProp] = 'translate3d(' + this.xNext + 'px, 0px, 0px)';
        }

        // Wrapper
        this.refs.body.style[transformProp] = 'translate3d(' + this.xNext + 'px, ' + this.yNext + 'px, 0px)';

        // X-Nub
        if (this.xScrollNubPosition !== this.lastXScrollNubPosition) {
            this.refs.xScrollerNub.style[transformProp] = 'translate3d(' + this.xScrollNubPosition + 'px, 0px, 0px)';
            this.lastXScrollNubPosition = this.xScrollNubPosition;
        }

        // Y-nub
        if (this.yScrollNubPosition !== this.lastYScrollNubPosition) {
            this.refs.yScrollerNub.style[transformProp] = 'translate3d(0px, ' + this.yScrollNubPosition + 'px, 0px)';
            this.lastYScrollNubPosition = this.yScrollNubPosition;
        }

        this.xCurrent = this.xNext;
        this.yCurrent = this.yNext;
    }

    handleColumnResize(delta) {
        if (delta === 0) {
            return;
        }

        let adjustedDelta = delta;
        let newTableWidth = 0;

        let copy = this.state.columns.map(definition => {
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

            return {
                ...definition,
                width: definition.width + adjustedDelta,
            };
        });

        if (newTableWidth <= this.containerWidth) {
            this.xMaximumTranslation = 0;
        } else {
            this.xMaximumTranslation -= adjustedDelta;
        }

        this.setState({
            columns: copy,
            xScrollerNubSize: this.calculateXScrollerNubSize(),
        }, () => {
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
            this.lastColumnX = event.clientX;

            this.manuallyResizingColumn = this.state.columns[event.target.getAttribute('data-column-index')];

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.nativeEvent.preventDefault();
        }
    }

    handleXScrollerDragStart(event) {
        if (event.button === 0) {
            this.lastXScroll = event.clientX;
            this.manuallyScrollingX = true;

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.nativeEvent.preventDefault();
        }
    }

    handleYScrollerDragStart(event) {
        if (event.button === 0) {
            this.lastYScroll = event.clientY;
            this.manuallyScrollingY = true;

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.nativeEvent.preventDefault();
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
                    preventDefault: noop,
                });

                this.lastXScroll = event.clientX;
            }

            if (this.manuallyScrollingY) {
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: ((event.clientY - this.lastYScroll) / this.containerHeight)
                            * this.props.totalRows
                            * this.cellHeight,
                    preventDefault: noop,
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
        this.cache_nextActiveRow = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex + delta);

        if (this.cache_nextActiveRow) {
            this.setState({
                ariaSpokenOutput: this.cache_nextActiveRow.data[this.state.columns[0].mapping],
                currentActiveRowIndex: this.cache_nextActiveRow.setIndex,
            });

            if (
                   (delta === -1 && this.cache_nextActiveRow.y * -1 > this.yCurrent)
                || (delta === 1 && this.cache_nextActiveRow.y * -1 - this.cellHeight < this.yCurrent - this.containerHeight + this.cellHeight) // 1 unit of cellHeight is removed to compensate for the header row
            ) { // Destination row is outside the viewport, so simulate a scroll
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: this.cellHeight * delta,
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
                deltaY: (   (    this.rowStartIndex > this.state.currentActiveRowIndex
                              && this.state.currentActiveRowIndex - this.rowStartIndex)
                         || (    this.rowStartIndex < this.state.currentActiveRowIndex
                              && this.state.currentActiveRowIndex - this.rowStartIndex)
                         + delta) * this.cellHeight,
                preventDefault: noop,
            });

            // start the process again, now that the row is available
            window.requestAnimationFrame(() => this.changeActiveRow(delta));
        }

        this.cache_nextActiveRow = null;
    }

    ariaExposeFullRowData() {
        this.cache_ariaExposeFullRowData = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex);

        if (this.cache_ariaExposeFullRowData) {
            this.setState({
                ariaSpokenOutput: this.state.columns.map(column => {
                    return `${column.title}: ${this.cache_ariaExposeFullRowData.data[column.mapping]}`;
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
                 onMouseUp={this.handleDragEnd}
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
