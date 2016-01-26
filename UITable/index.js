/**
 * A high-performance, infinite table view.
 * @class UITable
 */

import React from 'react';
import UIView from '../UIView';
import transformProp from '../UIUtils/transform';
import noop from '../UIUtils/noop';
import findWhere from '../UIUtils/findWhere';

/**
 * FOR FUTURE EYES
 *
 * Scroll performance is a tricky beast -- moreso when trying to maintain 50+ FPS and pumping a lot of data
 * to the DOM. There are a lot of choices in this component that may seem odd at first blush, but let it
 * be known that we tried to do it the React Way™ and it was not performant enough.
 *
 * The combination that was settled upon is a React shell with native DOM guts. This combination yields the
 * best performance, while still being perfectly interoperable with the rest of UIKit and React use cases.
 *
 * At some point, the internals will probably be fully-separated into its own module such that it can
 * be embedded in other places without React.
 *
 * __Important Note__
 *
 * Any time you create a document fragment, make sure you release it after by setting its variable to `null`.
 * If you don't, it'll create a memory leak. Also, make sure all generated DOM is removed on componentWillUnmount.
 */

/**
 * ORDER OF OPERATIONS
 *
 * 1. render one row of cells
 * 2. capture table & cell sizing metrics
 * 3. render column heads and the rest of the cells
 *
 * If the component updates due to new props, just blow away everything and start over. It's cheaper than
 * trying to diff.
 */

const cellClassRegex = /\s?ui-table-cell\b/g;
const rowClassRegex = /\s?ui-table-row\b/g;
const activeClassRegex = /\s?ui-table-row-active/g;
const loadingClassRegex = /\s?ui-table-row-loading/g;
const evenClassRegex = /\s?ui-table-row-even/g;
const oddClassRegex = /\s?ui-table-row-odd/g;

const translate3d = function translate3D(x = 0, y = 0) {
    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
}; // z is never used

const reparentCellText = function reparentCellText(node, content) {
    if (node.childNodes.length && node.childNodes[0].nodeType === 3) {
        node.removeChild(node.childNodes[0]);
    }

    const text = document.createElement('div');
          text.className = 'ui-table-cell-inner';

    const textNode = document.createTextNode(content);
          text.appendChild(textNode);

    node.appendChild(text);

    return textNode;
};

const createDOMCell = function createDOMCell(content, mapping, width) {
    const cell = document.createElement('div');
          cell.className = 'ui-table-cell';
          cell.setAttribute('title', content);
          cell.setAttribute('data-column', mapping);
          cell.appendChild(document.createTextNode(content));

    if (width) {
        cell.style.width = width + 'px';
        reparentCellText(cell, content);
    }

    return cell;
};

const createDOMHeaderCell = function createDOMHeaderCell(column, width) {
    const cell = createDOMCell(column.title, column.mapping, width);
          cell.className += ' ui-table-header-cell';

    if (column.resizable) {
        const handle = document.createElement('div');
              handle.className = 'ui-table-header-cell-resize-handle';

        cell.appendChild(handle);
    }

    return cell;
};

const createHeaderCell = function createHeaderCell(metadata, width) {
    const node = createDOMHeaderCell(metadata, metadata.width || width);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_metadata': metadata,
        '_title': metadata.title,
        get title() { return this._title; },
        set title(val) {
            if (val !== this._title) {
                this._title = val;

                this.node.setAttribute('title', this._title);
                this._textNode.nodeValue = this._title;
            }
        },
        '_width': metadata.width || width,
        get width() { return this._width; },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';

                if (this.node.childNodes[0].nodeType === 3) {
                    this._textNode = reparentCellText(this.node, this._title);
                }
            }
        },
        mapping: metadata.mapping,
        node: node,
    };
};

const createCell = function createCell(content, mapping, width) {
    const node = createDOMCell(content, mapping, width);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_content': content,
        get content() { return this._content; },
        set content(val) {
            if (val !== this._content) {
                this._content = val;

                this.node.setAttribute('title', this._content);
                this._textNode.nodeValue = this._content;
            }
        },
        '_width': width,
        get width() { return this._width; },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';

                if (this.node.childNodes[0].nodeType === 3) {
                    this._textNode = reparentCellText(this.node, this._content);
                }
            }
        },
        node: node,
    };
};

