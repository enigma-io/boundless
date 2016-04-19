/**
 * A high-performance, infinite table view.
 * @class TableView
 */

import transformProp from '../../UIUtils/transformProperty';
import findWhere from '../../UIUtils/findWhere';
import noop from '../../UIUtils/noop';

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

const cellClassRegex = /\s?ui-table-cell\b/g;
const rowClassRegex = /\s?ui-table-row\b/g;

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

                if (val && this.node.className.indexOf('ui-table-row-active') === -1) {
                    this.node.className += ' ui-table-row-active';
                } else if (!val && this.node.className.indexOf('ui-table-row-active') !== -1) {
                    this.node.className = this.node.className.replace('ui-table-row-active', '').trim();
                }
            }
        },
        '_setIndex': null,
        get setIndex() { return this._setIndex; },
        set setIndex(val) {
            if (val !== this._setIndex) {
                if (val % 2 === 0) {
                    this.node.className =   this._setIndex === null
                                          ? 'ui-table-row ui-table-row-even'
                                          : this.node.className.replace('ui-table-row-odd', 'ui-table-row-even');
                } else {
                    this.node.className =   this._setIndex === null
                                          ? 'ui-table-row ui-table-row-odd'
                                          : this.node.className.replace('ui-table-row-even', 'ui-table-row-odd');
                }

                this._setIndex = val;
            }
        },
        '_waitingForResolution': false,
        get waitingForResolution() { return this._waitingForResolution; },
        set waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                this._waitingForResolution = val;

                if (val && this.node.className.indexOf('ui-table-row-loading') === -1) {
                    this.node.className += ' ui-table-row-loading';
                } else if (!val && this.node.className.indexOf('ui-table-row-loading') !== -1) {
                    this.node.className = this.node.className.replace('ui-table-row-loading', '').trim();
                }
            }
        },
        '_data': null,
        get data() { return this._data; },
        set data(val) {
            if (val !== this._data) {
                this._data = val;

                if (this._data instanceof Promise || this._data === null) {
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
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                    }

                    this.waitingForResolution = false;

                    return;
                }

                for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                    this.cells[this._iterator].content = '';
                }

                this.waitingForResolution = false;
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

class TableView {
    validateColumnShape(column) {
        return    typeof column.mapping === 'string'
               && typeof column.resizable === 'boolean'
               && typeof column.title === 'string'
               && (typeof column.width === 'number' || typeof column.width === 'undefined');
    }

