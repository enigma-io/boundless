'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A high-performance, infinite table view.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class TableView
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _transform = require('../../UIUtils/transform');

var _transform2 = _interopRequireDefault(_transform);

var _findWhere = require('../../UIUtils/findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

var _noop = require('../../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var cellClassRegex = /\s?ui-table-cell\b/g;
var rowClassRegex = /\s?ui-table-row\b/g;

var translate3d = function translate3D() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
}; // z is never used

var reparentCellText = function reparentCellText(node, content) {
    if (node.childNodes.length && node.childNodes[0].nodeType === 3) {
        node.removeChild(node.childNodes[0]);
    }

    var text = document.createElement('div');
    text.className = 'ui-table-cell-inner';

    var textNode = document.createTextNode(content);
    text.appendChild(textNode);

    node.appendChild(text);

    return textNode;
};

var createDOMCell = function createDOMCell(content, mapping, width) {
    var cell = document.createElement('div');
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

var createDOMHeaderCell = function createDOMHeaderCell(column, width) {
    var cell = createDOMCell(column.title, column.mapping, width);
    cell.className += ' ui-table-header-cell';

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = 'ui-table-header-cell-resize-handle';

        cell.appendChild(handle);
    }

    return cell;
};

var createHeaderCell = function createHeaderCell(metadata, width) {
    var node = createDOMHeaderCell(metadata, metadata.width || width);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_metadata': metadata,
        '_title': metadata.title,
        get title() {
            return this._title;
        },
        set title(val) {
            if (val !== this._title) {
                this._title = val;

                this.node.setAttribute('title', this._title);
                this._textNode.nodeValue = this._title;
            }
        },
        '_width': metadata.width || width,
        get width() {
            return this._width;
        },
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
        node: node
    };
};

var createCell = function createCell(content, mapping, width) {
    var node = createDOMCell(content, mapping, width);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_content': content,
        get content() {
            return this._content;
        },
        set content(val) {
            if (val !== this._content) {
                this._content = val;

                this.node.setAttribute('title', this._content);
                this._textNode.nodeValue = this._content;
            }
        },
        '_width': width,
        get width() {
            return this._width;
        },
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
            var style = this.node.getAttribute('style');
            var childClasses = this.node.children[0].className;

            this.node.setAttribute('style', '');

            // take off the inner class which is what causes the sizing constraint
            this.node.children[0].className = '';

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns
            an integer value, rather than the _actual_ width. SMH. */
            var newWidth = this.node.getBoundingClientRect().width;

            // Put everything back
            this.node.setAttribute('style', style);
            this.node.children[0].className = childClasses;

            return newWidth;
        },
        node: node
    };
};

var createDOMRow = function createDOMRow(setIndex, y) {
    var row = document.createElement('div');
    row.className = 'ui-table-row';
    row.style[_transform2.default] = translate3d(0, y);

    return row;
};

var createRow = function createRow(metadata, columns) {
    /* IMPORTANT NOTE: metadata.data might be a promise. Plan accordingly. */

    var row = createDOMRow(metadata.setIndex, metadata.y);
    var cells = [];

    var fragment = document.createDocumentFragment();

    columns.forEach(function (column, index) {
        cells.push(createCell('', column.mapping, column.width));
        fragment.appendChild(cells[index].node);
    });

    row.appendChild(fragment);
    fragment = null;

    var rowObj = {
        node: row,
        cells: cells,
        '_iterator': null,
        '_active': false,
        get active() {
            return this._active;
        },
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
        get setIndex() {
            return this._setIndex;
        },
        set setIndex(val) {
            if (val !== this._setIndex) {
                if (val % 2 === 0) {
                    this.node.className = this._setIndex === null ? 'ui-table-row ui-table-row-even' : this.node.className.replace('ui-table-row-odd', 'ui-table-row-even');
                } else {
                    this.node.className = this._setIndex === null ? 'ui-table-row ui-table-row-odd' : this.node.className.replace('ui-table-row-even', 'ui-table-row-odd');
                }

                this._setIndex = val;
            }
        },
        '_data': null,
        '_waitingForResolution': false,
        set _waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                if (val && this.node.className.indexOf('ui-table-row-loading') === -1) {
                    this.node.className += ' ui-table-row-loading';
                } else if (!val && this.node.className.indexOf('ui-table-row-loading') !== -1) {
                    this.node.className = this.node.className.replace('ui-table-row-loading', '').trim();
                }
            }
        },
        get data() {
            return this._data;
        },
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
        get y() {
            return this._y;
        },
        set y(val) {
            if (val !== this._y) {
                this._y = val;
                this.node.style[_transform2.default] = translate3d(0, this._y);
            }
        }
    };

    // Setting it separately to have the classes added automatically
    rowObj.setIndex = metadata.setIndex;

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
};

