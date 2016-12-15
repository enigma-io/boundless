/**
 * A high-performance, infinite table view.
 */

import fw from './utils/findWhere';
import tp from './utils/transformProperty';

export const BODY = 'ui-table-body';
export const CELL = 'ui-table-cell';
export const CELL_EVEN = 'ui-table-cell-even';
export const CELL_ODD = 'ui-table-cell-odd';
export const CELL_INNER = 'ui-table-cell-inner';
export const HEADER = 'ui-table-header';
export const HEADER_CELL = 'ui-table-header-cell';
export const HEADER_CELL_HANDLE = 'ui-table-header-cell-resize-handle';
export const ROW = 'ui-table-row';
export const ROW_EVEN = 'ui-table-row-even';
export const ROW_ODD = 'ui-table-row-odd';
export const ROW_ACTIVE = 'ui-table-row-active';
export const ROW_LOADING = 'ui-table-row-loading';
export const OFFSCREEN = 'ui-offscreen';
export const WRAPPER = 'ui-table-wrapper';
export const X_SCROLL_TRACK = 'ui-table-x-scroll-track';
export const X_SCROLL_TRACK_HANDLE = 'ui-table-x-scroll-handle';
export const Y_SCROLL_TRACK = 'ui-table-y-scroll-track';
export const Y_SCROLL_TRACK_HANDLE = 'ui-table-y-scroll-handle';

const isObject = (test) => Object.prototype.toString.call(test) === '[object Object]';
const noop = function noop() {};

/*

FOR FUTURE EYES

Scroll performance is a tricky beast -- moreso when trying to maintain 50+ FPS and pumping a lot of data to the DOM. There are a lot of choices in this component that may seem odd at first blush, but let it be known that we tried to do it the React Way™ and it was not performant enough.

The combination that was settled upon is a React shell with native DOM guts. This combination yields the best performance, while still being perfectly interoperable with the rest of UIKit and React use cases.

__Important Note__

Any time you create a document fragment, make sure you release it after by setting its variable to `null`. If you don't, it'll create a memory leak. Also, make sure all generated DOM is removed on componentWillUnmount.


ORDER OF OPERATIONS

1. render one row of cells
2. capture table & cell sizing metrics
3. render column heads and the rest of the cells

If the component updates due to new props, just blow away everything and start over. It's cheaper than trying to diff.

*/

function applyDelta(delta, num) {
    if (delta < 0) {
        return num < 0 ? num - delta : num + delta;
    }

    return num - delta;
}

function getKeyFromKeyCode(code) {
    switch (code) {
    case 192:
        return 'Escape';

    case 40:
        return 'ArrowDown';

    case 38:
        return 'ArrowUp';

    case 13:
        return 'Enter';
    }

    return null;
}

function translate3d(x = 0, y = 0) {
    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
} // z is never used

/**
 * Generates a DOM cell.
 *
 * @param  {string}  content
 * @param  {string}  mapping
 * @param  {number}  width
 * @param  {number}  index
 *
 * @return {HTMLElement}
 */
function createDOMCell(content, mapping, width, index) {
    const cell = document.createElement('div');

    cell.className = CELL;
    cell.classList.add(index % 2 === 0 ? CELL_EVEN : CELL_ODD);

    cell.setAttribute('data-column', mapping);

    if (width) {
        cell.style.width = width + 'px';
    }

    const text = document.createElement('div');
          text.className = CELL_INNER;

    const textNode = document.createTextNode(content);
          text.appendChild(textNode);

    cell.appendChild(text);

    return cell;
}

/**
 * Converts a simple object DOM spec into equivalent DOM node(s).
 *
 * @param  {string}       options.tag
 * @param  {object}       options.attributes   - HTML attributes that must be set via `setAttribute()`, e.g. `data-*`
 * @param  {*}            options.children     - should be a string, DOM spec, or array of DOM specs;
 *                                               all other input will be stringified
 * @param  {object}       options.properties   - properties to be explicitly set, e.g. `className`
 *
 * @return {HTMLElement}
 */
function specToDOM({tag = 'div', attributes = {}, children, ...properties}) {
    const node = document.createElement(tag);

    Object.keys(attributes).forEach((key) => node.setAttribute(key, attributes[key]));
    Object.keys(properties).forEach((key) => (node[key] = properties[key]));

    if (children) {
        if (Array.isArray(children)) {
            children.forEach((spec) => node.appendChild(specToDOM(spec)));
        } else if (isObject(children)) {
            node.appendChild(specToDOM(children));
        } else {
            node.appendChild(document.createTextNode(String(children)));
        }
    }

    return node;
}

/**
 * Generates a header cell with resize handle and optional children as defined by the object DOM DSL.
 *
 * @param  {object}  column
 * @param  {*}       column.children    - should be a string, DOM spec, or array of DOM specs;
 *                                        all other input will be stringified
 * @param  {string}  column.mapping
 * @param  {boolean} column.resizable
 * @param  {string}  column.title
 * @param  {number}  width
 * @param  {number}  index
 *
 * @return {HTMLElement}
 */
function createDOMHeaderCell(column, width, index) {
    const cell = createDOMCell(column.title, column.mapping, width, index);
          cell.classList.add(HEADER_CELL);

    if (column.children) {
        if (Array.isArray(column.children)) {
            column.children.forEach((spec) => cell.appendChild(specToDOM(spec)));
        } else if (isObject(column.children)) {
            cell.appendChild(specToDOM(column.children));
        } else {
            cell.appendChild(document.createTextNode(String(column.children)));
        }
    }

    if (column.resizable) {
        const handle = document.createElement('div');
              handle.className = HEADER_CELL_HANDLE;

        cell.appendChild(handle);
    }

    return cell;
}

function createHeaderCell(metadata, index) {
    const node = createDOMHeaderCell(metadata, metadata.width, index);

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
        '_width': metadata.width,
        get width() { return this._width; },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';
            }
        },
        cellChangeFunc: metadata.cellChangeFunc,
        mapping: metadata.mapping,
        node: node,
    };
}

function createCell(content, {cellChangeFunc, mapping, width}, index) {
    const node = createDOMCell(content, mapping, width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_cellChangeFunc': cellChangeFunc,
        '_content': content,
        get content() { return this._content; },
        getTextToBeRendered: function getTextToBeRendered() {
            return this.content !== null && this.content !== undefined ? this.content : ''; // do not render null/undefined
        },
        set content(val) {
            if (val !== this._content) {
                this._content = val;
                this._textNode.nodeValue = this.getTextToBeRendered();

                if (this._cellChangeFunc) {
                    this._cellChangeFunc(this.node, this._content, val);
                }
            }
        },
        '_width': width,
        get width() { return this._width; },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';
            }
        },
        trueWidth: function trueWidth() {
            const style = this.node.getAttribute('style');
            const childClasses = this.node.children[0].className;

            this.node.setAttribute('style', '');

            // take off the inner class which is what causes the sizing constraint
            this.node.children[0].className = '';

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns an integer value, rather than the _actual_ width. SMH. */
            const newWidth = this.node.getBoundingClientRect().width;

            // Put everything back
            this.node.setAttribute('style', style);
            this.node.children[0].className = childClasses;

            return newWidth;
        },
        node: node,
    };
}

