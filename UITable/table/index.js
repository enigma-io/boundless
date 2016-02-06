/**
 * A high-performance, infinite table view.
 * @class TableView
 */

import transformProp from '../../UIUtils/transform';
import findWhere from '../../UIUtils/findWhere';
import noop from '../../UIUtils/noop';

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

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns
            an integer value, rather than the _actual_ width. SMH. */
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

                    this._waitingForResolution = true;

                    return;
                }

                if (this._data) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                    }

                    this._waitingForResolution = false;

                    return;
                }

                for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                    this.cells[this._iterator].content = '';
                }

                this._waitingForResolution = false;
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
               && typeof column.width !== 'undefined' ? typeof column.width === 'number' : true;
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

        if (!config.columns.every(this.validateColumnShape)) {
            throw Error(`TableView was not passed valid \`columns\`. They should be objects conforming to: {
                mapping: string,
                resizable: bool,
                title: string,
                width: number,
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
    }

    processConfiguration(config) {
        this.c = {...config};

        // fallback values
        this.c.columns = this.c.columns || [];
        this.c.getRow = this.c.getRow || noop;
        this.c.rowClickFunc = this.c.rowClickFunc || noop;
        this.c.cellClickFunc = this.c.cellClickFunc || noop;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        this.validateConfiguration(this.c);
    }

    constructor(config) {
        this.processConfiguration(config);

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleMoveIntent = this.handleMoveIntent.bind(this);

        this.handleXScrollHandleDragStart = this.handleXScrollHandleDragStart.bind(this);
        this.handleYScrollHandleDragStart = this.handleYScrollHandleDragStart.bind(this);
        this.handleAdvanceToXScrollTrackLocation = this.handleAdvanceToXScrollTrackLocation.bind(this);
        this.handleAdvanceToYScrollTrackLocation = this.handleAdvanceToYScrollTrackLocation.bind(this);

        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleColumnDragStart = this.handleColumnDragStart.bind(this);
        this.handleColumnAutoExpand = this.handleColumnAutoExpand.bind(this);

        this.handleWindowResize = this.handleWindowResize.bind(this);

        this.body = this.c.body;
        this.body_s = this.body.style;
        this.header = this.c.header;
        this.header_s = this.header.style;
        this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
        this.y_scroll_handle_style = this.c['y-scroll-handle'].style;

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

        // release nodes
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
        this.n_padding_rows = 1;

        this.x = this.y = 0;
        this.next_x = this.next_y = 0;
        this.distance_from_left = this.last_pageX = this.c['x-scroll-track'].getBoundingClientRect().left + window.pageXOffset;
        this.distance_from_top = this.last_pageY = this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset;
        this.x_scroll_handle_position = this.y_scroll_handle_position = 0;

        this.active_row = -1;
        this.next_active_row = null;

        // temporary variables in various calculations
        this.iterator = null;
        this.n_rows_to_shift = null;
        this.ordered_y_array_index = null;
        this.ptr = null;
        this.shift_delta = null;
        this.target_index = null;

        this.drag_timer = null;

        this.evt = {preventDefault: noop};

        this.touch = null;
        this.last_touch_pageX = this.last_touch_pageY = 0;

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

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    }

    injectFirstRow() {
        this.emptyBody();

        this.rows.push(createRow({
            data: this.c.getRow(0),
            setIndex: 0,
            y: 0,
        }, this.columns));

        this.rows_ordered_by_y.push(0);

        this.body.appendChild(this.rows[0].node);
    }

    injectRestOfRows() {
        this.fragment = document.createDocumentFragment();

        for (this.iterator = 1; this.iterator < this.n_rows_to_render; this.iterator += 1) {
            this.rows.push(createRow({
                data: this.c.getRow(this.iterator),
                setIndex: this.iterator,
                y: this.cell_h * this.iterator,
            }, this.columns));

            this.rows_ordered_by_y.push(this.iterator);

            this.fragment.appendChild(this.rows[this.iterator].node);
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
        this.y_max = this.container_h - (this.n_rows_to_render * this.cell_h);
    } // do not run this unless rebuilding the table, does not preserve current min/max thresholds

    calculateXScrollHandleSize() {
        this.x_scroll_handle_size = this.container_w - Math.abs(this.x_max);

        if (this.x_scroll_handle_size < 12) {
            this.x_scroll_handle_size = 12;
        }

        return this.x_scroll_handle_size;
    }

    calculateYScrollHandleSize() {
        this.y_scroll_handle_size = this.container_h * (this.n_rows_to_render / this.c.totalRows);

        if (this.y_scroll_handle_size < 12) {
            this.y_scroll_handle_size = 12;
        }

        return this.y_scroll_handle_size;
    }

    initializeScrollBars() {
        this.x_scroll_track_size = this.c['x-scroll-track'].clientWidth || 500;
        this.y_scroll_track_size = this.c['y-scroll-track'].clientHeight || 150;
        this.x_scroll_handle_style.width = this.calculateXScrollHandleSize() + 'px';
        this.y_scroll_handle_style.height = this.calculateYScrollHandleSize() + 'px';

        /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
        this.x_pixel_ratio = Math.abs(this.x_max) / (this.x_scroll_track_size - this.x_scroll_handle_size);
        this.y_pixel_ratio = ((this.c.totalRows + this.n_padding_rows ) * this.cell_h - this.container_h) / (this.y_scroll_track_size - this.y_scroll_handle_size);
    }

    calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.container_h = this.c.wrapper.clientHeight || 150;
        this.container_w = this.c.wrapper.clientWidth || 500;
    }

    handleWindowResize() {
        if (this.c.wrapper.clientHeight !== this.container_h) {
            /* more rows may be needed to display the data, so we need to rebuild */
            return this.regenerate();
        }

        this.calculateContainerDimensions();
        this.calculateXBound();
        this.initializeScrollBars();
    }

    regenerate(config = this.c) {
        if (config !== this.c) {
            this.processConfiguration(config);
        }

        this.resetInternals();
        this.calculateContainerDimensions();

        this.buildColumns();
        this.injectFirstRow();
        this.calculateCellWidths();
        this.calculateCellHeight();

        this.n_rows_to_render = Math.ceil(this.container_h / this.cell_h) + this.n_padding_rows;

        if (this.n_rows_to_render > this.c.totalRows) {
            this.n_rows_to_render = this.c.totalRows;
        }

        this.row_start_index = 0;
        this.row_end_index = this.n_rows_to_render;

        this.injectHeaderCells();
        this.injectRestOfRows();

        this.calculateXBound();
        this.calculateYBound();

        this.initializeScrollBars();
    }

    scrollDown() {
        if (this.row_end_index === this.c.totalRows || this.next_y >= this.y_max) { return; }

        /* Scrolling down, so we want to move the lowest Y value to the y_max and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_max) / this.cell_h);

        if (this.n_rows_to_shift + this.row_end_index + 1 > this.c.totalRows) {
            /* more rows than there is data available, truncate */
            this.n_rows_to_shift = this.c.totalRows - this.row_end_index + 1;
        }

        if (this.n_rows_to_shift > 0) {
            if (this.n_rows_to_shift > this.n_rows_to_render) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this.shift_delta = this.n_rows_to_shift - this.n_rows_to_render;

                this.y_min -= this.shift_delta * this.cell_h;
                this.y_max -= this.shift_delta * this.cell_h;

                this.row_start_index += this.shift_delta;
                this.row_end_index += this.shift_delta;

                this.n_rows_to_shift = this.n_rows_to_render;
            }

            if (this.n_rows_to_shift > 0) {
                for (this.iterator = 0; this.iterator < this.n_rows_to_shift; this.iterator += 1) {
                    this.target_index = this.row_end_index + this.iterator;

                    /* move the lowest Y-value rows to the bottom of the ordering array */
                    this.ptr = this.rows[this.rows_ordered_by_y[0]];

                    this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                    this.ptr.setIndex = this.target_index;
                    this.ptr.y = this.target_index * this.cell_h;
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
    }

    scrollUp() {
        if (this.row_start_index === 0 || this.next_y <= this.y_min) { return; }

        /* Scrolling up, so we want to move the highest Y value to the y_min and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

        this.n_rows_to_shift = Math.ceil(
            Math.abs(this.next_y - this.y_min) / this.cell_h
        );

        if (this.row_start_index - this.n_rows_to_shift < 0) {
            this.n_rows_to_shift = this.row_start_index;
        }

        if (this.n_rows_to_shift > 0) {
            if (this.n_rows_to_shift > this.n_rows_to_render) {
                /* a very large scroll delta, calculate where the boundaries should be */
                this.shift_delta = this.n_rows_to_shift - this.n_rows_to_render;

                this.y_min += this.shift_delta * this.cell_h;
                this.y_max += this.shift_delta * this.cell_h;

                this.row_start_index -= this.shift_delta;
                this.row_end_index -= this.shift_delta;

                this.n_rows_to_shift = this.n_rows_to_render;
            }

            if (this.n_rows_to_shift > 0) {
                /* move the highest Y-value rows to the top of the ordering array */
                this.ordered_y_array_index = this.rows_ordered_by_y.length - 1;

                for (this.iterator = 0; this.iterator < this.n_rows_to_shift; this.iterator += 1) {
                    this.target_index = this.row_start_index - this.iterator - 1;

                    this.ptr = this.rows[
                        this.rows_ordered_by_y[this.ordered_y_array_index]
                    ];

                    this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                    this.ptr.setIndex = this.target_index;
                    this.ptr.y = this.target_index * this.cell_h;
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
    }

    handleTouchStart(event) {
        this.touch = event.touches.item(0);
        this.last_touch_pageX = this.touch.pageX;
        this.last_touch_pageY = this.touch.pageY;
    }

    handleTouchMove(event) {
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

    handleMoveIntent(event) {
        event.preventDefault();

        if ((event.deltaX === 0 && event.deltaY === 0)
            || this.y_scroll_locked && event.deltaY === 0
            || this.x_scroll_locked && event.deltaX === 0) {
            return;
        }

        // minimum translation should be one row height
        this.delta_x = event.deltaX;

        // deltaMode 0 === pixels, 1 === lines
        this.delta_y = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * this.cell_h : event.deltaY;

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this.next_x = this.y_scroll_locked ? 0 : this.x - this.delta_x;

        if (this.next_x > 0) {
            this.next_x = 0;
        } else if (this.next_x < this.x_max) {
            this.next_x = this.x_max;
        }

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this.next_y = this.x_scroll_locked ? 0 : this.y - this.delta_y;

        if (this.next_y < this.y) {
            this.scrollDown();
        } else if (this.next_y > this.y) {
            this.scrollUp();
        }

        if (this.next_y > 0) {
            this.next_y = 0;
        } else if (this.next_y < this.y_max) {
            this.next_y = this.y_max;
        }

        /* queue up translations and the browser will execute them as able, need to pass in the values
        that will change due to more handleMoveIntent invocations before this rAF eventually executes. */
        window.requestAnimationFrame(function rAF(nextX, currX, nextY, currY) {
            if (nextX === 0) {
                this.x_scroll_handle_position = 0;
            } else {
                this.x_scroll_handle_position += ((nextX - currX) / this.x_pixel_ratio) * -1;

                if (this.x_scroll_handle_position + this.x_scroll_handle_size > this.x_scroll_track_size) {
                    this.x_scroll_handle_position = this.x_scroll_track_size - this.x_scroll_handle_size;
                }
            }

            if (nextY === 0) {
                this.y_scroll_handle_position = 0;
            } else {
                this.y_scroll_handle_position += ((nextY - currY) / this.y_pixel_ratio) * -1;

                if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_size) {
                    this.y_scroll_handle_position = this.y_scroll_track_size - this.y_scroll_handle_size;
                }
            }

            // Do all transforms grouped together
            this.performTranslations(nextX, nextY);

            this.last_pageX = this.x_scroll_handle_position + this.distance_from_left;
            this.last_pageY = this.y_scroll_handle_position + this.distance_from_top;

        }.bind(this, this.next_x, this.x, this.next_y, this.y));

        this.x = this.next_x;
        this.y = this.next_y;
    }

    performTranslations(nextX, nextY) {
        this.header_s[transformProp] = translate3d(nextX);
        this.body_s[transformProp] = translate3d(nextX, nextY);
        this.x_scroll_handle_style[transformProp] = translate3d(this.x_scroll_handle_position);
        this.y_scroll_handle_style[transformProp] = translate3d(0, this.y_scroll_handle_position);
    }

    handleAdvanceToXScrollTrackLocation(event) {
        if (this.x_scroll_locked) { return; }
        if (event.target.className !== 'ui-table-x-scroll-track') { return; }

        this.evt.deltaX = (event.pageX - this.last_pageX) * this.x_pixel_ratio;
        this.evt.deltaY = 0;

        this.handleMoveIntent(this.evt);

        this.last_pageX = event.pageX;
    }

    handleAdvanceToYScrollTrackLocation(event) {
        if (this.y_scroll_locked) { return; }
        if (event.target.className !== 'ui-table-y-scroll-track') { return; }

        this.evt.deltaX = 0;
        this.evt.deltaY = (event.pageY - this.last_pageY) * this.y_pixel_ratio;

        this.handleMoveIntent(this.evt);

        this.last_pageY = event.pageY;
    }

    handleXScrollHandleDragStart(event) {
        if (event.button !== 0) { return; }

        event.preventDefault();

        this.last_pageX = event.pageX;
        this.x_scroll_locked = true;
        this.left_button_pressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this.handleDragEnd, true);
    }

    handleYScrollHandleDragStart(event) {
        if (event.button !== 0) { return; }

        event.preventDefault();

        this.last_pageY = event.pageY;
        this.y_scroll_locked = true;
        this.left_button_pressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this.handleDragEnd, true);
    }

    handleDragMove(event) {
        if (!this.left_button_pressed) { return; }

        if (this.y_scroll_locked) {
            if (this.drag_timer) { window.clearTimeout(this.drag_timer); }

            this.drag_timer = window.setTimeout(() => {
                this.drag_timer = null;

                /* Now fetch, once drag has ceased for long enough. */
                this.rows.forEach(row => {
                    if (row.data === null) {
                        row.data = this.c.getRow(row.setIndex);
                    }
                });
            }, this.c.throttleInterval);
        } /* x-axis doesn't need throttle protection since it doesn't cause an API fetch */

        if (this.y_scroll_locked) {
            this.evt.deltaX = 0;
            this.evt.deltaY = (event.pageY - this.last_pageY) * this.y_pixel_ratio;

            this.handleMoveIntent(this.evt);

            this.last_pageY = event.pageY;

        } else if (this.x_scroll_locked) {
            this.evt.deltaX = (event.pageX - this.last_pageX) * this.x_pixel_ratio;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);

            this.last_pageX = event.pageX;

        } else if (this.column_is_resizing) {
            this.handleColumnResize(event.pageX - this.last_column_x);

            this.last_column_x = event.pageX;
        }
    }

    handleDragEnd() {
        window.removeEventListener('mouseup', this.handleDragEnd, true);

        this.left_button_pressed = false;

        /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to
        be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
        window.setTimeout(() => {
            this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
        }, 0);
    }

    handleColumnDragStart(event) {
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
        this.rows.forEach(row => row.cells[index].width = width);

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
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
        if (adjusted_delta < 0) {
            this.evt.deltaX = adjusted_delta;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);
        }
    }

    handleColumnAutoExpand(event) {
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
        this.rows.forEach(row => row.active = row.setIndex === setIndex);
    }

    changeActiveRow(delta) {
        this.next_active_row = findWhere(this.rows, 'setIndex', this.active_row + delta);

        if (this.next_active_row) {
            this.setActiveRow(this.next_active_row.setIndex);
            this.setAriaText(this.next_active_row.data[this.columns[0].mapping]);

            if (
                   (delta === -1 && this.next_active_row.y * -1 > this.y)
                || (delta === 1 && this.next_active_row.y * -1 - this.cell_h < this.y - this.container_h + this.cell_h) // 1 unit of cellHeight is removed to compensate for the header row
            ) { // Destination row is outside the viewport, so simulate a scroll
                this.evt.deltaX = 0;
                this.evt.deltaY = this.cell_h * delta;

                this.handleMoveIntent(this.evt);
            }
        } else if (   (delta === -1 && this.active_row > 0)
                   || (delta === 1 && this.active_row < this.c.totalRows)) {
            /*
                The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                in the viewport.
             */
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

    handleKeyDown(event) {
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

    handleClick(event) {
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
}

export default TableView;