var TableView = function () {
    _createClass(TableView, [{
        key: 'validateColumnShape',
        value: function validateColumnShape(column) {
            return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (typeof column.width === 'number' || typeof column.width === 'undefined');
        }
    }, {
        key: 'validateConfiguration',
        value: function validateConfiguration(config) {
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

            if (!Array.isArray(config.columns) || config.columns.length === 0 || !config.columns.every(this.validateColumnShape)) {
                throw Error('TableView was not passed valid `columns`. It should be an array with at least one object conforming to: {\n                mapping: string,\n                resizable: bool,\n                title: string,\n                width: number (optional),\n            }');
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
    }, {
        key: 'processConfiguration',
        value: function processConfiguration(config) {
            this.c = _extends({}, config);

            // fallback values
            this.c.rowClickFunc = this.c.rowClickFunc || _noop2.default;
            this.c.cellClickFunc = this.c.cellClickFunc || _noop2.default;
            this.c.throttleInterval = this.c.throttleInterval || 300;
            this.c.totalRows = this.c.totalRows || 0;

            this.validateConfiguration(this.c);
        }
    }]);

    function TableView(config) {
        _classCallCheck(this, TableView);

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
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;
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

    _createClass(TableView, [{
        key: 'destroy',
        value: function destroy() {
            var _this = this;

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
            Object.keys(this.c).forEach(function (key) {
                if (_this.c[key] instanceof HTMLElement) {
                    _this.c[key] = null;
                }
            });
        }
    }, {
        key: 'resetInternals',
        value: function resetInternals() {
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

            this.evt = { preventDefault: _noop2.default };

            this.touch = null;
            this.last_touch_pageX = this.last_touch_pageY = 0;

            this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
            this.x_scroll_handle_size = this.y_scroll_handle_size = null;

            // reset!
            this.performTranslations();
        }
    }, {
        key: 'emptyHeader',
        value: function emptyHeader() {
            this.columns.length = 0;

            while (this.header.firstChild) {
                this.header.removeChild(this.header.firstChild);
            }
        }
    }, {
        key: 'buildColumns',
        value: function buildColumns() {
            var _this2 = this;

            this.emptyHeader();

            this.c.columns.forEach(function (column) {
                return _this2.columns.push(createHeaderCell(column));
            });
        }
    }, {
        key: 'computeMinMaxHeaderCellDimensions',
        value: function computeMinMaxHeaderCellDimensions() {
            var cs = undefined;

            this.columns.forEach(function (column) {
                cs = window.getComputedStyle(column.node);

                column.minWidth = parseInt(cs['min-width'], 10);
                column.maxWidth = parseInt(cs['max-width'], 10);
            });
        }
    }, {
        key: 'injectHeaderCells',
        value: function injectHeaderCells() {
            var _this3 = this;

            this.fragment = document.createDocumentFragment();
            this.columns.forEach(function (column) {
                return _this3.fragment.appendChild(column.node);
            });

            this.header.appendChild(this.fragment);

            // must be done after they have been injected into the DOM
            this.computeMinMaxHeaderCellDimensions();

            this.fragment = null; // prevent memleak
        }
    }, {
        key: 'emptyBody',
        value: function emptyBody() {
            this.rows.length = 0;
            this.rows_ordered_by_y.length = 0;
            this.rows_ordered_by_y_length = 0;

            while (this.body.firstChild) {
                this.body.removeChild(this.body.firstChild);
            }
        }
    }, {
        key: 'injectFirstRow',
        value: function injectFirstRow() {
            this.emptyBody();

            this.rows.push(createRow({
                data: this.c.getRow(0),
                setIndex: 0,
                y: 0
            }, this.columns));

            this.rows_ordered_by_y.push(0);
            this.rows_ordered_by_y_length += 1;

            this.body.appendChild(this.rows[0].node);
        }
    }, {
        key: 'injectRestOfRows',
        value: function injectRestOfRows() {
            this.fragment = document.createDocumentFragment();

            for (this.i = 1; this.i < this.n_rows_to_render; this.i += 1) {
                this.rows.push(createRow({
                    data: this.c.getRow(this.i),
                    setIndex: this.i,
                    y: this.cell_h * this.i
                }, this.columns));

                this.rows_ordered_by_y.push(this.i);
                this.rows_ordered_by_y_length += 1;

                this.fragment.appendChild(this.rows[this.i].node);
            }

            this.body.appendChild(this.fragment);
            this.fragment = null; // prevent memleak
        }
    }, {
        key: 'calculateCellHeight',
        value: function calculateCellHeight() {
            this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
        }
    }, {
        key: 'calculateCellWidths',
        value: function calculateCellWidths() {
            var _this4 = this;

            this.rows[0].cells.forEach(function (cell, index) {
                _this4.columns[index].width = _this4.columns[index].width || cell.node.getBoundingClientRect().width;
                cell.width = _this4.columns[index].width;
            });
        }
    }, {
        key: 'calculateXBound',
        value: function calculateXBound() {
            this.row_w = this.rows[0].node.clientWidth || 500;
            this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
        }
    }, {
        key: 'calculateYBound',
        value: function calculateYBound() {
            this.y_min = 0;
            this.y_max = this.container_h - this.n_rows_to_render * this.cell_h;
            this.y_max = this.y_max > 0 ? 0 : this.y_max;
        }
    }, {
        key: 'calculateXScrollHandleSize',
        value: function calculateXScrollHandleSize() {
            this.x_scroll_handle_size = this.container_w - Math.abs(this.x_max);

            if (this.x_scroll_handle_size < 12) {
                this.x_scroll_handle_size = 12;
            }

            return this.x_scroll_handle_size;
        }
    }, {
        key: 'calculateYScrollHandleSize',
        value: function calculateYScrollHandleSize() {
            this.y_scroll_handle_size = this.container_h * (this.n_rows_to_render / this.c.totalRows);

            if (this.y_scroll_handle_size < 12) {
                this.y_scroll_handle_size = 12;
            }

            return this.y_scroll_handle_size;
        }
    }, {
        key: 'initializeScrollBars',
        value: function initializeScrollBars() {
            this.x_scroll_track_w = this.c['x-scroll-track'].clientWidth || 500;
            this.x_scroll_track_h = this.c['x-scroll-track'].clientHeight || 8;
            this.y_scroll_track_h = this.c['y-scroll-track'].clientHeight || 150;
            this.x_scroll_handle_style.width = this.calculateXScrollHandleSize() + 'px';
            this.y_scroll_handle_style.height = this.calculateYScrollHandleSize() + 'px';

            /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
            this.x_table_pixel_ratio = Math.abs(this.x_max) / (this.x_scroll_track_w - this.x_scroll_handle_size);

            /* how many scrollbar pixels === one row? */
            this.y_scrollbar_pixel_ratio = (this.y_scroll_track_h - this.y_scroll_handle_size) / (this.c.totalRows - this.n_rows_to_render + this.n_padding_rows);

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
    }, {
        key: 'calculateContainerDimensions',
        value: function calculateContainerDimensions() {
            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */
            this.container_h = this.c.wrapper.clientHeight || 150;
            this.container_w = this.c.wrapper.clientWidth || 500;
        }
    }, {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
            if (this.c.wrapper.clientHeight !== this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return this.regenerate();
            }

            this.calculateContainerDimensions();
            this.calculateXBound();
            this.initializeScrollBars();
        }
    }, {
        key: 'regenerate',
        value: function regenerate() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? this.c : arguments[0];

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
            this.row_end_index = this.n_rows_to_render - 1;

            this.injectHeaderCells();
            this.injectRestOfRows();

            this.calculateXBound();
            this.calculateYBound();

            this.initializeScrollBars();
        }
    }, {
        key: 'translateHeader',
        value: function translateHeader(x) {
            if (x !== this.last_header_x) {
                this.header_style[_transform2.default] = translate3d(x);
                this.last_header_x = x;
            }
        }
    }, {
        key: 'translateBody',
        value: function translateBody(x, y) {
            if (x !== this.last_body_x || y !== this.last_body_y) {
                this.body_style[_transform2.default] = translate3d(x, y);
                this.last_body_x = x;
                this.last_body_y = y;
            }
        }
    }, {
        key: 'translateXScrollHandle',
        value: function translateXScrollHandle(x) {
            if (x !== this.last_x_scroll_handle_x) {
                this.x_scroll_handle_style[_transform2.default] = translate3d(x);
                this.last_x_scroll_handle_x = x;
            }
        }
    }, {
        key: 'translateYScrollHandle',
        value: function translateYScrollHandle(y) {
            if (y !== this.last_y_scroll_handle_y) {
                this.y_scroll_handle_style[_transform2.default] = translate3d(0, y);
                this.last_y_scroll_handle_y = y;
            }
        }
    }, {
        key: 'performTranslations',
        value: function performTranslations(nextX, nextY) {
            this.translateHeader(nextX);
            this.translateBody(nextX, nextY);
            this.translateXScrollHandle(this.x_scroll_handle_position);
            this.translateYScrollHandle(this.y_scroll_handle_position);
        }
    }, {
        key: 'scrollUp',
        value: function scrollUp() {
            /* at the logical start of the table (row index 0) we truncate upward scroll attempts
               to the upper translation boundary to keep from skipping off into nothingness */

            if (this.row_start_index === 0 && this.next_y > this.y_min) {
                this.next_y = this.y_min;

                return;
            }

            if (this.row_start_index === 0 || this.next_y <= this.y_min) {
                return;
            }

            /* Scrolling up, so we want to move the row in the visual bottom position to the top
               (above the lip of the view) */

            this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_min) / this.cell_h);

            /* prevent under-rotating below index zero, the logical start of a data set */
            if (this.row_start_index - this.n_rows_to_shift < 0) {
                this.next_y -= Math.abs(this.row_start_index - this.n_rows_to_shift) * this.cell_h;
                this.n_rows_to_shift = this.row_start_index;
            }

            if (this.n_rows_to_shift > 0) {
                if (this.n_rows_to_shift > this.n_rows_to_render) {
                    /* when the total movement ends up being larger than the set of rows already rendered, we can safely decrement the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                    this.shift_delta = this.n_rows_to_shift - this.n_rows_to_render;

                    this.row_start_index -= this.shift_delta;
                    this.row_end_index -= this.shift_delta;

                    /* accomodate for the number of pixels that will not be rendered */
                    this.next_y -= this.shift_delta * this.cell_h;

                    this.n_rows_to_shift = this.n_rows_to_render;
                }

                /* move the highest Y-value rows to the top of the ordering array */
                this.ordered_y_array_index = this.rows_ordered_by_y.length - 1;

                for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                    this.target_index = this.row_start_index - this.iterator;

                    this.ptr = this.rows[this.rows_ordered_by_y[this.ordered_y_array_index]];

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
    }, {
        key: 'scrollDown',
        value: function scrollDown() {
            /* at the logical end of the table (row index n) we truncate any scroll attempts
               to the lower translation boundary to keep from skipping off into nothingness */
            if (this.row_end_index >= this.c.totalRows && this.next_y <= this.y_max) {
                /* only adjust for the x-axis scrollbar height if the wrapper can be translated far enough for it to potentially obscure a row */
                this.next_y = (this.n_rows_to_render - this.n_padding_rows) * this.cell_h > this.container_h ? this.y_max - (this.x_scroll_track_hidden ? 0 : this.x_scroll_track_h) : this.y_max;

                return;
            }

            if (this.next_y >= this.y_max) {
                return;
            }

            /* Scrolling down, so we want to move the row in the visual top position to the bottom
               (below the lip of the view) */

            this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_max) / this.cell_h);

            if (this.n_rows_to_shift + this.row_end_index > this.c.totalRows) {
                /* more rows than there is data available, truncate */
                this.next_y += (this.n_rows_to_shift - (this.c.totalRows - this.row_end_index)) * this.cell_h;
                this.n_rows_to_shift = this.c.totalRows - this.row_end_index;
            }

            if (this.n_rows_to_shift > 0) {
                if (this.n_rows_to_shift > this.n_rows_to_render) {
                    /* when the total movement ends up being larger than the set of rows already rendered, we can safely increment the "viewable" row range accordingly and
                    the next step where the content is substituted will automatically insert
                    the next logical row into its place */

                    this.shift_delta = this.n_rows_to_shift - this.n_rows_to_render;

                    this.row_start_index += this.shift_delta;
                    this.row_end_index += this.shift_delta;

                    /* accomodate for the number of pixels that will not be rendered */
                    this.next_y += this.shift_delta * this.cell_h;

                    this.n_rows_to_shift = this.n_rows_to_render;
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
    }, {
        key: 'applyShiftDelta',
        value: function applyShiftDelta(shiftDelta, otherValue) {
            if (shiftDelta < 0) {
                return otherValue < 0 ? otherValue - shiftDelta : otherValue + shiftDelta;
            }

            return otherValue < 0 ? otherValue + shiftDelta : otherValue - shiftDelta;
        }
    }, {
        key: 'handleMoveIntent',
        value: function handleMoveIntent(event) {
            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0 || this.y_scroll_locked && event.deltaY === 0 || this.x_scroll_locked && event.deltaX === 0) {
                return;
            }

            this.delta_x = event.deltaX;

            // deltaMode 0 === pixels, 1 === lines
            this.delta_y = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * this.cell_h : event.deltaY;

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            this.next_x = this.y_scroll_locked ? this.x : this.x - this.delta_x;

            if (this.next_x > 0) {
                this.next_x = 0;
            } else if (this.next_x < this.x_max) {
                this.next_x = this.x_max;
            }

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            this.next_y = this.x_scroll_locked ? this.y : this.y - this.delta_y;

            if (this.next_y < this.y) {
                this.scrollDown();
            } else if (this.next_y > this.y) {
                this.scrollUp();
            }

            this.top_visible_row_index = this.rows[this.rows_ordered_by_y[Math.floor(Math.abs(this.applyShiftDelta(this.y_min, this.next_y) / this.cell_h))]].setIndex;

            if (this.reset_timer) {
                window.clearTimeout(this.reset_timer);
            }

            this.reset_timer = window.setTimeout(function resetYAxis(instance) {
                instance.reset_timer = null;

                /* reset row & wrapper Y values toward 0 to prevent overflowing */
                instance.shift_delta = instance.y_min;

                /* shift all the positioning variables */
                instance.y = instance.applyShiftDelta(instance.shift_delta, instance.y);
                instance.y_min = instance.applyShiftDelta(instance.shift_delta, instance.y_min);
                instance.y_max = instance.applyShiftDelta(instance.shift_delta, instance.y_max);

                /* shift all the rows */
                instance.rows_ordered_by_y.forEach(function (position, index) {
                    instance.rows[position].y = index * instance.cell_h;
                });

                /* shift the wrapper */
                instance.translateBody(instance.x, instance.y);
            }, 100, this);

            /* queue up translations and the browser will execute them as able, need to pass in the values
            that will change due to more handleMoveIntent invocations before this rAF eventually executes. */
            window.requestAnimationFrame(function rAF(nextX, currX, nextY, visibleTopRowIndex) {
                if (nextX === 0) {
                    this.x_scroll_handle_position = 0;
                } else {
                    this.x_scroll_handle_position += (nextX - currX) / this.x_table_pixel_ratio * -1;

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
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(event) {
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
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(event) {
            this.touch = event.touches.item(0);
            this.last_touch_pageX = this.touch.pageX;
            this.last_touch_pageY = this.touch.pageY;
        }
    }, {
        key: 'handleAdvanceToXScrollTrackLocation',
        value: function handleAdvanceToXScrollTrackLocation(event) {
            if (this.x_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-x-scroll-track') {
                return;
            }

            this.evt.deltaX = (event.pageX - this.last_pageX) * this.x_table_pixel_ratio;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);

            this.last_pageX = event.pageX;
        }
    }, {
        key: 'handleAdvanceToYScrollTrackLocation',
        value: function handleAdvanceToYScrollTrackLocation(event) {
            if (this.y_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-y-scroll-track') {
                return;
            }

            this.evt.deltaX = 0;

            /* calculated delta from current starting row to destination starting row */
            this.evt.deltaY = (Math.ceil((event.pageY - this.distance_from_top) / this.y_scrollbar_pixel_ratio) - this.row_start_index) * this.cell_h;

            this.handleMoveIntent(this.evt);
        }
    }, {
        key: 'handleXScrollHandleDragStart',
        value: function handleXScrollHandleDragStart(event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            this.last_pageX = event.pageX;
            this.x_scroll_locked = true;
            this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }, {
        key: 'handleYScrollHandleDragStart',
        value: function handleYScrollHandleDragStart(event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
            this.y_scroll_offset = event.offsetY;

            this.y_scroll_locked = true;
            this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }, {
        key: 'handleDragMove',
        value: function handleDragMove(event) {
            var _this5 = this;

            if (!this.left_button_pressed) {
                return;
            }

            if (this.y_scroll_locked) {
                if (this.drag_timer) {
                    window.clearTimeout(this.drag_timer);
                }

                /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
                this.drag_timer = window.setTimeout(function () {
                    _this5.drag_timer = null;

                    /* Now fetch, once drag has ceased for long enough. */
                    _this5.rows.forEach(function (row) {
                        if (row.data === null) {
                            row.data = _this5.c.getRow(row.setIndex);
                        }
                    });
                }, this.c.throttleInterval);

                this.evt.deltaX = 0;
                this.evt.deltaY = ((event.pageY - this.distance_from_top - this.y_scroll_offset) / this.y_scrollbar_pixel_ratio - this.row_start_index) * this.cell_h;

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
    }, {
        key: 'unlockDragToScroll',
        value: function unlockDragToScroll() {
            this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            var _this6 = this;

            window.removeEventListener('mouseup', this.handleDragEnd, true);

            this.left_button_pressed = false;

            /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
            window.setTimeout(function () {
                return _this6.unlockDragToScroll();
            }, 0);
        }
    }, {
        key: 'handleColumnDragStart',
        value: function handleColumnDragStart(event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                this.left_button_pressed = true;

                this.last_column_x = event.pageX;

                this.column_is_resizing = (0, _findWhere2.default)(this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'applyNewColumnWidth',
        value: function applyNewColumnWidth(index, width) {
            this.columns[index].width = width;
            this.rows.forEach(function (row) {
                return row.cells[index].width = width;
            });

            this.calculateXBound();
            this.initializeScrollBars();
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            if (delta === 0) {
                return;
            }

            var index = this.columns.indexOf(this.column_is_resizing);
            var adjusted_delta = delta;

            if (adjusted_delta < 0 && !isNaN(this.column_is_resizing.minWidth) && this.column_is_resizing.width + adjusted_delta < this.column_is_resizing.minWidth) {
                adjusted_delta = this.column_is_resizing.minWidth - this.column_is_resizing.width;
            } else if (!isNaN(this.column_is_resizing.maxWidth) && this.column_is_resizing.width + adjusted_delta > this.column_is_resizing.maxWidth) {
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
    }, {
        key: 'handleColumnAutoExpand',
        value: function handleColumnAutoExpand(event) {
            var _this7 = this;

            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this7.columns, 'mapping', mapping);
                    var columnIndex = _this7.columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = undefined;

                    _this7.rows.forEach(function (row) {
                        if (!(row.data instanceof Promise) && row.data !== null) {
                            cellWidth = row.cells[columnIndex].trueWidth();
                            width = width < cellWidth ? cellWidth : width;
                        }
                    }); /* find the rendered row with the longest content entry */

                    _this7.applyNewColumnWidth(columnIndex, width);
                })();
            }
        }
    }, {
        key: 'getKeyFromKeyCode',
        value: function getKeyFromKeyCode(code) {
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
    }, {
        key: 'setAriaText',
        value: function setAriaText(text) {
            this.c.aria.innerText = text;
        }
    }, {
        key: 'setActiveRow',
        value: function setActiveRow(setIndex) {
            this.active_row = setIndex;
            this.rows.forEach(function (row) {
                return row.active = row.setIndex === setIndex;
            });
        }
    }, {
        key: 'changeActiveRow',
        value: function changeActiveRow(delta) {
            var _this8 = this;

            if (this.active_row + delta >= this.c.totalRows) {
                return;
            }

            this.next_active_row = (0, _findWhere2.default)(this.rows, 'setIndex', this.active_row + delta);

            if (this.next_active_row) {
                this.setActiveRow(this.next_active_row.setIndex);
                this.setAriaText(this.next_active_row.data[this.columns[0].mapping]);

                if (delta === -1 && this.next_active_row.y * -1 > this.y || delta === 1 && this.next_active_row.y * -1 - this.cell_h < this.y - this.container_h + this.cell_h // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this.evt.deltaX = 0;
                        this.evt.deltaY = this.cell_h * delta;

                        this.handleMoveIntent(this.evt);
                    }
            } else if (delta === -1 && this.active_row > 0 || delta === 1 && this.active_row < this.c.totalRows) {
                /*
                    The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                    in the viewport.
                 */
                this.evt.deltaX = 0;
                this.evt.deltaY = (this.row_start_index > this.active_row && this.active_row - this.row_start_index || (this.row_start_index < this.active_row && this.active_row - this.row_start_index) + delta) * this.cell_h;

                this.handleMoveIntent(this.evt);

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this8.changeActiveRow(delta);
                });
            }

            this.next_active_row = null;
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var _this9 = this;

            var key = event.key || this.getKeyFromKeyCode(event.keyCode);

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
                        (function () {
                            var row = (0, _findWhere2.default)(_this9.rows, 'setIndex', _this9.active_row).data;

                            _this9.setAriaText(_this9.columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;
            }
        }
    }, {
        key: 'discoverCellAndRowNodes',
        value: function discoverCellAndRowNodes(target) {
            var node = target;
            var nodeMap = {};

            if (node.className.match(rowClassRegex)) {
                return { row: node };
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
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            var map = this.discoverCellAndRowNodes(event.target);

            if (map.row) {
                var row = (0, _findWhere2.default)(this.rows, 'node', map.row);

                this.setActiveRow(row.setIndex);

                if (map.cell) {
                    this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                this.c.rowClickFunc(event, row.setIndex);
            }
        }
    }]);

    return TableView;
}();

exports.default = TableView;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVGFibGUvdGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ0EsSUFBTSxpQkFBaUIscUJBQWpCO0FBQ04sSUFBTSxnQkFBZ0Isb0JBQWhCOztBQUVOLElBQU0sY0FBYyxTQUFTLFdBQVQsR0FBbUM7UUFBZCwwREFBSSxpQkFBVTtRQUFQLDBEQUFJLGlCQUFHOztBQUNuRCxXQUFPLGlCQUFpQixDQUFqQixHQUFxQixNQUFyQixHQUE4QixDQUE5QixHQUFrQyxVQUFsQyxDQUQ0QztDQUFuQzs7QUFJcEIsSUFBTSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQyxPQUFoQyxFQUF5QztBQUM5RCxRQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsS0FBZ0MsQ0FBaEMsRUFBbUM7QUFDN0QsYUFBSyxXQUFMLENBQWlCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQixFQUQ2RDtLQUFqRTs7QUFJQSxRQUFNLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVAsQ0FMd0Q7QUFNeEQsU0FBSyxTQUFMLEdBQWlCLHFCQUFqQixDQU53RDs7QUFROUQsUUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFYLENBUndEO0FBU3hELFNBQUssV0FBTCxDQUFpQixRQUFqQixFQVR3RDs7QUFXOUQsU0FBSyxXQUFMLENBQWlCLElBQWpCLEVBWDhEOztBQWE5RCxXQUFPLFFBQVAsQ0FiOEQ7Q0FBekM7O0FBZ0J6QixJQUFNLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsT0FBaEMsRUFBeUMsS0FBekMsRUFBZ0Q7QUFDbEUsUUFBTSxPQUFPLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFQLENBRDREO0FBRTVELFNB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O2lCQUFkOztBQUlBLHFCQUFLLENBQUwsQ0FBTyxZQUFQLENBQW9CLEtBQXBCLEVBQTJCLElBQUksUUFBSixDQUEzQixDQVRTO2FBQWI7Ozs7V0FsL0JGOzs7a0JBZ2dDUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFRhYmxlVmlld1xuICovXG5cbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uLy4uL1VJVXRpbHMvdHJhbnNmb3JtJztcbmltcG9ydCBmaW5kV2hlcmUgZnJvbSAnLi4vLi4vVUlVdGlscy9maW5kV2hlcmUnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vLi4vVUlVdGlscy9ub29wJztcblxuLyoqXG4gKiBGT1IgRlVUVVJFIEVZRVNcbiAqXG4gKiBTY3JvbGwgcGVyZm9ybWFuY2UgaXMgYSB0cmlja3kgYmVhc3QgLS0gbW9yZXNvIHdoZW4gdHJ5aW5nIHRvIG1haW50YWluIDUwKyBGUFMgYW5kIHB1bXBpbmcgYSBsb3Qgb2YgZGF0YVxuICogdG8gdGhlIERPTS4gVGhlcmUgYXJlIGEgbG90IG9mIGNob2ljZXMgaW4gdGhpcyBjb21wb25lbnQgdGhhdCBtYXkgc2VlbSBvZGQgYXQgZmlyc3QgYmx1c2gsIGJ1dCBsZXQgaXRcbiAqIGJlIGtub3duIHRoYXQgd2UgdHJpZWQgdG8gZG8gaXQgdGhlIFJlYWN0IFdheeKEoiBhbmQgaXQgd2FzIG5vdCBwZXJmb3JtYW50IGVub3VnaC5cbiAqXG4gKiBUaGUgY29tYmluYXRpb24gdGhhdCB3YXMgc2V0dGxlZCB1cG9uIGlzIGEgUmVhY3Qgc2hlbGwgd2l0aCBuYXRpdmUgRE9NIGd1dHMuIFRoaXMgY29tYmluYXRpb24geWllbGRzIHRoZVxuICogYmVzdCBwZXJmb3JtYW5jZSwgd2hpbGUgc3RpbGwgYmVpbmcgcGVyZmVjdGx5IGludGVyb3BlcmFibGUgd2l0aCB0aGUgcmVzdCBvZiBVSUtpdCBhbmQgUmVhY3QgdXNlIGNhc2VzLlxuICpcbiAqIF9fSW1wb3J0YW50IE5vdGVfX1xuICpcbiAqIEFueSB0aW1lIHlvdSBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCwgbWFrZSBzdXJlIHlvdSByZWxlYXNlIGl0IGFmdGVyIGJ5IHNldHRpbmcgaXRzIHZhcmlhYmxlIHRvIGBudWxsYC5cbiAqIElmIHlvdSBkb24ndCwgaXQnbGwgY3JlYXRlIGEgbWVtb3J5IGxlYWsuIEFsc28sIG1ha2Ugc3VyZSBhbGwgZ2VuZXJhdGVkIERPTSBpcyByZW1vdmVkIG9uIGNvbXBvbmVudFdpbGxVbm1vdW50LlxuICovXG5cbi8qKlxuICogT1JERVIgT0YgT1BFUkFUSU9OU1xuICpcbiAqIDEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4gKiAyLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuICogMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG4gKlxuICogSWYgdGhlIGNvbXBvbmVudCB1cGRhdGVzIGR1ZSB0byBuZXcgcHJvcHMsIGp1c3QgYmxvdyBhd2F5IGV2ZXJ5dGhpbmcgYW5kIHN0YXJ0IG92ZXIuIEl0J3MgY2hlYXBlciB0aGFuXG4gKiB0cnlpbmcgdG8gZGlmZi5cbiAqL1xuXG5jb25zdCBjZWxsQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtY2VsbFxcYi9nO1xuY29uc3Qgcm93Q2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93XFxiL2c7XG5cbmNvbnN0IHRyYW5zbGF0ZTNkID0gZnVuY3Rpb24gdHJhbnNsYXRlM0QoeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDBweCknO1xufTsgLy8geiBpcyBuZXZlciB1c2VkXG5cbmNvbnN0IHJlcGFyZW50Q2VsbFRleHQgPSBmdW5jdGlvbiByZXBhcmVudENlbGxUZXh0KG5vZGUsIGNvbnRlbnQpIHtcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAmJiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsLWlubmVyJztcblxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgICAgdGV4dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG5cbiAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIHRleHROb2RlO1xufTtcblxuY29uc3QgY3JlYXRlRE9NQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbCc7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgY29udGVudCk7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJywgbWFwcGluZyk7XG4gICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XG5cbiAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgcmVwYXJlbnRDZWxsVGV4dChjZWxsLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUhlYWRlckNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01IZWFkZXJDZWxsKGNvbHVtbiwgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gY3JlYXRlRE9NQ2VsbChjb2x1bW4udGl0bGUsIGNvbHVtbi5tYXBwaW5nLCB3aWR0aCk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAoY29sdW1uLnJlc2l6YWJsZSkge1xuICAgICAgICBjb25zdCBoYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJztcblxuICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVIZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlSGVhZGVyQ2VsbChtZXRhZGF0YSwgd2lkdGgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NSGVhZGVyQ2VsbChtZXRhZGF0YSwgbWV0YWRhdGEud2lkdGggfHwgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19tZXRhZGF0YSc6IG1ldGFkYXRhLFxuICAgICAgICAnX3RpdGxlJzogbWV0YWRhdGEudGl0bGUsXG4gICAgICAgIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9LFxuICAgICAgICBzZXQgdGl0bGUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl90aXRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fdGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiBtZXRhZGF0YS53aWR0aCB8fCB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1hcHBpbmc6IG1ldGFkYXRhLm1hcHBpbmcsXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVDZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19jb250ZW50JzogY29udGVudCxcbiAgICAgICAgZ2V0IGNvbnRlbnQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50OyB9LFxuICAgICAgICBzZXQgY29udGVudCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl9jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRydWVXaWR0aDogZnVuY3Rpb24gdHJ1ZVdpZHRoKCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDbGFzc2VzID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIHRha2Ugb2ZmIHRoZSBpbm5lciBjbGFzcyB3aGljaCBpcyB3aGF0IGNhdXNlcyB0aGUgc2l6aW5nIGNvbnN0cmFpbnRcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSAnJztcblxuICAgICAgICAgICAgLyogQ2FwdHVyZSB0aGUgbmV3IGFkanVzdGVkIHNpemUsIGhhdmUgdG8gdXNlIHRoZSBoYXJkIHdheSBiZWNhdXNlIC5jbGllbnRXaWR0aCByZXR1cm5zXG4gICAgICAgICAgICBhbiBpbnRlZ2VyIHZhbHVlLCByYXRoZXIgdGhhbiB0aGUgX2FjdHVhbF8gd2lkdGguIFNNSC4gKi9cbiAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoID0gdGhpcy5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAgICAgICAvLyBQdXQgZXZlcnl0aGluZyBiYWNrXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSBjaGlsZENsYXNzZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdXaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuY29uc3QgY3JlYXRlRE9NUm93ID0gZnVuY3Rpb24gY3JlYXRlRE9NUm93KHNldEluZGV4LCB5KSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcm93LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1yb3cnO1xuICAgICAgICAgIHJvdy5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuXG4gICAgcmV0dXJuIHJvdztcbn07XG5cbmNvbnN0IGNyZWF0ZVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZVJvdyhtZXRhZGF0YSwgY29sdW1ucykge1xuICAgIC8qIElNUE9SVEFOVCBOT1RFOiBtZXRhZGF0YS5kYXRhIG1pZ2h0IGJlIGEgcHJvbWlzZS4gUGxhbiBhY2NvcmRpbmdseS4gKi9cblxuICAgIGNvbnN0IHJvdyA9IGNyZWF0ZURPTVJvdyhtZXRhZGF0YS5zZXRJbmRleCwgbWV0YWRhdGEueSk7XG4gICAgY29uc3QgY2VsbHMgPSBbXTtcblxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICBjZWxscy5wdXNoKGNyZWF0ZUNlbGwoJycsIGNvbHVtbi5tYXBwaW5nLCBjb2x1bW4ud2lkdGgpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbHNbaW5kZXhdLm5vZGUpO1xuICAgIH0pO1xuXG4gICAgcm93LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICBmcmFnbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCByb3dPYmogPSB7XG4gICAgICAgIG5vZGU6IHJvdyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICAnX2l0ZXJhdG9yJzogbnVsbCxcbiAgICAgICAgJ19hY3RpdmUnOiBmYWxzZSxcbiAgICAgICAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfSxcbiAgICAgICAgc2V0IGFjdGl2ZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19zZXRJbmRleCc6IG51bGwsXG4gICAgICAgIGdldCBzZXRJbmRleCgpIHsgcmV0dXJuIHRoaXMuX3NldEluZGV4OyB9LFxuICAgICAgICBzZXQgc2V0SW5kZXgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zZXRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LWV2ZW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LW9kZCcsICd1aS10YWJsZS1yb3ctZXZlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LW9kZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctZXZlbicsICd1aS10YWJsZS1yb3ctb2RkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfZGF0YSc6IG51bGwsXG4gICAgICAgICdfd2FpdGluZ0ZvclJlc29sdXRpb24nOiBmYWxzZSxcbiAgICAgICAgc2V0IF93YWl0aW5nRm9yUmVzb2x1dGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWxvYWRpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWxvYWRpbmcnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlIHx8IHRoaXMuX2RhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHJlc29sdmVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzb2x2ZWRWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW2NvbHVtbnNbdGhpcy5faXRlcmF0b3JdLm1hcHBpbmddO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfeSc6IG1ldGFkYXRhLnksXG4gICAgICAgIGdldCB5KCkgeyByZXR1cm4gdGhpcy5feTsgfSxcbiAgICAgICAgc2V0IHkodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB0aGlzLl95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHRvIGhhdmUgdGhlIGNsYXNzZXMgYWRkZWQgYXV0b21hdGljYWxseVxuICAgIHJvd09iai5zZXRJbmRleCA9IG1ldGFkYXRhLnNldEluZGV4O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHNvIHRoZSBQcm9taXNlIGhhbmRsaW5nIGNhbiB0YWtlIHBsYWNlIGlmIG5lZWRlZC4uLlxuICAgIHJvd09iai5kYXRhID0gbWV0YWRhdGEuZGF0YTtcblxuICAgIHJldHVybiByb3dPYmo7XG59O1xuXG5jbGFzcyBUYWJsZVZpZXcge1xuICAgIHZhbGlkYXRlQ29sdW1uU2hhcGUoY29sdW1uKSB7XG4gICAgICAgIHJldHVybiAgICB0eXBlb2YgY29sdW1uLm1hcHBpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnJlc2l6YWJsZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnRpdGxlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgJiYgKHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICdudW1iZXInIHx8IHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICd1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIGlmICghKGNvbmZpZy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHdyYXBwZXJgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcuaGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGhlYWRlcmAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy5ib2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGJvZHlgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWdbJ3gtc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWdbJ3ktc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWdbJ3gtc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneS1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLmFyaWEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYXJpYWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICAhQXJyYXkuaXNBcnJheShjb25maWcuY29sdW1ucylcbiAgICAgICAgICAgIHx8IGNvbmZpZy5jb2x1bW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgfHwgIWNvbmZpZy5jb2x1bW5zLmV2ZXJ5KHRoaXMudmFsaWRhdGVDb2x1bW5TaGFwZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgdmFsaWQgXFxgY29sdW1uc1xcYC4gSXQgc2hvdWxkIGJlIGFuIGFycmF5IHdpdGggYXQgbGVhc3Qgb25lIG9iamVjdCBjb25mb3JtaW5nIHRvOiB7XG4gICAgICAgICAgICAgICAgbWFwcGluZzogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBudW1iZXIgKG9wdGlvbmFsKSxcbiAgICAgICAgICAgIH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRocm90dGxlSW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRocm90dGxlSW50ZXJ2YWxgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50b3RhbFJvd3MgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRvdGFsUm93c2A7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmdldFJvdyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBnZXRSb3dgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJvd0NsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGByb3dDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmNlbGxDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY2VsbENsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIHRoaXMuYyA9IHsuLi5jb25maWd9O1xuXG4gICAgICAgIC8vIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jID0gdGhpcy5jLnJvd0NsaWNrRnVuYyB8fCBub29wO1xuICAgICAgICB0aGlzLmMuY2VsbENsaWNrRnVuYyA9IHRoaXMuYy5jZWxsQ2xpY2tGdW5jIHx8IG5vb3A7XG4gICAgICAgIHRoaXMuYy50aHJvdHRsZUludGVydmFsID0gdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgfHwgMzAwO1xuICAgICAgICB0aGlzLmMudG90YWxSb3dzID0gdGhpcy5jLnRvdGFsUm93cyB8fCAwO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGVDb25maWd1cmF0aW9uKHRoaXMuYyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKTtcblxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVRvdWNoU3RhcnQgPSB0aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVUb3VjaE1vdmUgPSB0aGlzLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQgPSB0aGlzLmhhbmRsZU1vdmVJbnRlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24gPSB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24gPSB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnTW92ZSA9IHRoaXMuaGFuZGxlRHJhZ01vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnRW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5BdXRvRXhwYW5kID0gdGhpcy5oYW5kbGVDb2x1bW5BdXRvRXhwYW5kLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUgPSB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYm9keSA9IHRoaXMuYy5ib2R5O1xuICAgICAgICB0aGlzLmJvZHlfc3R5bGUgPSB0aGlzLmJvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5jLmhlYWRlcjtcbiAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGUgPSB0aGlzLmhlYWRlci5zdHlsZTtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcblxuICAgICAgICB0aGlzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5oYW5kbGVDb2x1bW5BdXRvRXhwYW5kKTtcblxuICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcblxuICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5oYW5kbGVDb2x1bW5BdXRvRXhwYW5kKTtcblxuICAgICAgICB0aGlzLmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG5cbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIC8vIHJlbGVhc2Ugbm9kZXNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jW2tleV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY1trZXldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXRJbnRlcm5hbHMoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLnJvd3MgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeSA9IFtdO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubl9wYWRkaW5nX3Jvd3MgPSAzO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy5uZXh0X3kgPSAwO1xuICAgICAgICB0aGlzLmRpc3RhbmNlX2Zyb21fbGVmdCA9IHRoaXMubGFzdF9wYWdlWCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gLTE7XG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuaSA9IG51bGw7XG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRpb24gY2FjaGVzXG4gICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfYm9keV95ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZXZ0ID0ge3ByZXZlbnREZWZhdWx0OiBub29wfTtcblxuICAgICAgICB0aGlzLnRvdWNoID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gMDtcblxuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggPSBudWxsO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQhXG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpO1xuICAgIH1cblxuICAgIGVtcHR5SGVhZGVyKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlQ2hpbGQodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZENvbHVtbnMoKSB7XG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcblxuICAgICAgICB0aGlzLmMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLmNvbHVtbnMucHVzaChjcmVhdGVIZWFkZXJDZWxsKGNvbHVtbikpKTtcbiAgICB9XG5cbiAgICBjb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKSB7XG4gICAgICAgIGxldCBjcztcblxuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb2x1bW4ubm9kZSk7XG5cbiAgICAgICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHBhcnNlSW50KGNzWydtaW4td2lkdGgnXSwgMTApO1xuICAgICAgICAgICAgY29sdW1uLm1heFdpZHRoID0gcGFyc2VJbnQoY3NbJ21heC13aWR0aCddLCAxMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluamVjdEhlYWRlckNlbGxzKCkge1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5mcmFnbWVudC5hcHBlbmRDaGlsZChjb2x1bW4ubm9kZSkpO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnQpO1xuXG4gICAgICAgIC8vIG11c3QgYmUgZG9uZSBhZnRlciB0aGV5IGhhdmUgYmVlbiBpbmplY3RlZCBpbnRvIHRoZSBET01cbiAgICAgICAgdGhpcy5jb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgZW1wdHlCb2R5KCkge1xuICAgICAgICB0aGlzLnJvd3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5qZWN0Rmlyc3RSb3coKSB7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3coMCksXG4gICAgICAgICAgICBzZXRJbmRleDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCgwKTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yb3dzWzBdLm5vZGUpO1xuICAgIH1cblxuICAgIGluamVjdFJlc3RPZlJvd3MoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLmkgPSAxOyB0aGlzLmkgPCB0aGlzLm5fcm93c190b19yZW5kZXI7IHRoaXMuaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5pKSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5pLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbF9oICogdGhpcy5pLFxuICAgICAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLmkpO1xuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbdGhpcy5pXS5ub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMuY2VsbF9oID0gdGhpcy5yb3dzWzBdLmNlbGxzWzBdLm5vZGUuY2xpZW50SGVpZ2h0IHx8IDQwO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxXaWR0aHMoKSB7XG4gICAgICAgIHRoaXMucm93c1swXS5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggfHwgY2VsbC5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY2VsbC53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5yb3dfdyA9IHRoaXMucm93c1swXS5ub2RlLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy54X21heCA9IHRoaXMuY29udGFpbmVyX3cgPD0gdGhpcy5yb3dfdyA/IHRoaXMuY29udGFpbmVyX3cgLSB0aGlzLnJvd193IDogMDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZQm91bmQoKSB7XG4gICAgICAgIHRoaXMueV9taW4gPSAwO1xuICAgICAgICB0aGlzLnlfbWF4ID0gdGhpcy5jb250YWluZXJfaCAtIHRoaXMubl9yb3dzX3RvX3JlbmRlciAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB0aGlzLnlfbWF4ID0gdGhpcy55X21heCA+IDAgPyAwIDogdGhpcy55X21heDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMuY29udGFpbmVyX3cgLSBNYXRoLmFicyh0aGlzLnhfbWF4KTtcblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMuY29udGFpbmVyX2ggKiAodGhpcy5uX3Jvd3NfdG9fcmVuZGVyIC8gdGhpcy5jLnRvdGFsUm93cyk7XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgODtcbiAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlLndpZHRoID0gdGhpcy5jYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcblxuICAgICAgICAvKiB0b3RhbCB0cmFuc2xhdGFibGUgc3BhY2UgLyBzY3JvbGxiYXIgdHJhY2sgc2l6ZSA9IHJlbGF0aXZlIHZhbHVlIG9mIGEgc2Nyb2xsYmFyIHBpeGVsICovXG4gICAgICAgIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyA9IE1hdGguYWJzKHRoaXMueF9tYXgpIC8gKHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUpO1xuXG4gICAgICAgIC8qIGhvdyBtYW55IHNjcm9sbGJhciBwaXhlbHMgPT09IG9uZSByb3c/ICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW8gPSAodGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSkgLyAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMubl9yb3dzX3RvX3JlbmRlciArIHRoaXMubl9wYWRkaW5nX3Jvd3MpO1xuXG4gICAgICAgIC8qIGhpZGUgdGhlIHNjcm9sbGJhcnMgaWYgdGhleSBhcmUgbm90IG5lZWRlZCAqL1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLmNvbnRhaW5lcl93KSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl9oID0gdGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0IHx8IDE1MDtcbiAgICAgICAgdGhpcy5jb250YWluZXJfdyA9IHRoaXMuYy53cmFwcGVyLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICB9XG5cbiAgICBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgIT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSB0aGlzLmMpIHsgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpOyB9XG5cbiAgICAgICAgdGhpcy5yZXNldEludGVybmFscygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmJ1aWxkQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmluamVjdEZpcnN0Um93KCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbFdpZHRocygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxIZWlnaHQoKTtcblxuICAgICAgICB0aGlzLm5fcm93c190b19yZW5kZXIgPSBNYXRoLmNlaWwodGhpcy5jb250YWluZXJfaCAvIHRoaXMuY2VsbF9oKSArIHRoaXMubl9wYWRkaW5nX3Jvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3JlbmRlciA+IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3JlbmRlciA9IHRoaXMuYy50b3RhbFJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCA9IDA7XG4gICAgICAgIHRoaXMucm93X2VuZF9pbmRleCA9IHRoaXMubl9yb3dzX3RvX3JlbmRlciAtIDE7XG5cbiAgICAgICAgdGhpcy5pbmplY3RIZWFkZXJDZWxscygpO1xuICAgICAgICB0aGlzLmluamVjdFJlc3RPZlJvd3MoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVlCb3VuZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGVIZWFkZXIoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2hlYWRlcl94KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZUJvZHkoeCwgeSkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2JvZHlfeCB8fCB5ICE9PSB0aGlzLmxhc3RfYm9keV95KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSB4O1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHgpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHkpIHtcbiAgICAgICAgaWYgKHkgIT09IHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwZXJmb3JtVHJhbnNsYXRpb25zKG5leHRYLCBuZXh0WSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZUhlYWRlcihuZXh0WCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlQm9keShuZXh0WCwgbmV4dFkpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVhTY3JvbGxIYW5kbGUodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgIH1cblxuICAgIHNjcm9sbFVwKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBzdGFydCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCAwKSB3ZSB0cnVuY2F0ZSB1cHdhcmQgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSB1cHBlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgJiYgdGhpcy5uZXh0X3kgPiB0aGlzLnlfbWluKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9taW47XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCB8fCB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWluKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCBib3R0b20gcG9zaXRpb24gdG8gdGhlIHRvcFxuICAgICAgICAgICAoYWJvdmUgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21pbikgLyB0aGlzLmNlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIC8qIHByZXZlbnQgdW5kZXItcm90YXRpbmcgYmVsb3cgaW5kZXggemVybywgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgYSBkYXRhIHNldCAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95IC09IE1hdGguYWJzKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfdG9fcmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogd2hlbiB0aGUgdG90YWwgbW92ZW1lbnQgZW5kcyB1cCBiZWluZyBsYXJnZXIgdGhhbiB0aGUgc2V0IG9mIHJvd3MgYWxyZWFkeSByZW5kZXJlZCwgd2UgY2FuIHNhZmVseSBkZWNyZW1lbnQgdGhlIFwidmlld2FibGVcIiByb3cgcmFuZ2UgYWNjb3JkaW5nbHkgYW5kIHRoZSBuZXh0IHN0ZXAgd2hlcmUgdGhlIGNvbnRlbnQgaXMgc3Vic3RpdHV0ZWQgd2lsbCBhdXRvbWF0aWNhbGx5IGluc2VydCB0aGUgbmV4dCBsb2dpY2FsIHJvdyBpbnRvIGl0cyBwbGFjZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gdGhpcy5uX3Jvd3NfdG9fcmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3RvX3JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMub3JkZXJlZF95X2FycmF5X2luZGV4XVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXS55IC0gdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kudW5zaGlmdCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnBvcCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcm9sbERvd24oKSB7XG4gICAgICAgIC8qIGF0IHRoZSBsb2dpY2FsIGVuZCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCBuKSB3ZSB0cnVuY2F0ZSBhbnkgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSBsb3dlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X2VuZF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzICYmIHRoaXMubmV4dF95IDw9IHRoaXMueV9tYXgpIHtcbiAgICAgICAgICAgIC8qIG9ubHkgYWRqdXN0IGZvciB0aGUgeC1heGlzIHNjcm9sbGJhciBoZWlnaHQgaWYgdGhlIHdyYXBwZXIgY2FuIGJlIHRyYW5zbGF0ZWQgZmFyIGVub3VnaCBmb3IgaXQgdG8gcG90ZW50aWFsbHkgb2JzY3VyZSBhIHJvdyAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSAgICh0aGlzLm5fcm93c190b19yZW5kZXIgLSB0aGlzLm5fcGFkZGluZ19yb3dzKSAqIHRoaXMuY2VsbF9oID4gdGhpcy5jb250YWluZXJfaFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMueV9tYXggLSAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPyAwIDogdGhpcy54X3Njcm9sbF90cmFja19oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMueV9tYXg7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5leHRfeSA+PSB0aGlzLnlfbWF4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIHRvcCBwb3NpdGlvbiB0byB0aGUgYm90dG9tXG4gICAgICAgICAgIChiZWxvdyB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWF4KSAvIHRoaXMuY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ICsgdGhpcy5yb3dfZW5kX2luZGV4ID4gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIHRoYW4gdGhlcmUgaXMgZGF0YSBhdmFpbGFibGUsIHRydW5jYXRlICovXG4gICAgICAgICAgICB0aGlzLm5leHRfeSArPSAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCkpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c190b19yZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGluY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmRcbiAgICAgICAgICAgICAgICB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnRcbiAgICAgICAgICAgICAgICB0aGUgbmV4dCBsb2dpY2FsIHJvdyBpbnRvIGl0cyBwbGFjZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gdGhpcy5uX3Jvd3NfdG9fcmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3RvX3JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh0aGlzLml0ZXJhdG9yID0gMTsgdGhpcy5pdGVyYXRvciA8PSB0aGlzLm5fcm93c190b19zaGlmdDsgdGhpcy5pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSB0aGlzLnJvd19lbmRfaW5kZXggKyB0aGlzLml0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgLyogdGhlIHBhZGRpbmcgcm93cyB3aWxsIGV4Y2VlZCB0aGUgbWF4aW11bSBpbmRleCBmb3IgYSBkYXRhIHNldCBvbmNlIHRoZSB1c2VyIGhhcyBmdWxseSB0cmFuc2xhdGVkIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbiAqL1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyLmRhdGEgPSB0aGlzLmRyYWdfdGltZXIgPyBudWxsIDogdGhpcy5jLmdldFJvdyh0aGlzLnRhcmdldF9pbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuc2V0SW5kZXggPSB0aGlzLnRhcmdldF9pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci55ID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggLSAxXV0ueSArIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLmFjdGl2ZSA9IHRoaXMudGFyZ2V0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5yb3dzX29yZGVyZWRfYnlfeS5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5U2hpZnREZWx0YShzaGlmdERlbHRhLCBvdGhlclZhbHVlKSB7XG4gICAgICAgIGlmIChzaGlmdERlbHRhIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG90aGVyVmFsdWUgPCAwID8gb3RoZXJWYWx1ZSAtIHNoaWZ0RGVsdGEgOiBvdGhlclZhbHVlICsgc2hpZnREZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdGhlclZhbHVlIDwgMCA/IG90aGVyVmFsdWUgKyBzaGlmdERlbHRhIDogb3RoZXJWYWx1ZSAtIHNoaWZ0RGVsdGE7XG4gICAgfVxuXG4gICAgaGFuZGxlTW92ZUludGVudChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgoZXZlbnQuZGVsdGFYID09PSAwICYmIGV2ZW50LmRlbHRhWSA9PT0gMClcbiAgICAgICAgICAgIHx8IHRoaXMueV9zY3JvbGxfbG9ja2VkICYmIGV2ZW50LmRlbHRhWSA9PT0gMFxuICAgICAgICAgICAgfHwgdGhpcy54X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlbHRhX3ggPSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgLy8gZGVsdGFNb2RlIDAgPT09IHBpeGVscywgMSA9PT0gbGluZXNcbiAgICAgICAgdGhpcy5kZWx0YV95ID0gICBldmVudC5kZWx0YU1vZGUgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChldmVudC5kZWx0YVksIDEwKSAqIHRoaXMuY2VsbF9oXG4gICAgICAgICAgICAgICAgICAgICAgIDogZXZlbnQuZGVsdGFZO1xuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID8gdGhpcy54IDogdGhpcy54IC0gdGhpcy5kZWx0YV94O1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfeCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeCA8IHRoaXMueF9tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy54X21heDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueF9zY3JvbGxfbG9ja2VkID8gdGhpcy55IDogdGhpcy55IC0gdGhpcy5kZWx0YV95O1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfeSA8IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxEb3duKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPiB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeVtcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5U2hpZnREZWx0YSh0aGlzLnlfbWluLCB0aGlzLm5leHRfeSkgLyB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICBdXG4gICAgICAgIF0uc2V0SW5kZXg7XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlc2V0X3RpbWVyKTsgfVxuXG4gICAgICAgIHRoaXMucmVzZXRfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiByZXNldFlBeGlzKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF90aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIC8qIHJlc2V0IHJvdyAmIHdyYXBwZXIgWSB2YWx1ZXMgdG93YXJkIDAgdG8gcHJldmVudCBvdmVyZmxvd2luZyAqL1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2hpZnRfZGVsdGEgPSBpbnN0YW5jZS55X21pbjtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSBwb3NpdGlvbmluZyB2YXJpYWJsZXMgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnkgPSBpbnN0YW5jZS5hcHBseVNoaWZ0RGVsdGEoaW5zdGFuY2Uuc2hpZnRfZGVsdGEsIGluc3RhbmNlLnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9taW4gPSBpbnN0YW5jZS5hcHBseVNoaWZ0RGVsdGEoaW5zdGFuY2Uuc2hpZnRfZGVsdGEsIGluc3RhbmNlLnlfbWluKTtcbiAgICAgICAgICAgIGluc3RhbmNlLnlfbWF4ID0gaW5zdGFuY2UuYXBwbHlTaGlmdERlbHRhKGluc3RhbmNlLnNoaWZ0X2RlbHRhLCBpbnN0YW5jZS55X21heCk7XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IGFsbCB0aGUgcm93cyAqL1xuICAgICAgICAgICAgaW5zdGFuY2Uucm93c19vcmRlcmVkX2J5X3kuZm9yRWFjaCgocG9zaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uucm93c1twb3NpdGlvbl0ueSA9IGluZGV4ICogaW5zdGFuY2UuY2VsbF9oO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IHRoZSB3cmFwcGVyICovXG4gICAgICAgICAgICBpbnN0YW5jZS50cmFuc2xhdGVCb2R5KGluc3RhbmNlLngsIGluc3RhbmNlLnkpO1xuXG4gICAgICAgIH0sIDEwMCwgdGhpcyk7XG5cbiAgICAgICAgLyogcXVldWUgdXAgdHJhbnNsYXRpb25zIGFuZCB0aGUgYnJvd3NlciB3aWxsIGV4ZWN1dGUgdGhlbSBhcyBhYmxlLCBuZWVkIHRvIHBhc3MgaW4gdGhlIHZhbHVlc1xuICAgICAgICB0aGF0IHdpbGwgY2hhbmdlIGR1ZSB0byBtb3JlIGhhbmRsZU1vdmVJbnRlbnQgaW52b2NhdGlvbnMgYmVmb3JlIHRoaXMgckFGIGV2ZW50dWFsbHkgZXhlY3V0ZXMuICovXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gckFGKG5leHRYLCBjdXJyWCwgbmV4dFksIHZpc2libGVUb3BSb3dJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArPSAoKG5leHRYIC0gY3VyclgpIC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvKSAqIC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHZpc2libGVUb3BSb3dJbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucyhuZXh0WCwgbmV4dFkpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLm5leHRfeCwgdGhpcy54LCB0aGlzLm5leHRfeSwgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXgpKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLm5leHRfeDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5uZXh0X3k7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogd2UgaGFuZGxlIHRvdWNobW92ZSBieSBkZXRlY3RpbmcgdGhlIGRlbHRhIG9mIHBhZ2VYL1kgYW5kIGZvcndhcmRpbmdcbiAgICAgICAgaXQgdG8gaGFuZGxlTW92ZUludGVudCgpICovXG5cbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVggLSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgLSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuXG4gICAgICAgIC8qIGNhbGN1bGF0ZWQgZGVsdGEgZnJvbSBjdXJyZW50IHN0YXJ0aW5nIHJvdyB0byBkZXN0aW5hdGlvbiBzdGFydGluZyByb3cgKi9cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gKE1hdGguY2VpbCgoZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW8pIC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogYWRqdXN0cyBmb3IgdGhlIHBpeGVsIGRpc3RhbmNlIGJldHdlZW4gd2hlcmUgdGhlIGhhbmRsZSBpcyBjbGlja2VkIGFuZCB0aGUgdG9wIGVkZ2Ugb2YgaXQ7IHRoZSBoYW5kbGUgaXMgcG9zaXRpb25lZCBhY2NvcmRpbmcgdG8gaXRzIHRvcCBlZGdlICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxfb2Zmc2V0ID0gZXZlbnQub2Zmc2V0WTtcblxuICAgICAgICB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubGVmdF9idXR0b25fcHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRyYWdfdGltZXIpOyB9XG5cbiAgICAgICAgICAgIC8qIHgtYXhpcyBkb2Vzbid0IG5lZWQgdGhyb3R0bGUgcHJvdGVjdGlvbiBzaW5jZSBpdCBkb2Vzbid0IGNhdXNlIGEgcm93IGZldGNoICovXG4gICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEgPSB0aGlzLmMuZ2V0Um93KHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuYy50aHJvdHRsZUludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9ICgoKGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCAtIHRoaXMueV9zY3JvbGxfb2Zmc2V0KSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW8pIC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X3BhZ2VYKSAqIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbztcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uUmVzaXplKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X2NvbHVtbl94KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxvY2tEcmFnVG9TY3JvbGwoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfbG9ja2VkID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdFbmQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcblxuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSBmYWxzZTtcblxuICAgICAgICAvKiB0aGUgYnJvd3NlciBmaXJlcyB0aGUgbW91c2V1cCBhbmQgY2xpY2sgZXZlbnRzIHNpbXVsdGFuZW91c2x5LCBhbmQgd2UgZG9uJ3Qgd2FudCBvdXIgY2xpY2sgaGFuZGxlciB0byBiZSBleGVjdXRlZCwgc28gYSB6ZXJvLWRlbGF5IHNldFRpbWVvdXQgd29ya3MgaGVyZSB0byBsZXQgdGhlIHN0YWNrIGNsZWFyIGJlZm9yZSBhbGxvd2luZyBjbGljayBldmVudHMgYWdhaW4uICovXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMudW5sb2NrRHJhZ1RvU2Nyb2xsKCksIDApO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgICAgIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmluZFdoZXJlKHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHdpZHRoKSB7XG4gICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHJvdy5jZWxsc1tpbmRleF0ud2lkdGggPSB3aWR0aCk7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtblJlc2l6ZShkZWx0YSkge1xuICAgICAgICBpZiAoZGVsdGEgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZih0aGlzLmNvbHVtbl9pc19yZXNpemluZyk7XG4gICAgICAgIGxldCBhZGp1c3RlZF9kZWx0YSA9IGRlbHRhO1xuXG4gICAgICAgIGlmICggICBhZGp1c3RlZF9kZWx0YSA8IDBcbiAgICAgICAgICAgICYmICFpc05hTih0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aClcbiAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPCB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGFkanVzdGVkX2RlbHRhID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGggLSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGgpXG4gICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSA+IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKSB7XG4gICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEpO1xuXG4gICAgICAgIC8qIElmIGEgY29sdW1uIHNocmlua3MsIHRoZSB3cmFwcGVyIFggdHJhbnNsYXRpb24gbmVlZHMgdG8gYmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkgb3JcbiAgICAgICAgd2UnbGwgc2VlIHVud2FudGVkIHdoaXRlc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGUuIElmIHRoZSB0YWJsZSB3aWR0aCBiZWNvbWVzIHNtYWxsZXIgdGhhbiB0aGUgb3ZlcmFsbCBjb250YWluZXIsIHdoaXRlc3BhY2Ugd2lsbCBhcHBlYXIgcmVnYXJkbGVzcy4gKi9cbiAgICAgICAgaWYgKGFkanVzdGVkX2RlbHRhIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gYWRqdXN0ZWRfZGVsdGE7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uQXV0b0V4cGFuZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZpbmRXaGVyZSh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgbWFwcGluZyk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbHVtbik7XG5cbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGNvbHVtbi53aWR0aDtcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGg7XG5cbiAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEocm93LmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSAmJiByb3cuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdLnRydWVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoIDwgY2VsbFdpZHRoID8gY2VsbFdpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8qIGZpbmQgdGhlIHJlbmRlcmVkIHJvdyB3aXRoIHRoZSBsb25nZXN0IGNvbnRlbnQgZW50cnkgKi9cblxuICAgICAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRLZXlGcm9tS2V5Q29kZShjb2RlKSB7XG4gICAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd0Rvd24nO1xuXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93VXAnO1xuXG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICByZXR1cm4gJ0VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldEFyaWFUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy5jLmFyaWEuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVSb3coc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSBzZXRJbmRleCk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlUm93KGRlbHRhKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSA+PSB0aGlzLmMudG90YWxSb3dzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93ICsgZGVsdGEpO1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfYWN0aXZlX3Jvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3codGhpcy5uZXh0X2FjdGl2ZV9yb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLm5leHRfYWN0aXZlX3Jvdy5kYXRhW3RoaXMuY29sdW1uc1swXS5tYXBwaW5nXSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAoZGVsdGEgPT09IC0xICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA+IHRoaXMueSlcbiAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5uZXh0X2FjdGl2ZV9yb3cueSAqIC0xIC0gdGhpcy5jZWxsX2ggPCB0aGlzLnkgLSB0aGlzLmNvbnRhaW5lcl9oICsgdGhpcy5jZWxsX2gpIC8vIDEgdW5pdCBvZiBjZWxsSGVpZ2h0IGlzIHJlbW92ZWQgdG8gY29tcGVuc2F0ZSBmb3IgdGhlIGhlYWRlciByb3dcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmNlbGxfaCAqIGRlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPT09IC0xICYmIHRoaXMuYWN0aXZlX3JvdyA+IDApXG4gICAgICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuYWN0aXZlX3JvdyA8IHRoaXMuYy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93blxuICAgICAgICAgICAgICAgIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9ICggICAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID4gdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IDwgdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleSB8fCB0aGlzLmdldEtleUZyb21LZXlDb2RlKGV2ZW50LmtleUNvZGUpO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5jb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29sdW1uLnRpdGxlfTogJHtyb3dbY29sdW1uLm1hcHBpbmddfWA7XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGNvbnN0IG5vZGVNYXAgPSB7fTtcblxuICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7cm93OiBub2RlfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICgoIW5vZGVNYXAuY2VsbCB8fCAhbm9kZU1hcC5yb3cpICYmIG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChjZWxsQ2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLmNlbGwgPSBub2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAucm93ID0gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlTWFwO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZGlzY292ZXJDZWxsQW5kUm93Tm9kZXMoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICBpZiAobWFwLnJvdykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ25vZGUnLCBtYXAucm93KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3cocm93LnNldEluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG1hcC5jZWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLmNlbGxDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jLnJvd0NsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVWaWV3O1xuIl19