function createDOMRow(setIndex, y) {
    const row = document.createElement('div');
          row.className = ROW;
          row.style[tp] = translate3d(0, y);

    return row;
}

function createRow(metadata, columns) {
    /* IMPORTANT NOTE: metadata.data might be a promise. Plan accordingly. */

    const row = createDOMRow(metadata.setIndex, metadata.y);
    const cells = [];

    let fragment = document.createDocumentFragment();

    columns.forEach((column, index) => {
        cells.push(createCell('', column, index));
        fragment.appendChild(cells[index].node);
    });

    row.appendChild(fragment);
    fragment = null;

    const rowObj = {
        node: row,
        cells: cells,
        '_changeFunc': metadata.rowChangeFunc,
        '_iterator': null,
        '_active': false,
        get active() { return this._active; },
        set active(val) {
            if (val !== this._active) {
                this._active = val;

                if (val && this.node.classList.contains(ROW_ACTIVE) === false) {
                    this.node.classList.add(ROW_ACTIVE);
                } else if (!val && this.node.classList.contains(ROW_ACTIVE) === true) {
                    this.node.classList.remove(ROW_ACTIVE);
                }
            }
        },
        '_setIndex': null,
        get setIndex() { return this._setIndex; },
        set setIndex(val) {
            if (val !== this._setIndex) {
                if (val % 2 === 0) {
                    this.node.classList.add(ROW_EVEN);
                    this.node.classList.remove(ROW_ODD);
                } else {
                    this.node.classList.add(ROW_ODD);
                    this.node.classList.remove(ROW_EVEN);
                }

                this.node.setAttribute('data-index', val);

                this._setIndex = val;
            }
        },
        '_waitingForResolution': false,
        get waitingForResolution() { return this._waitingForResolution; },
        set waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                this._waitingForResolution = val;

                if (val && this.node.classList.contains(ROW_LOADING) === false) {
                    this.node.classList.add(ROW_LOADING);
                } else if (!val && this.node.classList.contains(ROW_LOADING) === true) {
                    this.node.classList.remove(ROW_LOADING);
                }
            }
        },
        '_data': null,
        get data() { return this._data; },
        set data(val) {
            if (val !== this._data) {
                this._data = val;

                if (this._data === null || this._data instanceof Promise) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    if (this._data instanceof Promise) {
                        this._data.then(function cautiouslySetRowData(promise, resolvedVal) {
                            if (this._data === promise) {
                                this.data = resolvedVal;
                            }
                        }.bind(this, this._data));
                    }

                    this.waitingForResolution = true;

                    return;
                }

                if (this._data) {
                    if (Array.isArray(this._data)) {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[this._iterator];
                        }
                    } else {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                        }
                    }

                    if (this._changeFunc) {
                        this._changeFunc(this.node, this._data);
                    }

                } else {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }
                }

                this.waitingForResolution = false;

                if (this._changeFunc) {
                    this._changeFunc(this.node, this._data);
                }
            }
        },
        '_y': metadata.y,
        get y() { return this._y; },
        set y(val) {
            if (val !== this._y) {
                this._y = val;
                this.node.style[tp] = translate3d(0, this._y);
            }
        },
    };

    // Setting it separately to have the classes added automatically
    rowObj.setIndex = metadata.setIndex;
    rowObj.active = metadata.active;

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
}

function validateColumnShape(column) {
    return    typeof column.mapping === 'string'
           && typeof column.resizable === 'boolean'
           && typeof column.title === 'string'
           && (column.width === undefined || typeof column.width === 'number');
}