    validateConfiguration(config) {
        if (!(config.wrapper instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `wrapper` element.');
        }

        if (!(config.header instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `header` element.');
        }

        if (!(config.body instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `body` element.');
        }

        if (!(config['x-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-track` element.');
        }

        if (!(config['y-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-track` element.');
        }

        if (!(config['x-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-handle` element.');
        }

        if (!(config['y-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-handle` element.');
        }

        if (!(config.aria instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `aria` element.');
        }

        if (   !Array.isArray(config.columns)
            || config.columns.length === 0
            || !config.columns.every(this.validateColumnShape)) {
            throw Error(`TableView was not passed valid \`columns\`. It should be an array with at least one object conforming to: {
                mapping: string,
                resizable: bool,
                title: string,
                width: number (optional),
            }`);
        }

        if (typeof config.throttleInterval !== 'number') {
            throw Error('TableView was not passed a valid `throttleInterval`; it should be a Number.');
        }

        if (typeof config.totalRows !== 'number') {
            throw Error('TableView was not passed a valid `totalRows`; it should be a Number.');
        }

        if (typeof config.getRow !== 'function') {
            throw Error('TableView was not passed a valid `getRow`; it should be a function.');
        }

        if (typeof config.rowClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `rowClickFunc`; it should be a function.');
        }

        if (typeof config.cellClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `cellClickFunc`; it should be a function.');
        }

        if (typeof config.preserveScrollState !== 'boolean') {
            throw Error('TableView was not passed a valid `preserveScrollState`; it should be a boolean.');
        }
    }

    processConfiguration(config) {
        this.c = {...config};

        // fallback values
        this.c.rowClickFunc = this.c.rowClickFunc || noop;
        this.c.cellClickFunc = this.c.cellClickFunc || noop;
        this.c.preserveScrollState = this.c.preserveScrollState === undefined ? true : this.c.preserveScrollState;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        this.validateConfiguration(this.c);
    }

    constructor(config) {
        this.processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;
        this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
        this.y_scroll_handle_style = this.c['y-scroll-handle'].style;

        this.resetInternals();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__row_start_index = null;

        this.regenerate();

        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('mousemove', this.handleDragMove);

        this.c.wrapper.addEventListener('wheel', this.handleMoveIntent);
        this.c.wrapper.addEventListener('touchstart', this.handleTouchStart);
        this.c.wrapper.addEventListener('touchmove', this.handleTouchMove);

        this.c.wrapper.addEventListener('keydown', this.handleKeyDown);

        this.header.addEventListener('mousedown', this.handleColumnDragStart);
        this.header.addEventListener('dblclick', this.handleColumnAutoExpand);

        this.body.addEventListener('click', this.handleClick);

        this.c['x-scroll-handle'].addEventListener('mousedown', this.handleXScrollHandleDragStart);
        this.c['y-scroll-handle'].addEventListener('mousedown', this.handleYScrollHandleDragStart);

        this.c['x-scroll-track'].addEventListener('click', this.handleAdvanceToXScrollTrackLocation);
        this.c['y-scroll-track'].addEventListener('click', this.handleAdvanceToYScrollTrackLocation);
    }

    destroy() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('mousemove', this.handleDragMove);

        this.c.wrapper.removeEventListener('wheel', this.handleMoveIntent);
        this.c.wrapper.removeEventListener('touchstart', this.handleTouchStart);
        this.c.wrapper.removeEventListener('touchmove', this.handleTouchMove);

        this.c.wrapper.removeEventListener('keydown', this.handleKeyDown);

        this.header.removeEventListener('mousedown', this.handleColumnDragStart);
        this.header.removeEventListener('dblclick', this.handleColumnAutoExpand);

        this.body.removeEventListener('click', this.handleClick);

        this.c['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
        this.c['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

        this.c['x-scroll-track'].removeEventListener('click', this.handleAdvanceToXScrollTrackLocation);
        this.c['y-scroll-track'].removeEventListener('click', this.handleAdvanceToYScrollTrackLocation);

        this.emptyHeader();
        this.emptyBody();

        // release cached DOM nodes
        Object.keys(this.c).forEach(key => {
            if (this.c[key] instanceof HTMLElement) {
                this.c[key] = null;
            }
        });
    }

    resetInternals() {
        this.columns = [];
        this.rows = [];
        this.rows_ordered_by_y = [];
        this.rows_ordered_by_y_length = 0;
        this.n_padding_rows = 3;

        this.x = this.y = 0;
        this.next_x = this.next_y = 0;
        this.distance_from_left = this.last_pageX = this.c['x-scroll-track'].getBoundingClientRect().left + window.pageXOffset;
        this.distance_from_top = this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset;
        this.x_scroll_handle_position = this.y_scroll_handle_position = 0;

        this.active_row = -1;
        this.next_active_row = null;

        this.top_visible_row_index = 0;

        // temporary variables in various calculations
        this.i = null;
        this.n_rows_to_shift = null;
        this.ordered_y_array_index = null;
        this.ptr = null;
        this.shift_delta = null;
        this.target_index = null;

        // translation caches
        this.last_header_x = null;
        this.last_body_x = null;
        this.last_body_y = null;
        this.last_x_scroll_handle_x = null;
        this.last_y_scroll_handle_y = null;

        this.drag_timer = null;

        this.evt = {preventDefault: noop};

        this.touch = null;
        this.last_touch_pageX = this.last_touch_pageY = 0;

        this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
        this.x_scroll_handle_size = this.y_scroll_handle_size = null;

        // reset!
        this.performTranslations();
    }

    emptyHeader() {
        this.columns.length = 0;

        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    }

    buildColumns() {
        this.emptyHeader();

        this.c.columns.forEach(column => this.columns.push(createHeaderCell(column)));
    }

    computeMinMaxHeaderCellDimensions() {
        let cs;

        this.columns.forEach(column => {
            cs = window.getComputedStyle(column.node);

            column.minWidth = parseInt(cs['min-width'], 10);
            column.maxWidth = parseInt(cs['max-width'], 10);
        });
    }

    injectHeaderCells() {
        this.fragment = document.createDocumentFragment();
        this.columns.forEach(column => this.fragment.appendChild(column.node));

        this.header.appendChild(this.fragment);

        // must be done after they have been injected into the DOM
        this.computeMinMaxHeaderCellDimensions();

        this.fragment = null; // prevent memleak
    }

    emptyBody() {
        this.rows.length = 0;
        this.rows_ordered_by_y.length = 0;
        this.rows_ordered_by_y_length = 0;

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    }

    injectFirstRow() {
        this.emptyBody();

        this.rows.push(createRow({
            data: this.c.getRow(this.row_start_index),
            setIndex: this.row_start_index,
            y: 0,
        }, this.columns));

        this.rows_ordered_by_y.push(0);
        this.rows_ordered_by_y_length += 1;

        this.body.appendChild(this.rows[0].node);
    }

    injectRestOfRows() {
        this.fragment = document.createDocumentFragment();

        for (this.i = 1; this.i < this.n_rows_rendered; this.i += 1) {
            this.rows.push(createRow({
                data: this.c.getRow(this.i + this.row_start_index),
                setIndex: this.i + this.row_start_index,
                y: this.cell_h * this.i,
            }, this.columns));

            this.rows_ordered_by_y.push(this.i);
            this.rows_ordered_by_y_length += 1;

            this.fragment.appendChild(this.rows[this.i].node);
        }

        this.body.appendChild(this.fragment);
        this.fragment = null; // prevent memleak
    }

    calculateCellHeight() {
        this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
    }

    calculateCellWidths() {
        this.rows[0].cells.forEach((cell, index) => {
            this.columns[index].width = this.columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = this.columns[index].width;
        });
    }

    calculateXBound() {
        this.row_w = this.rows[0].node.clientWidth || 500;
        this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
    }

    calculateYBound() {
        this.y_min = 0;
        this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
    }

    calculateXScrollHandleSize() {
        this.x_scroll_handle_size = this.container_w - Math.abs(this.x_max);

        if (this.x_scroll_handle_size < 12) {
            this.x_scroll_handle_size = 12;
        }

        return this.x_scroll_handle_size;
    }

    calculateYScrollHandleSize() {
        this.y_scroll_handle_size =   this.n_rows_visible === this.n_rows_rendered
                                    ? this.container_h
                                    : this.container_h * (this.n_rows_visible / this.c.totalRows);

        if (this.y_scroll_handle_size < 12) {
            this.y_scroll_handle_size = 12;
        }

        return this.y_scroll_handle_size;
    }

    initializeScrollBars() {
        this.x_scroll_track_w = this.c['x-scroll-track'].clientWidth || this.container_w;
        this.x_scroll_track_h = this.c['x-scroll-track'].clientHeight || 8;
        this.y_scroll_track_h = this.c['y-scroll-track'].clientHeight || this.container_h;
        this.x_scroll_handle_style.width = this.calculateXScrollHandleSize() + 'px';
        this.y_scroll_handle_style.height = this.calculateYScrollHandleSize() + 'px';

        /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
        this.x_table_pixel_ratio = Math.abs(this.x_max) / (this.x_scroll_track_w - this.x_scroll_handle_size);

        /* how many scrollbar pixels === one row? */
        this.y_scrollbar_pixel_ratio = (this.y_scroll_track_h - this.y_scroll_handle_size) / (this.c.totalRows - this.n_rows_visible);

        /* hide the scrollbars if they are not needed */

        if (this.x_scroll_handle_size === this.container_w) {
            this.c['x-scroll-track'].style.display = 'none';
            this.x_scroll_track_hidden = true;
        } else {
            this.c['x-scroll-track'].style.display = '';
            this.x_scroll_track_hidden = false;
        }

        if (this.y_scroll_handle_size === this.container_h) {
            this.c['y-scroll-track'].style.display = 'none';
            this.y_scroll_track_hidden = true;
        } else {
            this.c['y-scroll-track'].style.display = '';
            this.y_scroll_track_hidden = false;
        }
    }

    calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.container_h = this.c.wrapper.clientHeight || 150;
        this.container_w = this.c.wrapper.clientWidth || 500;
        this.body_h = this.c.body.clientHeight || 110;
    }

    handleWindowResize = () => {
        if (this.c.wrapper.clientHeight !== this.container_h) {
            /* more rows may be needed to display the data, so we need to rebuild */
            return this.regenerate();
        }

        this.calculateContainerDimensions();
        this.calculateXBound();
        this.initializeScrollBars();
    }

    regenerate(config = this.c) {
        if (config !== this.c) { this.processConfiguration(config); }

        /* stores the current state of the union for if we need to rehydrate the previous scroll state */
        this.__x = this.x;
        this.__y = this.y;
        this.__row_start_index = this.row_start_index;

        this.resetInternals();
        this.calculateContainerDimensions();

        this.buildColumns();

        this.row_start_index = this.c.preserveScrollState ? this.__row_start_index || 0 : 0;

        this.injectFirstRow();
        this.calculateCellWidths();
        this.calculateCellHeight();

        this.n_rows_rendered = Math.ceil(this.body_h / this.cell_h) + this.n_padding_rows;

        if (this.n_rows_rendered > this.c.totalRows) {
            this.n_rows_rendered = this.c.totalRows;
        }

        this.n_rows_visible = Math.floor(this.body_h / this.cell_h);

        if (this.n_rows_visible > this.n_rows_rendered) {
            this.n_rows_visible = this.n_rows_rendered;
        }

        this.row_end_index = this.row_start_index + this.n_rows_rendered - 1;

        this.injectHeaderCells();
        this.injectRestOfRows();

        this.calculateXBound();
        this.calculateYBound();

        this.initializeScrollBars();

        if (this.c.preserveScrollState && this.__x !== null && this.__y !== null) {
            /* the cached values are then applied against the table to arrive at the previous state */

            this.handleMoveIntent({
                deltaX: -this.__x,
                deltaY: -this.__y,
                preventDefault: noop,
            });
        }

        this.__x = this.__y = this.__row_start_index = null;
    }

    translateHeader(x) {
        if (x !== this.last_header_x) {
            this.header_style[transformProp] = translate3d(x);
            this.last_header_x = x;
        }
    }

    translateBody(x, y) {
        if (x !== this.last_body_x || y !== this.last_body_y) {
            this.body_style[transformProp] = translate3d(x, y);
            this.last_body_x = x;
            this.last_body_y = y;
        }
    }

    translateXScrollHandle(x) {
        if (x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[transformProp] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    }

    translateYScrollHandle(y) {
        if (y !== this.last_y_scroll_handle_y) {
            this.y_scroll_handle_style[transformProp] = translate3d(0, y);
            this.last_y_scroll_handle_y = y;
        }
    }

    performTranslations(nextX, nextY) {
        this.translateHeader(nextX);
        this.translateBody(nextX, nextY);
        this.translateXScrollHandle(this.x_scroll_handle_position);
        this.translateYScrollHandle(this.y_scroll_handle_position);
    }

    scrollUp() {
        /* at the logical start of the table (row index 0) we truncate upward scroll attempts
           to the upper translation boundary to keep from skipping off into nothingness */

        if (this.row_start_index === 0 && this.next_y > this.y_min) {
            this.next_y = this.y_min;

            return;
        }

        if (this.row_start_index === 0 || this.next_y <= this.y_min) { return; }

        /* Scrolling up, so we want to move the row in the visual bottom position to the top
           (above the lip of the view) */

        this.n_rows_to_shift = Math.ceil(
            Math.abs(this.next_y - this.y_min) / this.cell_h
        );

        /* prevent under-rotating below index zero, the logical start of a data set */
        if (this.row_start_index - this.n_rows_to_shift < 0) {
            this.next_y -= Math.abs(this.row_start_index - this.n_rows_to_shift) * this.cell_h;
            this.n_rows_to_shift = this.row_start_index;
        }

        if (this.n_rows_to_shift > 0) {
            if (this.n_rows_to_shift > this.n_rows_rendered) {
                /* when the total movement ends up being larger than the set of rows already rendered, we can safely decrement the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                this.row_start_index -= this.shift_delta;
                this.row_end_index -= this.shift_delta;

                /* accomodate for the number of pixels that will not be rendered */
                this.next_y -= this.shift_delta * this.cell_h;

                this.n_rows_to_shift = this.n_rows_rendered;
            }

            /* move the highest Y-value rows to the top of the ordering array */
            this.ordered_y_array_index = this.rows_ordered_by_y.length - 1;

            for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                this.target_index = this.row_start_index - this.iterator;

                this.ptr = this.rows[
                    this.rows_ordered_by_y[this.ordered_y_array_index]
                ];

                this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                this.ptr.setIndex = this.target_index;
                this.ptr.y = this.rows[this.rows_ordered_by_y[0]].y - this.cell_h;
                this.ptr.active = this.target_index === this.active_row;

                this.ptr = null;

                this.rows_ordered_by_y.unshift(this.rows_ordered_by_y.pop());
            }

            this.row_start_index -= this.n_rows_to_shift;
            this.row_end_index -= this.n_rows_to_shift;

            this.y_min += this.n_rows_to_shift * this.cell_h;
            this.y_max += this.n_rows_to_shift * this.cell_h;
        }
    }

    scrollDown() {
        /* at the logical end of the table (row index n) we truncate any scroll attempts  */
        if (this.row_end_index >= this.c.totalRows - 1 && this.next_y <= this.y_max) {
            this.next_y = this.y_max;

            if (this.x_scroll_track_hidden === false) {
                this.next_y -= this.x_scroll_track_h;
            }

            return;

        } else if (this.next_y >= this.y_max) { return; }

        /* Scrolling down, so we want to move the row in the visual top position to the bottom
           (below the lip of the view) */

        this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_max) / this.cell_h);

        if (this.n_rows_to_shift + this.row_end_index + 1 >= this.c.totalRows) {
            /* more rows than there is data available, truncate */
            this.next_y += (
                this.n_rows_to_shift - (this.c.totalRows - this.row_end_index - (this.top_visible_row_index === 0 ? 0 : 1))
            ) * this.cell_h;

            this.next_y = this.applyDelta(
                this.applyDelta(this.y_max, this.y) % this.cell_h, this.next_y
            );

            if (this.x_scroll_track_hidden === false) {
                this.next_y -= this.x_scroll_track_h;
            }

            this.n_rows_to_shift = this.c.totalRows - this.row_end_index - 1;
        }

        if (this.n_rows_to_shift > 0) {
            if (this.n_rows_to_shift > this.n_rows_rendered) {
                /* when the total movement ends up being larger than the set of rows already rendered, we can safely increment the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                this.row_start_index += this.shift_delta;
                this.row_end_index += this.shift_delta;

                /* accomodate for the number of pixels that will not be rendered */
                this.next_y += this.shift_delta * this.cell_h;

                this.n_rows_to_shift = this.n_rows_rendered;
            }

            for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                this.target_index = this.row_end_index + this.iterator;

                /* the padding rows will exceed the maximum index for a data set once the user has fully translated to the bottom of the screen */
                if (this.target_index >= this.c.totalRows) {
                    this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());

                    continue;
                }

                /* move the lowest Y-value rows to the bottom of the ordering array */
                this.ptr = this.rows[this.rows_ordered_by_y[0]];

                this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                this.ptr.setIndex = this.target_index;
                this.ptr.y = this.rows[this.rows_ordered_by_y[this.rows_ordered_by_y_length - 1]].y + this.cell_h;
                this.ptr.active = this.target_index === this.active_row;

                this.ptr = null;

                this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());
            }

            this.row_start_index += this.n_rows_to_shift;
            this.row_end_index += this.n_rows_to_shift;

            this.y_min -= this.n_rows_to_shift * this.cell_h;
            this.y_max -= this.n_rows_to_shift * this.cell_h;
        }
    }

    applyDelta(delta, num) {
        if (delta < 0) {
            return num < 0 ? num - delta : num + delta;
        }

        return num - delta;
    }

    calculateVisibleTopRowIndex(targetY = this.next_y) {
        return this.rows[
            this.rows_ordered_by_y[
                Math.ceil(Math.abs(
                    this.applyDelta(this.y_min, targetY) / this.cell_h
                ))
            ]
        ].setIndex;
    }

    handleMoveIntent = (event) => {
        event.preventDefault();

        if (event.deltaX === 0   && event.deltaY === 0) { return; }
        if (this.y_scroll_locked && event.deltaY === 0) { return; }
        if (this.x_scroll_locked && event.deltaX === 0) { return; }

        this.delta_x = event.deltaX;

        // deltaMode 0 === pixels, 1 === lines
        this.delta_y =   event.deltaMode === 1
                       ? parseInt(event.deltaY, 10) * this.cell_h
                       : event.deltaY;

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this.next_x = this.y_scroll_locked ? this.x : this.x - this.delta_x;
        this.next_y = this.x_scroll_locked ? this.y : this.y - this.delta_y;

        if (this.next_x > 0) {
            this.next_x = 0;
        } else if (this.next_x < this.x_max) {
            this.next_x = this.x_max;
        }

        if (this.n_rows_visible >= this.c.totalRows) {
            /* negate the vertical movement, not enough rows to fill the body */
            this.next_y = this.y;
        } else if (this.next_y < this.y) {
            this.scrollDown();
        } else if (this.next_y > this.y) {
            this.scrollUp();
        }

        if (this.reset_timer) { window.clearTimeout(this.reset_timer); }

        /* reset row & wrapper Y values toward 0 to prevent overflowing */
        this.reset_timer = window.setTimeout(function resetYAxis(instance) {
            instance.reset_timer = null;

            instance.reset_delta = instance.y_min;

            /* shift all the positioning variables */
            instance.y = instance.applyDelta(instance.reset_delta, instance.y);
            instance.y_min = instance.applyDelta(instance.reset_delta, instance.y_min);
            instance.y_max = instance.applyDelta(instance.reset_delta, instance.y_max);

            /* shift all the rows */
            instance.rows_ordered_by_y.forEach((position, index) => {
                instance.rows[position].y = index * instance.cell_h;
            });

            /* shift the wrapper */
            instance.translateBody(instance.x, instance.y);

        }, 100, this);

        this.top_visible_row_index = this.calculateVisibleTopRowIndex();

        /* queue up translations and the browser will execute them as able, need to pass in the values that will change due to more handleMoveIntent invocations before this rAF eventually executes. */
        window.requestAnimationFrame(function rAF(nextX, currX, nextY, visibleTopRowIndex) {
            if (nextX === 0) {
                this.x_scroll_handle_position = 0;
            } else {
                this.x_scroll_handle_position += ((nextX - currX) / this.x_table_pixel_ratio) * -1;

                if (this.x_scroll_handle_position + this.x_scroll_handle_size > this.x_scroll_track_w) {
                    this.x_scroll_handle_position = this.x_scroll_track_w - this.x_scroll_handle_size;
                }
            }

            this.y_scroll_handle_position = visibleTopRowIndex * this.y_scrollbar_pixel_ratio;

            if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
                this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
            }

            // Do all transforms grouped together
            this.performTranslations(nextX, nextY);

        }.bind(this, this.next_x, this.x, this.next_y, this.top_visible_row_index));

        this.x = this.next_x;
        this.y = this.next_y;
    }

    handleTouchMove = (event) => {
        event.preventDefault();

        /* we handle touchmove by detecting the delta of pageX/Y and forwarding
        it to handleMoveIntent() */

        this.touch = event.touches.item(0);

        this.evt.deltaX = this.last_touch_pageX - this.touch.pageX;
        this.evt.deltaY = this.last_touch_pageY - this.touch.pageY;

        this.last_touch_pageX = this.touch.pageX;
        this.last_touch_pageY = this.touch.pageY;

        this.handleMoveIntent(this.evt);
    }

    handleTouchStart = (event) => {
        this.touch = event.touches.item(0);
        this.last_touch_pageX = this.touch.pageX;
        this.last_touch_pageY = this.touch.pageY;
    }

    handleAdvanceToXScrollTrackLocation = (event) => {
        if (this.x_scroll_locked) { return; }
        if (event.target.className !== 'ui-table-x-scroll-track') { return; }

        this.evt.deltaX = (event.pageX - this.last_pageX) * this.x_table_pixel_ratio;
        this.evt.deltaY = 0;

        this.handleMoveIntent(this.evt);

        this.last_pageX = event.pageX;
    }

    handleAdvanceToYScrollTrackLocation = (event) => {
        if (this.y_scroll_locked) { return; }
        if (event.target.className !== 'ui-table-y-scroll-track') { return; }

        this.evt.deltaX = 0;
        this.evt.deltaY = Math.floor(
            this.applyDelta(
                this.last_y_scroll_handle_y, event.pageY - this.distance_from_top
            ) / this.y_scrollbar_pixel_ratio
        ) * this.cell_h;

        this.handleMoveIntent(this.evt);
    }

    handleXScrollHandleDragStart = (event) => {
        if (event.button !== 0) { return; }

        event.preventDefault();

        this.last_pageX = event.pageX;
        this.x_scroll_locked = true;
        this.left_button_pressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this.handleDragEnd, true);
    }

    handleYScrollHandleDragStart = (event) => {
        if (event.button !== 0) { return; }

        event.preventDefault();

        /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
        this.y_scroll_offset = event.offsetY;

        this.y_scroll_locked = true;
        this.left_button_pressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this.handleDragEnd, true);
    }