const createDOMRow = function createDOMRow(setIndex, y) {
    const row = document.createElement('div');
          row.className = 'ui-table-row';
          row.style[transformProp] = translate3d(0, y);

    return row;
};

const createRow = function createRow(metadata, columns) {
    /* IMPORTANT NOTE: metadata.data might be a promise. Plan accordingly. */

    const row = createDOMRow(metadata.setIndex, metadata.y);
    const cells = [];

    let fragment = document.createDocumentFragment();

    columns.forEach((column, index) => {
        cells.push(createCell('', column.mapping, column.width));
        fragment.appendChild(cells[index].node);
    });

    row.appendChild(fragment);
    fragment = null;

    const rowObj = {
        node: row,
        cells: cells,
        '_iterator': null,
        '_active': false,
        get active() { return this._active; },
        set active(val) {
            if (val !== this._active) {
                this._active = val;

                if (val) {
                    this.node.className += ' ui-table-row-active';
                } else {
                    this.node.className = this.node.className.replace(activeClassRegex, '');
                }
            }
        },
        '_setIndex': null,
        get setIndex() { return this._setIndex; },
        set setIndex(val) {
            if (val !== this._setIndex) {
                this._setIndex = val;

                if (this._setIndex % 2 === 0) {
                    this.node.className = this.node.className.replace(oddClassRegex, '');
                    this.node.className += ' ui-table-row-even';
                } else {
                    this.node.className = this.node.className.replace(evenClassRegex, '');
                    this.node.className += ' ui-table-row-odd';
                }
            }
        },
        '_data': null,
        '_waitingForResolution': false,
        set _waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                if (val) {
                    this.node.className += ' ui-table-row-loading';
                } else {
                    this.node.className = this.node.className.replace(loadingClassRegex, '');
                }
            }
        },
        get data() { return this._data; },
        set data(val) {
            if (val !== this._data) {
                this._data = val;

                if (this._data instanceof Promise) {
                    this._data.then(function cautiouslySetRowData(promise, resolvedVal) {
                        if (this._data === promise) {
                            this.data = resolvedVal;
                        }
                    }.bind(this, this._data));

                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    this._waitingForResolution = true;
                } else if (this._data) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                    }

                    this._waitingForResolution = false;
                } else {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    this._waitingForResolution = false;
                }
            }
        },
        '_y': metadata.y,
        get y() { return this._y; },
        set y(val) {
            if (val !== this._y) {
                this._y = val;
                this.node.style[transformProp] = translate3d(0, this._y);
            }
        },
    };

    // Setting it separately to have the classes added automatically
    rowObj.setIndex = metadata.setIndex;

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
};