function validateConfiguration(c) {
    if (!(c.wrapper instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `wrapper` element.');
    }

    if (!(c.header instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `header` element.');
    }

    if (!(c.body instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `body` element.');
    }

    if (!(c['x-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-track` element.');
    }

    if (!(c['y-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-track` element.');
    }

    if (!(c['x-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-handle` element.');
    }

    if (!(c['y-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-handle` element.');
    }

    if (!(c.aria instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `aria` element.');
    }

    if (   Array.isArray(c.columns) === false
        || c.columns.length === 0
        || c.columns.every(validateColumnShape) === false) {
        throw Error(`Table was not passed valid \`columns\`. It should be an array with at least one object conforming to: {
            mapping: string,
            resizable: bool,
            title: string,
            width: number (optional),
        }`);
    }

    if (typeof c.throttleInterval !== 'number') {
        throw Error('Table was not passed a valid `throttleInterval`; it should be a Number.');
    }

    if (typeof c.totalRows !== 'number') {
        throw Error('Table was not passed a valid `totalRows`; it should be a Number.');
    }

    if (typeof c.getRow !== 'function') {
        throw Error('Table was not passed a valid `getRow`; it should be a function.');
    }

    if (c.activeRowChangedFunc !== undefined && typeof c.activeRowChangedFunc !== 'function') {
        throw Error('Table was not passed a valid `activeRowChangedFunc`; it should be a function.');
    }

    if (c.cellChangeFunc !== undefined && typeof c.cellChangeFunc !== 'function') {
        throw Error('Table was not passed a valid `cellChangeFunc`; it should be a function.');
    }

    if (c.cellClickFunc !== undefined && typeof c.cellClickFunc !== 'function') {
        throw Error('Table was not passed a valid `cellClickFunc`; it should be a function.');
    }

    if (c.columnResizeFunc !== undefined && typeof c.columnResizeFunc !== 'function') {
        throw Error('Table was not passed a valid `columnResizeFunc`; it should be a function.');
    }

    if (c.headerColumnClickFunc !== undefined && typeof c.headerColumnClickFunc !== 'function') {
        throw Error('Table was not passed a valid `headerColumnClickFunc`; it should be a function.');
    }

    if (c.rowChangeFunc !== undefined && typeof c.rowChangeFunc !== 'function') {
        throw Error('Table was not passed a valid `rowChangeFunc`; it should be a function.');
    }

    if (c.rowClickFunc !== undefined && typeof c.rowClickFunc !== 'function') {
        throw Error('Table was not passed a valid `rowClickFunc`; it should be a function.');
    }

    if (typeof c.allowScrollPropagation !== 'boolean') {
        throw Error('Table was not passed a valid `allowScrollPropagation`; it should be a boolean.');
    }

    if (typeof c.fitColumnsToTable !== 'boolean') {
        throw Error('Table was not passed a valid `fitColumnsToTable`; it should be a boolean.');
    }

    if (typeof c.preserveScrollState !== 'boolean') {
        throw Error('Table was not passed a valid `preserveScrollState`; it should be a boolean.');
    }
}

export default class Table {
    _processConfiguration({
        allowScrollPropagation = false,
        fitColumnsToTable = false,
        preserveScrollState = true,
        throttleInterval = 300,
        totalRows = 0,
        ...others,
    }) {
        validateConfiguration(
            (this.c = {
                allowScrollPropagation,
                fitColumnsToTable,
                preserveScrollState,
                throttleInterval,
                totalRows,
                ...others,
            })
        );
    }

    constructor(config) {
        this._processConfiguration(config);

        this.body = this.c.body;
        this.bodyStyle = this.body.style;
        this.header = this.c.header;
        this.headerStyle = this.header.style;

        this.xScrollHandleStyle = this.c['x-scroll-handle'].style;
        this.yScrollHandleStyle = this.c['y-scroll-handle'].style;

        this._resetInternals();
        this.resetActiveRowIndex();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__rowStartIndex = null;

        this.regenerate();

        try {
            document.execCommand('copy');

            this.copyNode = document.createElement('textarea');
            this.copyNode.style.position = 'absolute';
            this.copyNode.style.clip = 'rect(1px, 1px, 1px, 1px)';
            this.copyNode.tabIndex = '-1';
            this.copyNode.style.opacity = 0;

            this.c.wrapper.appendChild(this.copyNode);

        } catch (e) {
            if (process.env.NODE_ENV !== 'test') {
                console.warn('Copying rows is not supported by this browser.');
            }
        }

        window.addEventListener('resize', this._handleWindowResize);
        window.addEventListener('mousemove', this._handleDragMove);

        this.c.wrapper.addEventListener('wheel', this._handleMoveIntent);
        this.c.wrapper.addEventListener('touchstart', this._handleTouchStart);
        this.c.wrapper.addEventListener('touchmove', this._handleTouchMove);

        this.c.wrapper.addEventListener('keydown', this._handleKeyDown);

        this.header.addEventListener('mousedown', this._handleColumnDragStart);
        this.header.addEventListener('click', this._handleHeaderClick);
        this.header.addEventListener('dblclick', this._handleColumnAutoExpand);

        this.body.addEventListener('click', this._handleClick);

        this.c['x-scroll-handle'].addEventListener('mousedown', this._handleXScrollHandleDragStart);
        this.c['y-scroll-handle'].addEventListener('mousedown', this._handleYScrollHandleDragStart);

        this.c['x-scroll-track'].addEventListener('click', this._handleAdvanceToXScrollTrackLocation);
        this.c['y-scroll-track'].addEventListener('click', this._handleAdvanceToYScrollTrackLocation);
    }

    _resetInternals() {
        this.columns = [];
        this.rows = [];
        this.rowsOrderedByY = [];
        this.rowsOrderedByYLength = 0;
        this.nPaddingRows = 3;

        this.x = this.y = 0;
        this.nextX = this.nextY = 0;

        if (this.c['y-scroll-track']) {
            this.c['y-scroll-track'].style.display = '';
        }

        this.distanceFromTop =   this.c['y-scroll-track']
                               ? this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset
                               : null;

        if (this.c['x-scroll-track']) {
            this.c['x-scroll-track'].style.display = '';
        }

        this.distanceFromLeft =   this.c['x-scroll-track']
                                ? this.c['x-scroll-track'].getBoundingClientRect().left + window.pageXOffset
                                : null;

        this.xScrollHandlePosition = this.yScrollHandlePosition = 0;

        this.topVisibleRowIndex = 0;

        // temporary variables in various calculations
        this.i = null;
        this.nRowsToShift = null;
        this.orderedYArrayIndex = null;
        this.ptr = null;
        this.shiftDelta = null;
        this.targetIndex = null;

        // translation caches
        this.lastHeaderX = null;
        this.lastBodyX = null;
        this.lastBodyY = null;
        this.lastXScrollHandleX = null;
        this.lastYScrollHandleY = null;

        this.dragTimer = null;

        this.evt = {preventDefault: noop};

        this.touch = null;
        this.lastTouchPageX = this.lastTouchPageY = 0;

        this.xScrollTrackWidth = this.xScrollTrackHeight = this.yScrollTrackHeight = null;
        this.xScrollHandleSize = this.yScrollHandleSize = null;

        // reset!
        this._translateAll();
    }

    _emptyHeader() {
        this.columns.length = 0;

        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    }

    _buildColumns() {
        this._emptyHeader();
        this.c.columns.forEach((column, index) => this.columns.push(createHeaderCell(column, index)));
    }

    _computeMinMaxHeaderCellDimensions() {
        this.columns.forEach((column) => {
            const cs = window.getComputedStyle(column.node);
            const max = cs['max-width'];
            const min = cs['min-width'];

            column.minWidth = min === 'none' ? Number.MIN_VALUE : parseInt(min, 10);
            column.maxWidth = max === 'none' ? Number.MAX_VALUE : parseInt(max, 10);
        });
    }

    _injectHeaderCells() {
        this.fragment = document.createDocumentFragment();
        this.columns.forEach((column) => this.fragment.appendChild(column.node));

        this.header.appendChild(this.fragment);

        // must be done after they have been injected into the DOM
        this._computeMinMaxHeaderCellDimensions();

        this.fragment = null; // prevent memleak
    }

    _emptyBody() {
        this.rows.length = 0;
        this.rowsOrderedByY.length = 0;
        this.rowsOrderedByYLength = 0;

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    }

    _injectFirstRow() {
        this._emptyBody();

        this.rows.push(createRow({
            active: this.rowStartIndex === this.activeRow,
            data: this.c.getRow(this.rowStartIndex),
            rowChangeFunc: this.c.rowChangeFunc,
            setIndex: this.rowStartIndex,
            y: 0,
        }, this.columns));

        this.rowsOrderedByY.push(0);
        this.rowsOrderedByYLength += 1;

        this.body.appendChild(this.rows[0].node);
    }

    _injectRestOfRows() {
        this.fragment = document.createDocumentFragment();

        for (this.i = 1; this.i < this.nRowsRendered; this.i += 1) {
            this.rows.push(createRow({
                active: this.i + this.rowStartIndex === this.activeRow,
                data: this.c.getRow(this.i + this.rowStartIndex),
                rowChangeFunc: this.c.rowChangeFunc,
                setIndex: this.i + this.rowStartIndex,
                y: this.cellHeight * this.i,
            }, this.columns));

            this.rowsOrderedByY.push(this.i);
            this.rowsOrderedByYLength += 1;

            this.fragment.appendChild(this.rows[this.i].node);
        }

        this.body.appendChild(this.fragment);
        this.fragment = null; // prevent memleak
    }

    _applyNewColumnWidth(index, width) {
        this.c.columns[index].width = width;    // the provided config objects
        this.columns[index].width = width;      // the column nodes

        this.rows.forEach((row) => (row.cells[index].width = width));

        this._calculateXBound();
        this._initializeScrollBars();

        if (this.c.columnResizeFunc) {
            this.c.columnResizeFunc(this.columns[index].mapping, width);
        }
    }

    _growColumnsToFillSpace() {
        const totalColumnWidth = this.columns.reduce((total, column) => (total + column.width), 0);
        const diff = this.containerWidth - totalColumnWidth;
        const diffRemainder = diff % this.columns.length;
        const pxToAdd = (diff - diffRemainder) / this.columns.length;

        this.columns.forEach((column, index, array) => {
            column.width += pxToAdd;

            if (index === array.length - 1) {
                column.width += diffRemainder;
            }

            if (column.width > column.maxWidth) {
                column.width = column.maxWidth;
            } else if (column.width < column.minWidth) {
                column.width = column.minWidth;
            }

            if (this.c.columnResizeFunc) {
                this.c.columnResizeFunc(column.mapping, column.width);
            }
        });

        this._applyColumnWidths();
    }

    _shrinkColumnsToAvailableSpace() {
        const totalColumnWidth = this.columns.reduce((total, column) => (total + column.width), 0);
        const diff = totalColumnWidth - this.containerWidth;
        const diffRemainder = diff % this.columns.length;
        const pxToSubtract = (diff - diffRemainder) / this.columns.length;

        this.columns.forEach((column, index, array) => {
            column.width -= pxToSubtract;

            if (index === array.length - 1) {
                column.width -= diffRemainder;
            }

            if (column.width > column.maxWidth) {
                column.width = column.maxWidth;
            } else if (column.width < column.minWidth) {
                column.width = column.minWidth;
            }

            if (this.c.columnResizeFunc) {
                this.c.columnResizeFunc(column.mapping, column.width);
            }
        });

        this._applyColumnWidths();
    }

    _calculateColumnWidths() {
        let totalWidth = 0;

        this.columns.forEach((column, index) => {
            if (column.width === undefined) {
                column.width = Math.min(
                    Math.max(...this.rows.map((row) => row.cells[index].node.clientWidth + 1 || column.minWidth)),
                    column.maxWidth,
                );
            }

            totalWidth += column.width;
        });

        if (this.c.fitColumnsToTable) {
            if (totalWidth !== this.containerWidth) {
                if (totalWidth > this.containerWidth) {
                    this._shrinkColumnsToAvailableSpace();
                } else {
                    this._growColumnsToFillSpace();
                }
            }
        } else {
            this._growColumnsToFillSpace();
        }
    }

    _applyColumnWidths() {
        this.rows.forEach((row) => {
            row.cells.forEach((cell, index) => {
                cell.width = this.columns[index].width;
            });
        });
    }

    _calculateCellHeight() {
        this.cellHeight = this.rows[0].cells[0].node.clientHeight || 40;
    }

    _calculateXBound() {
        this.rowWidth = this.rows[0].node.clientWidth || 500;
        this.xMaximum = this.containerWidth <= this.rowWidth ? this.containerWidth - this.rowWidth : 0;
    }

    _calculateYBound() {
        this.yMinimum = 0;
        this.yMaximum = this.bodyHeight - this.nRowsRendered * this.cellHeight;
    }

    _calculateXScrollHandleSize() {
        this.xScrollHandleSize = this.xScrollTrackWidth / this.rowWidth * this.xScrollTrackWidth;

        if (this.xScrollHandleSize < 12) {
            this.xScrollHandleSize = 12;
        } else if (this.xScrollHandleSize > this.xScrollTrackWidth) {
            this.xScrollHandleSize = this.xScrollTrackWidth;
        }

        return this.xScrollHandleSize;
    }

    _calculateYScrollHandleSize() {
        this.yScrollHandleSize =   this.nRowsVisible === this.nRowsRendered
                                 ? this.containerHeight
                                 : this.containerHeight * (this.nRowsVisible / this.c.totalRows);

        if (this.yScrollHandleSize < 12) {
            this.yScrollHandleSize = 12;
        }

        return this.yScrollHandleSize;
    }

    _initializeScrollBars() {
        this.xScrollTrackWidth = this.c['x-scroll-track'].clientWidth || this.containerWidth;
        this.xScrollTrackHeight = this.c['x-scroll-track'].clientHeight || 8;
        this.yScrollTrackHeight = this.c['y-scroll-track'].clientHeight || this.containerHeight;
        this.xScrollHandleStyle.width = this._calculateXScrollHandleSize() + 'px';
        this.yScrollHandleStyle.height = this._calculateYScrollHandleSize() + 'px';

        /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
        this.xTablePixelRatio = Math.abs(this.xMaximum) / (this.xScrollTrackWidth - this.xScrollHandleSize);

        /* how many scrollbar pixels === one row? */
        this.yScrollbarPixelRatio = (this.yScrollTrackHeight - this.yScrollHandleSize) / (this.c.totalRows - this.nRowsVisible);

        /* hide the scrollbars if they are not needed */

        if (this.xScrollHandleSize === this.xScrollTrackWidth) {
            this.c['x-scroll-track'].style.display = 'none';
            this.xScrollTrackHeightidden = true;
        } else {
            this.c['x-scroll-track'].style.display = '';
            this.xScrollTrackHeightidden = false;
        }

        if (this.yScrollHandleSize === this.yScrollTrackHeight) {
            this.c['y-scroll-track'].style.display = 'none';
            this.yScrollTrackHeightidden = true;
        } else {
            this.c['y-scroll-track'].style.display = '';
            this.yScrollTrackHeightidden = false;
        }
    }

    _calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.containerHeight = this.c.wrapper.clientHeight || 150;
        this.containerWidth = this.c.wrapper.clientWidth || 500;
        this.bodyHeight = this.c.body.clientHeight || 110;
    }

    _handleWindowResize = () => {
        if (this.c.wrapper.clientHeight !== this.containerHeight) {
            /* more rows may be needed to display the data, so we need to rebuild */
            return this.regenerate();
        } else if (this.c.wrapper.clientWidth !== this.containerWidth) {
            const oldWidth = this.containerWidth;

            this._calculateContainerDimensions();
            this._calculateColumnWidths();
            this._calculateXBound();
            this._initializeScrollBars();

            this.xScrollHandlePosition = this.x / this.xTablePixelRatio * -1;

            if (this.xScrollHandlePosition + this.xScrollHandleSize > this.xScrollTrackWidth) {
                this.xScrollHandlePosition = this.xScrollTrackWidth - this.xScrollHandleSize;
            }

            this._translateXScrollHandle(this.xScrollHandlePosition);

            // getting larger and we're fully scrolled to the right
            if (oldWidth < this.containerWidth && this.xScrollHandlePosition + this.xScrollHandleSize === this.xScrollTrackWidth) {
                this.x += this.containerWidth - oldWidth;

                this._translateHeader(this.x);
                this._translateBody(this.x, this.lastBodyY);
            }
        }
    }

    _translateHeader(x) {
        if (x !== this.lastHeaderX) {
            this.headerStyle[tp] = translate3d(x);
            this.lastHeaderX = x;
        }
    }

    _translateBody(x, y) {
        if (x !== this.lastBodyX || y !== this.lastBodyY) {
            this.bodyStyle[tp] = translate3d(x, y);
            this.lastBodyX = x;
            this.lastBodyY = y;
        }
    }

    _translateXScrollHandle(x) {
        if (x !== this.lastXScrollHandleX) {
            this.xScrollHandleStyle[tp] = translate3d(x);
            this.lastXScrollHandleX = x;
        }
    }

    _translateYScrollHandle(y) {
        if (y !== this.lastYScrollHandleY) {
            this.yScrollHandleStyle[tp] = translate3d(0, y);
            this.lastYScrollHandleY = y;
        }
    }

    _translateAll(nextX, nextY) {
        this._translateHeader(nextX);
        this._translateBody(nextX, nextY);
        this._translateXScrollHandle(this.xScrollHandlePosition);
        this._translateYScrollHandle(this.yScrollHandlePosition);
    }

    _scrollUp() {
        /* at the logical start of the table (row index 0) we truncate upward scroll attempts
           to the upper translation boundary to keep from skipping off into nothingness */

        if (this.rowStartIndex === 0 && this.nextY > this.yMinimum) {
            this.nextY = this.yMinimum;

            return;
        }

        if (this.rowStartIndex === 0 || this.nextY <= this.yMinimum) { return; }

        /* Scrolling up, so we want to move the row in the visual bottom position to the top
           (above the lip of the view) */

        this.nRowsToShift = Math.ceil(
            Math.abs(this.nextY - this.yMinimum) / this.cellHeight
        );

        /* prevent under-rotating below index zero, the logical start of a data set */
        if (this.rowStartIndex - this.nRowsToShift < 0) {
            this.nextY -= Math.abs(this.rowStartIndex - this.nRowsToShift) * this.cellHeight;
            this.nRowsToShift = this.rowStartIndex;
        }

        if (this.nRowsToShift > 0) {
            if (this.nRowsToShift > this.nRowsRendered) {
                /* when the total movement ends up being larger than the set of rows already rendered, we can safely decrement the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                this.shiftDelta = this.nRowsToShift - this.nRowsRendered;

                this.rowStartIndex -= this.shiftDelta;
                this.rowEndIndex -= this.shiftDelta;

                /* accomodate for the number of pixels that will not be rendered */
                this.nextY -= this.shiftDelta * this.cellHeight;

                this.nRowsToShift = this.nRowsRendered;
            }

            /* move the highest Y-value rows to the top of the ordering array */
            this.orderedYArrayIndex = this.rowsOrderedByY.length - 1;

            for (this.iterator = 1; this.iterator <= this.nRowsToShift; this.iterator += 1) {
                this.targetIndex = this.rowStartIndex - this.iterator;

                this.ptr = this.rows[
                    this.rowsOrderedByY[this.orderedYArrayIndex]
                ];

                this.ptr.data = this.dragTimer ? null : this.c.getRow(this.targetIndex);
                this.ptr.setIndex = this.targetIndex;
                this.ptr.y = this.rows[this.rowsOrderedByY[0]].y - this.cellHeight;
                this.ptr.active = this.targetIndex === this.activeRow;

                this.ptr = null;

                this.rowsOrderedByY.unshift(this.rowsOrderedByY.pop());
            }

            this.rowStartIndex -= this.nRowsToShift;
            this.rowEndIndex -= this.nRowsToShift;

            this.yMinimum += this.nRowsToShift * this.cellHeight;
            this.yMaximum += this.nRowsToShift * this.cellHeight;
        }
    }

    _scrollDown() {
        /* at the logical end of the table (row index n) we truncate any scroll attempts  */
        if (this.rowEndIndex >= this.c.totalRows - 1 && this.nextY <= this.yMaximum) {
            this.nextY = this.yMaximum;

            if (this.xScrollTrackHeightidden === false) {
                this.nextY -= this.xScrollTrackHeight;
            }

            return;

        } else if (this.nextY >= this.yMaximum) { return; }

        /* Scrolling down, so we want to move the row in the visual top position to the bottom
           (below the lip of the view) */

        this.nRowsToShift = Math.ceil(Math.abs(this.nextY - this.yMaximum) / this.cellHeight);

        if (this.nRowsToShift + this.rowEndIndex + 1 >= this.c.totalRows) {
            /* more rows than there is data available, truncate */
            this.nextY += (
                this.nRowsToShift - (this.c.totalRows - this.rowEndIndex - (this.topVisibleRowIndex === 0 ? 0 : 1))
            ) * this.cellHeight;

            this.nextY = applyDelta(
                applyDelta(this.yMaximum, this.y) % this.cellHeight, this.nextY
            );

            if (this.xScrollTrackHeightidden === false) {
                this.nextY -= this.xScrollTrackHeight;
            }

            this.nRowsToShift = this.c.totalRows - this.rowEndIndex - 1;
        }

        if (this.nRowsToShift > 0) {
            if (this.nRowsToShift > this.nRowsRendered) {
                /* when the total movement ends up being larger than the set of rows already rendered, we can safely increment the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                this.shiftDelta = this.nRowsToShift - this.nRowsRendered;

                this.rowStartIndex += this.shiftDelta;
                this.rowEndIndex += this.shiftDelta;

                /* accomodate for the number of pixels that will not be rendered */
                this.nextY += this.shiftDelta * this.cellHeight;

                this.nRowsToShift = this.nRowsRendered;
            }

            for (this.iterator = 1; this.iterator <= this.nRowsToShift; this.iterator += 1) {
                this.targetIndex = this.rowEndIndex + this.iterator;

                /* the padding rows will exceed the maximum index for a data set once the user has fully translated to the bottom of the screen */
                if (this.targetIndex >= this.c.totalRows) {
                    this.rowsOrderedByY.push(this.rowsOrderedByY.shift());

                    continue;
                }

                /* move the lowest Y-value rows to the bottom of the ordering array */
                this.ptr = this.rows[this.rowsOrderedByY[0]];

                this.ptr.data = this.dragTimer ? null : this.c.getRow(this.targetIndex);
                this.ptr.setIndex = this.targetIndex;
                this.ptr.y = this.rows[this.rowsOrderedByY[this.rowsOrderedByYLength - 1]].y + this.cellHeight;
                this.ptr.active = this.targetIndex === this.activeRow;

                this.ptr = null;

                this.rowsOrderedByY.push(this.rowsOrderedByY.shift());
            }

            this.rowStartIndex += this.nRowsToShift;
            this.rowEndIndex += this.nRowsToShift;

            this.yMinimum -= this.nRowsToShift * this.cellHeight;
            this.yMaximum -= this.nRowsToShift * this.cellHeight;
        }
    }

    _calculateVisibleTopRowIndex(targetY = this.nextY) {
        return this.rows[
            this.rowsOrderedByY[
                Math.ceil(Math.abs(
                    applyDelta(this.yMinimum, targetY) / this.cellHeight
                ))
            ]
        ].setIndex;
    }

    _handleMoveIntent = (event) => {
        if (this.c.allowScrollPropagation === false) {
            event.preventDefault();
        }

        if (event.deltaX === 0   && event.deltaY === 0) { return; }
        if (this.yScrollLocked && event.deltaY === 0) { return; }
        if (this.xScrollLocked && event.deltaX === 0) { return; }

        this.deltaX = event.deltaX;

        // deltaMode 0 === pixels, 1 === lines
        this.deltaY =   event.deltaMode === 1
                      ? parseInt(event.deltaY, 10) * this.cellHeight
                      : event.deltaY;

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this.nextX = this.yScrollLocked ? this.x : this.x - this.deltaX;
        this.nextY = this.xScrollLocked ? this.y : this.y - this.deltaY;

        if (this.nextX > 0) {
            this.nextX = 0;
        } else if (this.nextX < this.xMaximum) {
            this.nextX = this.xMaximum;
        }

        if (this.nRowsVisible >= this.c.totalRows) {
            /* negate the vertical movement, not enough rows to fill the body */
            this.nextY = this.y;
        } else if (this.nextY < this.y) {
            this._scrollDown();
        } else if (this.nextY > this.y) {
            this._scrollUp();
        }

        if (this.resetTimer) { window.clearTimeout(this.resetTimer); }

        /* reset row & wrapper Y values toward 0 to prevent overflowing */
        this.resetTimer = window.setTimeout(function resetYAxis(instance) {
            instance.resetTimer = null;
            instance.resetDelta = instance.yMinimum;

            /* shift all the positioning variables */
            instance.y = applyDelta(instance.resetDelta, instance.y);
            instance.yMinimum = applyDelta(instance.resetDelta, instance.yMinimum);
            instance.yMaximum = applyDelta(instance.resetDelta, instance.yMaximum);

            /* shift all the rows */
            instance.rowsOrderedByY.forEach((position, index) => (instance.rows[position].y = index * instance.cellHeight));

            /* shift the wrapper */
            instance._translateBody(instance.x, instance.y);

        }, 100, this);

        this.topVisibleRowIndex = this._calculateVisibleTopRowIndex();

        /* queue up translations and the browser will execute them as able, need to pass in the values that will change due to
           more _handleMoveIntent invocations before this rAF eventually executes. */
        window.requestAnimationFrame(function rAF(nextX, currX, nextY, visibleTopRowIndex) {
            if (nextX === 0) {
                this.xScrollHandlePosition = 0;
            } else {
                this.xScrollHandlePosition += ((nextX - currX) / this.xTablePixelRatio) * -1;

                if (this.xScrollHandlePosition + this.xScrollHandleSize > this.xScrollTrackWidth) {
                    this.xScrollHandlePosition = this.xScrollTrackWidth - this.xScrollHandleSize;
                }
            }

            this.yScrollHandlePosition = visibleTopRowIndex * this.yScrollbarPixelRatio;

            if (this.yScrollHandlePosition + this.yScrollHandleSize > this.yScrollTrackHeight) {
                this.yScrollHandlePosition = this.yScrollTrackHeight - this.yScrollHandleSize;
            }

            // Do all transforms grouped together
            this._translateAll(nextX, nextY);

        }.bind(this, this.nextX, this.x, this.nextY, this.topVisibleRowIndex));

        this.x = this.nextX;
        this.y = this.nextY;
    }

    _handleTouchMove = (event) => {
        event.preventDefault();

        /* we handle touchmove by detecting the delta of pageX/Y and forwarding
        it to _handleMoveIntent() */

        this.touch = event.touches.item(0);

        this.evt.deltaX = this.lastTouchPageX - this.touch.pageX;
        this.evt.deltaY = this.lastTouchPageY - this.touch.pageY;

        this.lastTouchPageX = this.touch.pageX;
        this.lastTouchPageY = this.touch.pageY;

        this._handleMoveIntent(this.evt);
    }

    _handleTouchStart = (event) => {
        this.touch = event.touches.item(0);
        this.lastTouchPageX = this.touch.pageX;
        this.lastTouchPageY = this.touch.pageY;
    }

    _handleAdvanceToXScrollTrackLocation = (event) => {
        if (this.xScrollLocked) { return; }
        if (event.target.className !== X_SCROLL_TRACK) { return; }

        this.evt.deltaX = Math.floor(
            applyDelta(
                this.lastXScrollHandleX, event.pageX - this.distanceFromLeft
            ) * this.xTablePixelRatio
        );

        this.evt.deltaY = 0;

        this._handleMoveIntent(this.evt);

        this.lastPageX = event.pageX;
    }

    _handleAdvanceToYScrollTrackLocation = (event) => {
        if (this.yScrollLocked) { return; }
        if (event.target.className !== Y_SCROLL_TRACK) { return; }

        this.evt.deltaX = 0;
        this.evt.deltaY = Math.floor(
            applyDelta(
                this.lastYScrollHandleY, event.pageY - this.distanceFromTop
            ) / this.yScrollbarPixelRatio
        ) * this.cellHeight;

        this._handleMoveIntent(this.evt);
    }

    _handleXScrollHandleDragStart = (event) => {
        if (event.button !== 0) { return; }

        event.preventDefault();

        this.lastPageX = event.pageX;
        this.xScrollLocked = true;
        this.leftButtonPressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this._handleDragEnd, true);
    }

    _handleYScrollHandleDragStart = (event) => {
        if (event.button !== 0) { return; }

        event.preventDefault();

        /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
        this.yScrollOffset = event.offsetY;

        this.yScrollLocked = true;
        this.leftButtonPressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this._handleDragEnd, true);
    }

    _handleDragMove = (event) => {
        if (!this.leftButtonPressed) { return; }

        if (this.yScrollLocked) {
            if (this.dragTimer) { window.clearTimeout(this.dragTimer); }

            /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
            this.dragTimer = window.setTimeout(() => {
                this.dragTimer = null;

                /* Now fetch, once drag has ceased for long enough. */
                this.rows.forEach((row) => {
                    if (row.data === null) {
                        row.data = this.c.getRow(row.setIndex);
                    }
                });
            }, this.c.throttleInterval);

            this.evt.deltaX = 0;
            this.evt.deltaY = Math.floor(
                applyDelta(
                    this.lastYScrollHandleY,
                    event.pageY - this.distanceFromTop - this.yScrollOffset
                ) / this.yScrollbarPixelRatio
            ) * this.cellHeight;

            this._handleMoveIntent(this.evt);

        } else if (this.xScrollLocked) {
            this.evt.deltaX = (event.pageX - this.lastPageX) * this.xTablePixelRatio;
            this.evt.deltaY = 0;

            this._handleMoveIntent(this.evt);

            this.lastPageX = event.pageX;

        } else if (this.columnIsResizing) {
            this._handleColumnResize(event.pageX - this.lastColumnX);

            this.lastColumnX = event.pageX;
        }
    }

    _unlockDragToScroll() {
        this.xScrollLocked = this.yScrollLocked = this.columnIsResizing = false;

        window.removeEventListener('click', this._preventClickWhileDragging, true);
    }

    _handleDragEnd = () => {
        window.removeEventListener('mouseup', this._handleDragEnd, true);

        this.leftButtonPressed = false;

        /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
        window.setTimeout(() => this._unlockDragToScroll(), 0);
    }

    _preventClickWhileDragging = (event) => event.stopImmediatePropagation()

    _handleColumnDragStart = (event) => {
        if (event.button === 0 && event.target.className === HEADER_CELL_HANDLE) {
            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this.leftButtonPressed = true;

            this.lastColumnX = event.pageX;

            this.columnIsResizing = fw(this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

            window.addEventListener('click', this._preventClickWhileDragging, true);

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this._handleDragEnd, true);
        }
    }

    _handleColumnResize(delta) {
        if (delta === 0) { return; }

        const index = this.columns.indexOf(this.columnIsResizing);
        let adjustedDelta = delta;

        if (   adjustedDelta < 0
            && !isNaN(this.columnIsResizing.minWidth)
            && this.columnIsResizing.width + adjustedDelta < this.columnIsResizing.minWidth) {
                adjustedDelta = this.columnIsResizing.minWidth - this.columnIsResizing.width;
        } else if (!isNaN(this.columnIsResizing.maxWidth)
                   && this.columnIsResizing.width + adjustedDelta > this.columnIsResizing.maxWidth) {
            adjustedDelta = this.columnIsResizing.maxWidth - this.columnIsResizing.width;
        }

        this._applyNewColumnWidth(index, this.columnIsResizing.width + adjustedDelta);

        /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than
        the overall container, whitespace will appear regardless. */
        if (adjustedDelta < 0 && this.rowWidth + this.x + adjustedDelta < this.containerWidth) {
            this.evt.deltaX = adjustedDelta;
            this.evt.deltaY = 0;

            this._handleMoveIntent(this.evt);
        }
    }

    _handleColumnAutoExpand = (event) => {
        if (event.button === 0 && event.target.className === HEADER_CELL_HANDLE) {
            const mapping = event.target.parentNode.getAttribute('data-column');
            const column = fw(this.columns, 'mapping', mapping);
            const columnIndex = this.columns.indexOf(column);

            let width = column.width;
            let cellWidth;

            this.rows.forEach((row) => {
                if (!(row.data instanceof Promise) && row.data !== null) {
                    cellWidth = row.cells[columnIndex].trueWidth();
                    width = width < cellWidth ? cellWidth : width;
                }
            }); /* find the rendered row with the longest content entry */

            this._applyNewColumnWidth(columnIndex, width);
        }
    }

    _setAriaText(text) {
        this.c.aria.innerText = text;
    }

    _changeActiveRow(delta) {
        if (this.activeRow + delta >= this.c.totalRows) { return; }

        this.nextActiveRow = fw(this.rows, 'setIndex', this.activeRow + delta);

        if (this.nextActiveRow) {
            this.setActiveRowIndex(this.nextActiveRow.setIndex);
            this._setAriaText(this.nextActiveRow.data[this.columns[0].mapping]);

            if (
                   (delta === -1 && this.nextActiveRow.y * -1 > this.y)
                || (delta === 1 && this.nextActiveRow.y * -1 < this.y - this.bodyHeight + this.cellHeight)
            ) { // Destination row is outside the viewport, so simulate a scroll
                this.evt.deltaX = 0;
                this.evt.deltaY = this.cellHeight * delta;

                this._handleMoveIntent(this.evt);
            }
        } else if (   (delta < 0 && this.activeRow > 0)
                   || (delta > 0 && this.activeRow < this.c.totalRows)) {
            /* The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown in the viewport. */
            this.evt.deltaX = 0;
            this.evt.deltaY = (   (    this.rowStartIndex > this.activeRow
                                          && this.activeRow - this.rowStartIndex)
                                     || (    this.rowStartIndex < this.activeRow
                                          && this.activeRow - this.rowStartIndex)
                                     + delta) * this.cellHeight;

            this._handleMoveIntent(this.evt);

            // start the process again, now that the row is available
            window.requestAnimationFrame(() => this._changeActiveRow(delta));
        }

        this.nextActiveRow = null;
    }

    _handleKeyDown = (event) => {
        const key = event.key || getKeyFromKeyCode(event.keyCode);

        switch (key) {
        case 'Escape':
            this.resetActiveRowIndex();
            break;

        case 'ArrowDown':
            if (   this.activeRow !== -1 // already keying through the table
                || (this.activeRow === -1 && this.rowStartIndex === 0) // at the beginning
            ) {
                this._changeActiveRow(1);
            } else {
                // start the active row on the topmost row in the current viewport
                this._changeActiveRow(this.rowStartIndex + this.nPaddingRows + 1);
            }

            event.preventDefault();
            break;

        case 'ArrowUp':
            this._changeActiveRow(-1);
            event.preventDefault();
            break;

        case 'Enter':
            if (this.activeRow !== -1) {
                const row = fw(this.rows, 'setIndex', this.activeRow).data;

                this._setAriaText(this.columns.map((column) => {
                    return `${column.title}: ${row[column.mapping]}`;
                }).join('\n'));
            }

            event.preventDefault();
            break;

        case 'c':
            if ((event.metaKey || event.ctrlKey) && this.activeRow >= 0 && this.copyNode) {
                const activeRow = fw(this.rows, 'setIndex', this.activeRow);

                this.copyNode.value
                    =   this.columns.map((column) => `"${column.title.replace('"', '\\"')}"`).join(',')
                      + '\n'
                      + activeRow.cells.map((cell) => `"${cell.node.textContent.replace('"', '\\"')}"`).join(',')
                      + '\n';

                this.copyNode.select();

                document.execCommand('copy');
            }

            break;
        }
    }

    _discoverCellAndRowNodes(target) {
        let node = target;
        const nodeMap = {};

        if (node.classList.contains(ROW)) {
            return {row: node};
        }

        while ((!nodeMap.cell || !nodeMap.row) && node) {
            if (node.classList.contains(CELL)) {
                nodeMap.cell = node;
            } else if (node.classList.contains(ROW)) {
                nodeMap.row = node;
            }

            node = node.parentNode;
        }

        return nodeMap;
    }

    _handleClick = (event) => {
        const map = this._discoverCellAndRowNodes(event.target);

        if (map.row) {
            const row = fw(this.rows, 'node', map.row);

            this.setActiveRowIndex(row.setIndex);

            if (map.cell && this.c.cellClickFunc) {
                this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
            }

            if (this.c.rowClickFunc) {
                this.c.rowClickFunc(event, row.setIndex);
            }
        }
    }

    _handleHeaderClick = (event) => {
        if (this.c.headerColumnClickFunc) {
            let node = event.target;
            let mapping;

            while (!mapping && node) {
                if (!node.hasAttribute('data-column')) {
                    node = node.parentElement;
                    continue;
                }

                mapping = node.getAttribute('data-column');
            }

            if (mapping) {
                this.c.headerColumnClickFunc(event, mapping);
            }
        }
    }

    // public APIs

    getActiveRowIndex() {
        return this.activeRow > -1 ? this.activeRow : undefined;
    }

    setActiveRowIndex(setIndex) {
        this.activeRow = setIndex;
        this.rows.forEach((row) => (row.active = row.setIndex === setIndex));

        if (this.c.activeRowChangedFunc) {
            this.c.activeRowChangedFunc(this.activeRow);
        }
    }

    resetActiveRowIndex() {
        const prevActiveRow = this.activeRow;

        this.activeRow = -1;
        this.nextActiveRow = null;
        this.rows.forEach((row) => (row.active = row.setIndex === this.activeRow));

        // ignore the initial reset performed in the constructor
        if (this.c.activeRowChangedFunc && prevActiveRow !== undefined) {
            this.c.activeRowChangedFunc();
        }
    }

    getXAmountScrolled() {
        return this.x;
    }

    getYAmountScrolled() {
        return this.y;
    }

    jumpToRowIndex(index) {
        if (isNaN(index) || index === null) {
            return;
        } // ignore invalid input

        if (index < 0) {
            // eslint-disable-next-line no-param-reassign
            index = 0;
        } // underflow protection

        if (index > this.c.totalRows - 1) {
            // eslint-disable-next-line no-param-reassign
            index = this.c.totalRows - 1;
        } // overflow protection

        this.setActiveRowIndex(index);

        // if already visible, don't regenerate
        if (index >= this.topVisibleRowIndex && index <= this.rowEndIndex) {
            return;
        }

        if (index + this.nRowsRendered < this.c.totalRows) {
            this.rowStartIndex = index;
            this.y = 0;
        } else {
            this.rowStartIndex = this.c.totalRows - this.nRowsRendered;
            this.y = this.nPaddingRows * this.cellHeight * -1;
        }

        this.regenerate();

        this.yScrollHandlePosition = index * this.yScrollbarPixelRatio;

        if (this.yScrollHandlePosition + this.yScrollHandleSize > this.yScrollTrackHeight) {
            this.yScrollHandlePosition = this.yScrollTrackHeight - this.yScrollHandleSize;
        }

        this._translateYScrollHandle(this.yScrollHandlePosition);
    }

    regenerate(config = this.c) {
        if (config !== this.c) { this._processConfiguration(config); }

        /* stores the current state of the union for if we need to rehydrate the previous scroll state */
        this.__x = this.x;
        this.__y = this.y;
        this.__rowStartIndex = this.rowStartIndex;

        this._resetInternals();

        if (this.c.totalRows === 0) {
            this.c.body.style.display = 'none';
        } else {
            this.c.body.style.display = '';
        }

        if (this.activeRow >= this.c.totalRows) {
            this.resetActiveRowIndex();
        }

        this._calculateContainerDimensions();
        this._buildColumns();

        this.rowStartIndex = this.c.preserveScrollState ? this.__rowStartIndex || 0 : 0;

        this._injectFirstRow();
        this._calculateCellHeight();

        this.nRowsRendered = Math.ceil(this.bodyHeight / this.cellHeight) + this.nPaddingRows;

        if (this.nRowsRendered > this.c.totalRows) {
            this.nRowsRendered = this.c.totalRows;
        }

        this.nRowsVisible = Math.floor(this.bodyHeight / this.cellHeight);

        if (this.nRowsVisible > this.nRowsRendered) {
            this.nRowsVisible = this.nRowsRendered;
        }

        this.rowEndIndex = this.rowStartIndex + this.nRowsRendered - 1;

        this._injectRestOfRows();
        this._injectHeaderCells();
        this._calculateColumnWidths();

        this._calculateXBound();
        this._calculateYBound();

        this.topVisibleRowIndex = this._calculateVisibleTopRowIndex();

        this._initializeScrollBars();

        if (this.c.preserveScrollState && this.__x !== null && this.__y !== null) {
            /* the cached values are then applied against the table to arrive at the previous state */

            this._handleMoveIntent({
                deltaX: -this.__x,
                deltaY: -this.__y,
                preventDefault: noop,
            });
        }

        this.__x = this.__y = this.__rowStartIndex = null;
    }

    destroy() {
        window.removeEventListener('resize', this._handleWindowResize);
        window.removeEventListener('mousemove', this._handleDragMove);

        this.c.wrapper.removeEventListener('wheel', this._handleMoveIntent);
        this.c.wrapper.removeEventListener('touchstart', this._handleTouchStart);
        this.c.wrapper.removeEventListener('touchmove', this._handleTouchMove);

        this.c.wrapper.removeEventListener('keydown', this._handleKeyDown);

        this.header.removeEventListener('mousedown', this._handleColumnDragStart);
        this.header.removeEventListener('click', this._handleHeaderClick);
        this.header.removeEventListener('dblclick', this._handleColumnAutoExpand);

        this.body.removeEventListener('click', this._handleClick);

        this.c['x-scroll-handle'].removeEventListener('mousedown', this._handleXScrollHandleDragStart);
        this.c['y-scroll-handle'].removeEventListener('mousedown', this._handleYScrollHandleDragStart);

        this.c['x-scroll-track'].removeEventListener('click', this._handleAdvanceToXScrollTrackLocation);
        this.c['y-scroll-track'].removeEventListener('click', this._handleAdvanceToYScrollTrackLocation);

        this._emptyHeader();
        this._emptyBody();

        // release cached DOM nodes
        Object.keys(this.c).forEach((key) => {
            if (this.c[key] instanceof HTMLElement) {
                this.c[key] = null;
            }
        });
    }
}