    handleDragMove = (event) => {
        if (!this.left_button_pressed) { return; }

        if (this.y_scroll_locked) {
            if (this.drag_timer) { window.clearTimeout(this.drag_timer); }

            /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
            this.drag_timer = window.setTimeout(() => {
                this.drag_timer = null;

                /* Now fetch, once drag has ceased for long enough. */
                this.rows.forEach(row => {
                    if (row.data === null) {
                        row.data = this.c.getRow(row.setIndex);
                    }
                });
            }, this.c.throttleInterval);

            this.evt.deltaX = 0;
            this.evt.deltaY = Math.floor(
                this.applyDelta(
                    this.last_y_scroll_handle_y,
                    event.pageY - this.distance_from_top - this.y_scroll_offset
                ) / this.y_scrollbar_pixel_ratio
            ) * this.cell_h;

            this.handleMoveIntent(this.evt);

        } else if (this.x_scroll_locked) {
            this.evt.deltaX = (event.pageX - this.last_pageX) * this.x_table_pixel_ratio;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);

            this.last_pageX = event.pageX;

        } else if (this.column_is_resizing) {
            this.handleColumnResize(event.pageX - this.last_column_x);

            this.last_column_x = event.pageX;
        }
    }

    unlockDragToScroll() {
        this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
    }

    handleDragEnd = () => {
        window.removeEventListener('mouseup', this.handleDragEnd, true);

        this.left_button_pressed = false;

        /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
        window.setTimeout(() => this.unlockDragToScroll(), 0);
    }

    handleColumnDragStart = (event) => {
        if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this.left_button_pressed = true;

            this.last_column_x = event.pageX;

            this.column_is_resizing = findWhere(this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }

    applyNewColumnWidth(index, width) {
        this.columns[index].width = width;
        this.rows.forEach(row => {
            row.cells[index].width = width;
        });

        this.calculateXBound();
        this.initializeScrollBars();
    }

    handleColumnResize(delta) {
        if (delta === 0) { return; }

        const index = this.columns.indexOf(this.column_is_resizing);
        let adjusted_delta = delta;

        if (   adjusted_delta < 0
            && !isNaN(this.column_is_resizing.minWidth)
            && this.column_is_resizing.width + adjusted_delta < this.column_is_resizing.minWidth) {
                adjusted_delta = this.column_is_resizing.minWidth - this.column_is_resizing.width;
        } else if (!isNaN(this.column_is_resizing.maxWidth)
                   && this.column_is_resizing.width + adjusted_delta > this.column_is_resizing.maxWidth) {
            adjusted_delta = this.column_is_resizing.maxWidth - this.column_is_resizing.width;
        }

        this.applyNewColumnWidth(index, this.column_is_resizing.width + adjusted_delta);

        /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than
        the overall container, whitespace will appear regardless. */
        if (adjusted_delta < 0 && this.row_w + this.x + adjusted_delta < this.container_w) {
            this.evt.deltaX = adjusted_delta;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);
        }
    }

    handleColumnAutoExpand = (event) => {
        if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
            const mapping = event.target.parentNode.getAttribute('data-column');
            const column = findWhere(this.columns, 'mapping', mapping);
            const columnIndex = this.columns.indexOf(column);

            let width = column.width;
            let cellWidth;

            this.rows.forEach(row => {
                if (!(row.data instanceof Promise) && row.data !== null) {
                    cellWidth = row.cells[columnIndex].trueWidth();
                    width = width < cellWidth ? cellWidth : width;
                }
            }); /* find the rendered row with the longest content entry */

            this.applyNewColumnWidth(columnIndex, width);
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
        this.c.aria.innerText = text;
    }

    setActiveRow(setIndex) {
        this.active_row = setIndex;
        this.rows.forEach(row => {
            row.active = row.setIndex === setIndex;
        });
    }

    changeActiveRow(delta) {
        if (this.active_row + delta >= this.c.totalRows) { return; }

        this.next_active_row = findWhere(this.rows, 'setIndex', this.active_row + delta);

        if (this.next_active_row) {
            this.setActiveRow(this.next_active_row.setIndex);
            this.setAriaText(this.next_active_row.data[this.columns[0].mapping]);

            if (
                   (delta === -1 && this.next_active_row.y * -1 > this.y)
                || (delta === 1 && this.next_active_row.y * -1 < this.y - this.body_h + this.cell_h)
            ) { // Destination row is outside the viewport, so simulate a scroll
                this.evt.deltaX = 0;
                this.evt.deltaY = this.cell_h * delta;

                this.handleMoveIntent(this.evt);
            }
        } else if (   (delta < 0 && this.active_row > 0)
                   || (delta > 0 && this.active_row < this.c.totalRows)) {
            /* The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown in the viewport. */
            this.evt.deltaX = 0;
            this.evt.deltaY = (   (    this.row_start_index > this.active_row
                                          && this.active_row - this.row_start_index)
                                     || (    this.row_start_index < this.active_row
                                          && this.active_row - this.row_start_index)
                                     + delta) * this.cell_h;

            this.handleMoveIntent(this.evt);

            // start the process again, now that the row is available
            window.requestAnimationFrame(() => this.changeActiveRow(delta));
        }

        this.next_active_row = null;
    }

    handleKeyDown = (event) => {
        const key = event.key || this.getKeyFromKeyCode(event.keyCode);

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
            if (this.active_row !== -1) {
                const row = findWhere(this.rows, 'setIndex', this.active_row).data;

                this.setAriaText(this.columns.map(column => {
                    return `${column.title}: ${row[column.mapping]}`;
                }).join('\n'));
            }

            event.preventDefault();
            break;
        }
    }

    discoverCellAndRowNodes(target) {
        let node = target;
        const nodeMap = {};

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

    handleClick = (event) => {
        const map = this.discoverCellAndRowNodes(event.target);

        if (map.row) {
            const row = findWhere(this.rows, 'node', map.row);

            this.setActiveRow(row.setIndex);

            if (map.cell) {
                this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
            }

            this.c.rowClickFunc(event, row.setIndex);
        }
    }

    jumpToRowIndex(index) {
        this.row_start_index = index;
        this.y = 0;

        this.regenerate();

        this.top_visible_row_index = index;
        this.y_scroll_handle_position = index * this.y_scrollbar_pixel_ratio;

        if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
            this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
        }

        this.translateYScrollHandle(this.y_scroll_handle_position);

        this.setActiveRow(index);
    }
}

export default TableView;