class UITable extends UIView {
    constructor(...args) {
        super(...args);

        this._columns = [];
        this._rows = [];
        this._rowsOrderedByY = [];

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleMoveIntent = this.handleMoveIntent.bind(this);

        this.handleXScrollHandleDragStart = this.handleXScrollHandleDragStart.bind(this);
        this.handleYScrollHandleDragStart = this.handleYScrollHandleDragStart.bind(this);
        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleColumnDragStart = this.handleColumnDragStart.bind(this);

        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        this._body = this.refs.body;
        this._body_s = this._body.style;
        this._header = this.refs.header;
        this._header_s = this._header.style;
        this._xScrollHandle_s = this.refs['x-scroll-handle'].style;
        this._yScrollHandle_s = this.refs['y-scroll-handle'].style;

        this.regenerate();

        this.refs.wrapper.addEventListener('wheel', this.handleMoveIntent);
        this.refs.wrapper.addEventListener('mousemove', this.handleDragMove);
        this.refs.wrapper.addEventListener('touchstart', this.handleTouchStart);
        this.refs.wrapper.addEventListener('touchmove', this.handleTouchMove);

        this.refs.wrapper.addEventListener('keydown', this.handleKeyDown);

        this._header.addEventListener('mousedown', this.handleColumnDragStart);
        this._body.addEventListener('click', this.handleClick);

        this.refs['x-scroll-handle'].addEventListener('mousedown', this.handleXScrollHandleDragStart);
        this.refs['y-scroll-handle'].addEventListener('mousedown', this.handleYScrollHandleDragStart);

        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        this.refs.wrapper.removeEventListener('wheel', this.handleMoveIntent);
        this.refs.wrapper.removeEventListener('mousemove', this.handleDragMove);
        this.refs.wrapper.removeEventListener('touchstart', this.handleTouchStart);
        this.refs.wrapper.removeEventListener('touchmove', this.handleTouchMove);

        this.refs.wrapper.removeEventListener('keydown', this.handleKeyDown);

        this._header.removeEventListener('mousedown', this.handleColumnDragStart);
        this._body.removeEventListener('click', this.handleClick);

        this.refs['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
        this.refs['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

        window.removeEventListener('resize', this.handleWindowResize);

        this.emptyHeader();
        this.emptyBody();
    }

    componentDidUpdate() {
        this.regenerate();
    }

    resetInternals() {
        this._x = this._y = 0;
        this._nextX = this._nextY = 0;
        this._xScrollHandlePosition = this._yScrollHandlePosition = 0;

        this._activeRow = -1;
        this._nextActiveRow = null;

        // temporary variables in various calculations
        this._iterator = null;
        this._nRowsToShift = null;
        this._orderedYArrayTargetIndex = null;
        this._rowPointer = null;
        this._shiftDelta = null;
        this._targetIndex = null;

        this._dragEvent = {preventDefault: noop};

        this._touchEvent = {preventDefault: noop};
        this._touch = null;
        this._lastTouchPageX = this._lastTouchPageY = 0;

        this._xScrollHandleSize = this._yScrollHandleSize = null;

        // reset!
        this.performTranslations();
    }

    emptyHeader() {
        this._columns.length = 0;

        while (this._header.firstChild) {
            this._header.removeChild(this._header.firstChild);
        }
    }

    buildColumns() {
        this.emptyHeader();

        this.props.columns.forEach(column => this._columns.push(createHeaderCell(column)));
    }

    computeMinMaxHeaderCellDimensions() {
        let cs;

        this._columns.forEach(column => {
            cs = window.getComputedStyle(column.node);

            column.minWidth = parseInt(cs['min-width'], 10);
            column.maxWidth = parseInt(cs['max-width'], 10);
        });
    }

    injectHeaderCells() {
        this._fragment = document.createDocumentFragment();
        this._columns.forEach(column => this._fragment.appendChild(column.node));

        this._header.appendChild(this._fragment);

        // must be done after they have been injected into the DOM
        this.computeMinMaxHeaderCellDimensions();

        this._fragment = null; // prevent memleak
    }

    emptyBody() {
        this._rows.length = 0;
        this._rowsOrderedByY.length = 0;

        while (this._body.firstChild) {
            this._body.removeChild(this._body.firstChild);
        }
    }

    injectFirstRow() {
        this.emptyBody();

        this._rows.push(createRow({
            data: this.props.getRow(0),
            setIndex: 0,
            y: 0,
        }, this._columns));

        this._rowsOrderedByY.push(0);

        this._body.appendChild(this._rows[0].node);
    }

    injectRestOfRows() {
        this._fragment = document.createDocumentFragment();

        for (this._iterator = 1; this._iterator < this._nRowsToRender; this._iterator += 1) {
            this._rows.push(createRow({
                data: this.props.getRow(this._iterator),
                setIndex: this._iterator,
                y: this._cell_h * this._iterator,
            }, this._columns));

            this._rowsOrderedByY.push(this._iterator);

            this._fragment.appendChild(this._rows[this._iterator].node);
        }

        this._body.appendChild(this._fragment);
        this._fragment = null; // prevent memleak
    }

    calculateCellHeight() {
        this._cell_h = this._rows[0].cells[0].node.clientHeight || 40;
    }

    calculateCellWidths() {
        this._rows[0].cells.forEach((cell, index) => {
            this._columns[index].width = this._columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = this._columns[index].width;
        });
    }

    calculateXBound() {
        this._row_w = this._rows[0].node.clientWidth || 500;
        this._xMaximum =   this._container_w <= this._row_w
                         ? this._container_w - this._row_w
                         : 0;
    }

    calculateYBound() {
        this._yUpperBound = 0;
        this._yLowerBound = this._container_h - (this._nRowsToRender * this._cell_h);
    } // do not run this unless rebuilding the table, does not preserve current min/max thresholds

    calculateXScrollHandleSize() {
        this._xScrollHandleSize = this._container_w - Math.abs(this._xMaximum);

        if (this._xScrollHandleSize < 12) {
            this._xScrollHandleSize = 12;
        }

        return this._xScrollHandleSize;
    }

    calculateYScrollHandleSize() {
        this._yScrollHandleSize = this._container_h * (this._nRowsToRender / this.props.totalRows);

        if (this._yScrollHandleSize < 12) {
            this._yScrollHandleSize = 12;
        }

        return this._yScrollHandleSize;
    }

    initializeScrollBars() {
        this._xScrollTrack_w = this.refs['x-scroll-track'].clientWidth || 500;
        this._yScrollTrack_h = this.refs['y-scroll-track'].clientHeight || 150;
        this._xScrollHandle_s.width = this.calculateXScrollHandleSize() + 'px';
        this._yScrollHandle_s.height = this.calculateYScrollHandleSize() + 'px';
    }

    calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this._container_h = this.refs.wrapper.clientHeight || 150;
        this._container_w = this.refs.wrapper.clientWidth || 500;
    }

    handleWindowResize() {
        if (this.refs.wrapper.clientHeight !== this._container_h) {
            /* more rows may be needed to display the data, so we need to rebuild */
            return this.regenerate();
        }

        this.calculateContainerDimensions();
        this.calculateXBound();
        this.initializeScrollBars();
    }

    regenerate() {
        this.resetInternals();
        this.calculateContainerDimensions();

        this.buildColumns();
        this.injectFirstRow();
        this.calculateCellWidths();
        this.calculateCellHeight();

        this._nRowsToRender = Math.ceil((this._container_h * 1.3) / this._cell_h);

        if (this._nRowsToRender > this.props.totalRows) {
            this._nRowsToRender = this.props.totalRows;
        }

        this._rowStartIndex = 0;
        this._rowEndIndex = this._nRowsToRender;

        this.injectHeaderCells();
        this.injectRestOfRows();

        this.calculateXBound();
        this.calculateYBound();

        this.initializeScrollBars();
    }

    handleScrollDown() {
        if (   this._rowEndIndex === this.props.totalRows
            || this._nextY >= this._yLowerBound) {
            return;
        }

        /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this._nRowsToShift = Math.ceil(
            Math.abs(this._nextY - this._yLowerBound) / this._cell_h
        );

        if (this._nRowsToShift + this._rowEndIndex + 1 > this.props.totalRows) {
            /* more rows than there is data available, truncate */
            this._nRowsToShift = this.props.totalRows - this._rowEndIndex + 1;
        }

        if (this._nRowsToShift > 0) {
            if (this._nRowsToShift > this._nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this._shiftDelta = this._nRowsToShift - this._nRowsToRender;

                this._yUpperBound -= this._shiftDelta * this._cell_h;
                this._yLowerBound -= this._shiftDelta * this._cell_h;

                this._rowStartIndex += this._shiftDelta;
                this._rowEndIndex += this._shiftDelta;

                this._nRowsToShift = this._nRowsToRender;
            }

            if (this._nRowsToShift > 0) {
                for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator += 1) {
                    this._targetIndex = this._rowEndIndex + this._iterator;

                    /* move the lowest Y-value rows to the bottom of the ordering array */
                    this._rowPointer = this._rows[this._rowsOrderedByY[0]];

                    this._rowPointer.data = this.props.getRow(this._targetIndex);
                    this._rowPointer.setIndex = this._targetIndex;
                    this._rowPointer.y = this._targetIndex * this._cell_h;
                    this._rowPointer.active = this._targetIndex === this._activeRow;

                    this._rowsOrderedByY.push(this._rowsOrderedByY.shift());
                }

                this._rowStartIndex += this._nRowsToShift;
                this._rowEndIndex += this._nRowsToShift;

                this._yUpperBound -= this._nRowsToShift * this._cell_h;
                this._yLowerBound -= this._nRowsToShift * this._cell_h;
            }
        }

        this._rowPointer = null;
    }

    handleScrollUp() {
        if (this._rowStartIndex === 0 || this._nextY <= this._yUpperBound) {
            return;
        }

        /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this._nRowsToShift = Math.ceil(
            Math.abs(this._nextY - this._yUpperBound) / this._cell_h
        );

        if (this._rowStartIndex - this._nRowsToShift < 0) {
            this._nRowsToShift = this._rowStartIndex;
        }

        if (this._nRowsToShift > 0) {
            if (this._nRowsToShift > this._nRowsToRender) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this._shiftDelta = this._nRowsToShift - this._nRowsToRender;

                this._yUpperBound += this._shiftDelta * this._cell_h;
                this._yLowerBound += this._shiftDelta * this._cell_h;

                this._rowStartIndex -= this._shiftDelta;
                this._rowEndIndex -= this._shiftDelta;

                this._nRowsToShift = this._nRowsToRender;
            }

            if (this._nRowsToShift > 0) {
                /* move the highest Y-value rows to the top of the ordering array */
                this._orderedYArrayTargetIndex = this._rowsOrderedByY.length - 1;

                for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator += 1) {
                    this._targetIndex = this._rowStartIndex - this._iterator - 1;

                    this._rowPointer = this._rows[
                        this._rowsOrderedByY[this._orderedYArrayTargetIndex]
                    ];

                    this._rowPointer.data = this.props.getRow(this._targetIndex);
                    this._rowPointer.setIndex = this._targetIndex;
                    this._rowPointer.y = this._targetIndex * this._cell_h;
                    this._rowPointer.active = this._targetIndex === this._activeRow;

                    this._rowsOrderedByY.unshift(this._rowsOrderedByY.pop());
                }

                this._rowStartIndex -= this._nRowsToShift;
                this._rowEndIndex -= this._nRowsToShift;

                this._yUpperBound += this._nRowsToShift * this._cell_h;
                this._yLowerBound += this._nRowsToShift * this._cell_h;
            }
        }

        this._rowPointer = null;
    }

    handleTouchStart(event) {
        this._touch = event.touches.item(0);
        this._lastTouchPageX = this._touch.pageX;
        this._lastTouchPageY = this._touch.pageY;
    }

    handleTouchMove(event) {
        event.preventDefault();

        /* we handle touchmove by detecting the delta of pageX/Y and forwarding
        it to handleMoveIntent() */

        this._touch = event.touches.item(0);

        this._touchEvent.deltaX = this._lastTouchPageX - this._touch.pageX;
        this._touchEvent.deltaY = this._lastTouchPageY - this._touch.pageY;

        this._lastTouchPageX = this._touch.pageX;
        this._lastTouchPageY = this._touch.pageY;

        this.handleMoveIntent(this._touchEvent);
    }

    handleMoveIntent(event) {
        event.preventDefault();

        if ((event.deltaX === 0 && event.deltaY === 0)
            || this._manuallyScrollingY && event.deltaY === 0
            || this._manuallyScrollingX && event.deltaX === 0) {
            return;
        }

        // minimum translation should be one row height
        this._deltaX = event.deltaX;

        // deltaMode 0 === pixels, 1 === lines
        this._deltaY = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * this._cell_h : event.deltaY;

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this._nextX = this._manuallyScrollingY ? 0 : this._x - this._deltaX;

        if (this._nextX > 0) {
            this._nextX = 0;
        } else if (this._nextX < this._xMaximum) {
            this._nextX = this._xMaximum;
        }

        this._nextY = this._manuallyScrollingX ? 0 : this._y - this._deltaY;

        window.requestAnimationFrame(() => {
            if (this._nextY < this._y) {
                this.handleScrollDown();
            } else if (this._nextY > this._y) {
                this.handleScrollUp();
            }

            if (this._nextY > 0) {
                this._nextY = 0;
            } else if (this._nextY < this._yLowerBound) {
                this._nextY = this._yLowerBound;
            }

            if (this._nextX === 0) {
                this._xScrollHandlePosition = 0;
            } else {
                this._xScrollHandlePosition =   (Math.abs(this._nextX) / (this._row_w - this._container_w))
                                              * (this._xScrollTrack_w - this._xScrollHandleSize);

                if (this._xScrollHandlePosition + this._xScrollHandleSize > this._xScrollTrack_w) {
                    this._xScrollHandlePosition = this._xScrollTrack_w - this._xScrollHandleSize;
                }
            }

            if (this.nextY === 0) {
                this._yScrollHandlePosition = 0;
            } else {
                this._yScrollHandlePosition =   (Math.abs(this._nextY) / ((this.props.totalRows * this._cell_h) - this._container_h))
                                              * (this._yScrollTrack_h - this._yScrollHandleSize);

                if (this._yScrollHandlePosition + this._yScrollHandleSize > this._yScrollTrack_h) {
                    this._yScrollHandlePosition = this._yScrollTrack_h - this._yScrollHandleSize;
                }
            }

            this.performTranslations(); // Do all transforms grouped together

            this._x = this._nextX;
            this._y = this._nextY;
        });
    }

    performTranslations() {
        this._header_s[transformProp] = translate3d(this._nextX);
        this._body_s[transformProp] = translate3d(this._nextX, this._nextY);
        this._xScrollHandle_s[transformProp] = translate3d(this._xScrollHandlePosition);
        this._yScrollHandle_s[transformProp] = translate3d(0, this._yScrollHandlePosition);
    }

    handleXScrollHandleDragStart(event) {
        if (event.button === 0) {
            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this._lastXScroll = event.clientX;
            this._manuallyScrollingX = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }

    handleYScrollHandleDragStart(event) {
        if (event.button === 0) {
            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this._lastYScroll = event.clientY;
            this._manuallyScrollingY = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }

    handleDragMove(event) {
        if (event.button === 0) {
            if (this._manuallyResizingColumn) {
                this.handleColumnResize(event.clientX - this._lastColumnX);

                this._lastColumnX = event.clientX;
            }

            if (this._manuallyScrollingX) {
                this._dragEvent.deltaX = event.clientX - this._lastXScroll;
                this._dragEvent.deltaY = 0;

                this.handleMoveIntent(this._dragEvent);

                this._lastXScroll = event.clientX;
            }

            if (this._manuallyScrollingY) {
                this._dragEvent.deltaX = 0;
                this._dragEvent.deltaY = ((event.clientY - this._lastYScroll) / this._container_h)
                                         * this.props.totalRows
                                         * this._cell_h;

                this.handleMoveIntent(this._dragEvent);

                this._lastYScroll = event.clientY;
            }
        }
    }

    handleDragEnd() {
        // If the mouseup happens outside the table, it won't be detected without this listener
        window.removeEventListener('mouseup', this.handleDragEnd, true);

        this._manuallyScrollingX = this._manuallyScrollingY = this._manuallyResizingColumn = false;
    }

    handleColumnDragStart(event) {
        if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this._lastColumnX = event.clientX;

            this._manuallyResizingColumn = findWhere(this._columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }

    handleColumnResize(delta) {
        if (delta === 0) {
            return;
        }

        const index = this._columns.indexOf(this._manuallyResizingColumn);
        let adjustedDelta = delta;

        if (   adjustedDelta < 0
            && !isNaN(this._manuallyResizingColumn.minWidth)
            && this._manuallyResizingColumn.width + adjustedDelta < this._manuallyResizingColumn.minWidth) {
                adjustedDelta = this._manuallyResizingColumn.minWidth - this._manuallyResizingColumn.width;
        } else if (!isNaN(this._manuallyResizingColumn.maxWidth)
                   && this._manuallyResizingColumn.width + adjustedDelta > this._manuallyResizingColumn.maxWidth) {
            adjustedDelta = this._manuallyResizingColumn.maxWidth - this._manuallyResizingColumn.width;
        }

        // Adjust the column header cell
        this._manuallyResizingColumn.width = this._manuallyResizingColumn.width + adjustedDelta;

        // Adjust the corresponding row cells
        this._rows.forEach(row => row.cells[index].width = this._manuallyResizingColumn.width);

        this.calculateXBound();
        this.initializeScrollBars();

        /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
        if (adjustedDelta < 0) {
            this._dragEvent.deltaX = adjustedDelta;
            this._dragEvent.deltaY = 0;

            this.handleMoveIntent(this._dragEvent);
        }
    }

    getKeyFromKeyCode(code) {
        switch (code) {
        case 40:
            return 'ArrowDown';

        case 38:
            return 'ArrowUp';

        case 13:
            return 'Enter';
        }

        return null;
    }

    setAriaText(text) {
        this.refs.aria.innerText = text;
    }

    setActiveRow(setIndex) {
        this._activeRow = setIndex;
        this._rows.forEach(row => row.active = row.setIndex === setIndex);
    }

    changeActiveRow(delta) {
        this._nextActiveRow = findWhere(this._rows, 'setIndex', this._activeRow + delta);

        if (this._nextActiveRow) {
            this.setActiveRow(this._nextActiveRow.setIndex);
            this.setAriaText(this._nextActiveRow.data[this._columns[0].mapping]);

            if (
                   (delta === -1 && this._nextActiveRow.y * -1 > this._y)
                || (delta === 1 && this._nextActiveRow.y * -1 - this._cell_h < this._y - this._container_h + this._cell_h) // 1 unit of cellHeight is removed to compensate for the header row
            ) { // Destination row is outside the viewport, so simulate a scroll
                this._dragEvent.deltaX = 0;
                this._dragEvent.deltaY = this._cell_h * delta;

                this.handleMoveIntent(this._dragEvent);
            }
        } else if (   (delta === -1 && this._activeRow > 0)
                   || (delta === 1 && this._activeRow < this.props.totalRows)) {
            /*
                The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                in the viewport.
             */
            this._dragEvent.deltaX = 0;
            this._dragEvent.deltaY = (   (    this._rowStartIndex > this._activeRow
                                          && this._activeRow - this._rowStartIndex)
                                     || (    this._rowStartIndex < this._activeRow
                                          && this._activeRow - this._rowStartIndex)
                                     + delta) * this._cell_h;

            this.handleMoveIntent(this._dragEvent);

            // start the process again, now that the row is available
            window.requestAnimationFrame(() => this.changeActiveRow(delta));
        }

        this._nextActiveRow = null;
    }

    handleKeyDown(event) {
        let key = event.key || this.getKeyFromKeyCode(event.keyCode);

        switch (key) {
        case 'ArrowDown':
            this.changeActiveRow(1);
            event.preventDefault();
            break;
        case 'ArrowUp':
            this.changeActiveRow(-1);
            event.preventDefault();
            break;
        case 'Enter':
            if (this._activeRow !== -1) {
                let row = findWhere(this._rows, 'setIndex', this._activeRow).data;

                this.setAriaText(this._columns.map(column => {
                    return `${column.title}: ${row[column.mapping]}`;
                }).join('\n'));
            }
            event.preventDefault();
            break;
        }

        if (typeof this.props.onKeyDown === 'function') {
            this.props.onKeyDown(event);
        }
    }

    discoverCellAndRowNodes(target) {
        let node = target;
        let nodeMap = {};

        if (node.className.match(rowClassRegex)) {
            return {row: node};
        }

        while ((!nodeMap.cell || !nodeMap.row) && node) {
            if (node.className.match(cellClassRegex)) {
                nodeMap.cell = node;
            } else if (node.className.match(rowClassRegex)) {
                nodeMap.row = node;
            }

            node = node.parentNode;
        }

        return nodeMap;
    }

    handleClick(event) {
        let map = this.discoverCellAndRowNodes(event.target);

        if (map.row) {
            let row = findWhere(this._rows, 'node', map.row);

            this.setActiveRow(row.setIndex);

            if (map.cell) {
                this.props.onCellInteract(event, row.setIndex, map.cell.getAttribute('data-column'));
            }

            this.props.onRowInteract(event, row.setIndex);
        }
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
                <div>
                    <div ref='x-scroll-track' className='ui-table-x-scroll-track'>
                        <div ref='x-scroll-handle' className='ui-table-x-scroll-handle' />
                    </div>
                    <div ref='y-scroll-track' className='ui-table-y-scroll-track'>
                        <div ref='y-scroll-handle' className='ui-table-y-scroll-handle' />
                    </div>
                </div>
                <div ref='aria' className={this.props.offscreenClass || 'ui-offscreen'} aria-live='polite' />
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
    identifier: React.PropTypes.string,
    offscreenClass: React.PropTypes.string,
    onCellInteract: React.PropTypes.func,
    onRowInteract: React.PropTypes.func,
    totalRows: React.PropTypes.number,
};

UITable.defaultProps = {
    className: '',
    columns: [],
    getRow: noop,
    offscreenClass: 'ui-offscreen',
    onCellInteract: noop,
    onRowInteract: noop,
    totalRows: 0,
};

export default UITable;
