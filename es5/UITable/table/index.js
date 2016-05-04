'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _transformProperty = require('../../UIUtils/transformProperty');

var _transformProperty2 = _interopRequireDefault(_transformProperty);

var _findWhere = require('../../UIUtils/findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

var _noop = require('../../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * A high-performance, infinite table view.
                                                                                                                                                           * @class TableView
                                                                                                                                                           */

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

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns an integer value, rather than the _actual_ width. SMH. */
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
    row.style[_transformProperty2.default] = translate3d(0, y);

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

                this.node.setAttribute('data-index', val);

                this._setIndex = val;
            }
        },
        '_waitingForResolution': false,
        get waitingForResolution() {
            return this._waitingForResolution;
        },
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
        get data() {
            return this._data;
        },
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
        get y() {
            return this._y;
        },
        set y(val) {
            if (val !== this._y) {
                this._y = val;
                this.node.style[_transformProperty2.default] = translate3d(0, this._y);
            }
        }
    };

    // Setting it separately to have the classes added automatically
    rowObj.setIndex = metadata.setIndex;
    rowObj.active = metadata.active;

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
};

var TableView = function () {
    TableView.prototype.validateColumnShape = function validateColumnShape(column) {
        return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
    };

    TableView.prototype.validateConfiguration = function validateConfiguration(config) {
        // x-scroll-track, y-scroll-track, x-scroll-handle, y-scroll-handle, and aria are not required in static_mode
        if (config.static_mode !== undefined && typeof config.static_mode !== 'boolean') {
            throw Error('TableView was not passed a valid `static_mode`; it should be a boolean.');
        }

        if (!(config.wrapper instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `wrapper` element.');
        }

        if (!(config.header instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `header` element.');
        }

        if (!(config.body instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `body` element.');
        }

        if (!config.static_mode && !(config['x-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-track` element.');
        }

        if (!config.static_mode && !(config['y-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-track` element.');
        }

        if (!config.static_mode && !(config['x-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-handle` element.');
        }

        if (!config.static_mode && !(config['y-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-handle` element.');
        }

        if (!config.static_mode && !(config.aria instanceof HTMLElement)) {
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

        if (config.rowClickFunc !== undefined && typeof config.rowClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `rowClickFunc`; it should be a function.');
        }

        if (config.cellClickFunc !== undefined && typeof config.cellClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `cellClickFunc`; it should be a function.');
        }

        if (config.columnResizeFunc !== undefined && typeof config.columnResizeFunc !== 'function') {
            throw Error('TableView was not passed a valid `columnResizeFunc`; it should be a function.');
        }

        if (typeof config.preserveScrollState !== 'boolean') {
            throw Error('TableView was not passed a valid `preserveScrollState`; it should be a boolean.');
        }
    };

    TableView.prototype.processConfiguration = function processConfiguration(config) {
        this.c = _extends({}, config);

        // fallback values
        this.c.preserveScrollState = this.c.preserveScrollState === undefined ? true : this.c.preserveScrollState;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        this.validateConfiguration(this.c);
    };

    function TableView(config) {
        var _this = this;

        _classCallCheck(this, TableView);

        this.handleWindowResize = function () {
            if (_this.c.wrapper.clientHeight !== _this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return _this.regenerate();
            }

            _this.calculateContainerDimensions();
            _this.calculateXBound();
            _this.initializeScrollBars();
        };

        this.handleMoveIntent = function (event) {
            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0) {
                return;
            }
            if (_this.y_scroll_locked && event.deltaY === 0) {
                return;
            }
            if (_this.x_scroll_locked && event.deltaX === 0) {
                return;
            }

            _this.delta_x = event.deltaX;

            // deltaMode 0 === pixels, 1 === lines
            _this.delta_y = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * _this.cell_h : event.deltaY;

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            _this.next_x = _this.y_scroll_locked ? _this.x : _this.x - _this.delta_x;
            _this.next_y = _this.x_scroll_locked ? _this.y : _this.y - _this.delta_y;

            if (_this.next_x > 0) {
                _this.next_x = 0;
            } else if (_this.next_x < _this.x_max) {
                _this.next_x = _this.x_max;
            }

            if (_this.n_rows_visible >= _this.c.totalRows) {
                /* negate the vertical movement, not enough rows to fill the body */
                _this.next_y = _this.y;
            } else if (_this.next_y < _this.y) {
                _this.scrollDown();
            } else if (_this.next_y > _this.y) {
                _this.scrollUp();
            }

            if (_this.reset_timer) {
                window.clearTimeout(_this.reset_timer);
            }

            /* reset row & wrapper Y values toward 0 to prevent overflowing */
            _this.reset_timer = window.setTimeout(function resetYAxis(instance) {
                instance.reset_timer = null;

                instance.reset_delta = instance.y_min;

                /* shift all the positioning variables */
                instance.y = instance.applyDelta(instance.reset_delta, instance.y);
                instance.y_min = instance.applyDelta(instance.reset_delta, instance.y_min);
                instance.y_max = instance.applyDelta(instance.reset_delta, instance.y_max);

                /* shift all the rows */
                instance.rows_ordered_by_y.forEach(function (position, index) {
                    instance.rows[position].y = index * instance.cell_h;
                });

                /* shift the wrapper */
                instance.translateBody(instance.x, instance.y);
            }, 100, _this);

            _this.top_visible_row_index = _this.calculateVisibleTopRowIndex();

            /* queue up translations and the browser will execute them as able, need to pass in the values that will change due to more handleMoveIntent invocations before this rAF eventually executes. */
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
            }.bind(_this, _this.next_x, _this.x, _this.next_y, _this.top_visible_row_index));

            _this.x = _this.next_x;
            _this.y = _this.next_y;
        };

        this.handleTouchMove = function (event) {
            event.preventDefault();

            /* we handle touchmove by detecting the delta of pageX/Y and forwarding
            it to handleMoveIntent() */

            _this.touch = event.touches.item(0);

            _this.evt.deltaX = _this.last_touch_pageX - _this.touch.pageX;
            _this.evt.deltaY = _this.last_touch_pageY - _this.touch.pageY;

            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;

            _this.handleMoveIntent(_this.evt);
        };

        this.handleTouchStart = function (event) {
            _this.touch = event.touches.item(0);
            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;
        };

        this.handleAdvanceToXScrollTrackLocation = function (event) {
            if (_this.x_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-x-scroll-track') {
                return;
            }

            _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
            _this.evt.deltaY = 0;

            _this.handleMoveIntent(_this.evt);

            _this.last_pageX = event.pageX;
        };

        this.handleAdvanceToYScrollTrackLocation = function (event) {
            if (_this.y_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-y-scroll-track') {
                return;
            }

            _this.evt.deltaX = 0;
            _this.evt.deltaY = Math.floor(_this.applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

            _this.handleMoveIntent(_this.evt);
        };

        this.handleXScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            _this.last_pageX = event.pageX;
            _this.x_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this.handleDragEnd, true);
        };

        this.handleYScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
            _this.y_scroll_offset = event.offsetY;

            _this.y_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this.handleDragEnd, true);
        };

        this.handleDragMove = function (event) {
            if (!_this.left_button_pressed) {
                return;
            }

            if (_this.y_scroll_locked) {
                if (_this.drag_timer) {
                    window.clearTimeout(_this.drag_timer);
                }

                /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
                _this.drag_timer = window.setTimeout(function () {
                    _this.drag_timer = null;

                    /* Now fetch, once drag has ceased for long enough. */
                    _this.rows.forEach(function (row) {
                        if (row.data === null) {
                            row.data = _this.c.getRow(row.setIndex);
                        }
                    });
                }, _this.c.throttleInterval);

                _this.evt.deltaX = 0;
                _this.evt.deltaY = Math.floor(_this.applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top - _this.y_scroll_offset) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

                _this.handleMoveIntent(_this.evt);
            } else if (_this.x_scroll_locked) {
                _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
                _this.evt.deltaY = 0;

                _this.handleMoveIntent(_this.evt);

                _this.last_pageX = event.pageX;
            } else if (_this.column_is_resizing) {
                _this.handleColumnResize(event.pageX - _this.last_column_x);

                _this.last_column_x = event.pageX;
            }
        };

        this.handleDragEnd = function () {
            window.removeEventListener('mouseup', _this.handleDragEnd, true);

            _this.left_button_pressed = false;

            /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
            window.setTimeout(function () {
                return _this.unlockDragToScroll();
            }, 0);
        };

        this.handleColumnDragStart = function (event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                _this.left_button_pressed = true;

                _this.last_column_x = event.pageX;

                _this.column_is_resizing = (0, _findWhere2.default)(_this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', _this.handleDragEnd, true);
            }
        };

        this.handleColumnAutoExpand = function (event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this.columns, 'mapping', mapping);
                    var columnIndex = _this.columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = void 0;

                    _this.rows.forEach(function (row) {
                        if (!(row.data instanceof Promise) && row.data !== null) {
                            cellWidth = row.cells[columnIndex].trueWidth();
                            width = width < cellWidth ? cellWidth : width;
                        }
                    }); /* find the rendered row with the longest content entry */

                    _this.applyNewColumnWidth(columnIndex, width);
                })();
            }
        };

        this.handleKeyDown = function (event) {
            var key = event.key || _this.getKeyFromKeyCode(event.keyCode);

            switch (key) {
                case 'ArrowDown':
                    _this.changeActiveRow(1);
                    event.preventDefault();
                    break;

                case 'ArrowUp':
                    _this.changeActiveRow(-1);
                    event.preventDefault();
                    break;

                case 'Enter':
                    if (_this.active_row !== -1) {
                        (function () {
                            var row = (0, _findWhere2.default)(_this.rows, 'setIndex', _this.active_row).data;

                            _this.setAriaText(_this.columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;
            }
        };

        this.handleClick = function (event) {
            var map = _this.discoverCellAndRowNodes(event.target);

            if (map.row) {
                var row = (0, _findWhere2.default)(_this.rows, 'node', map.row);

                _this.setActiveRow(row.setIndex);

                if (map.cell && _this.c.cellClickFunc) {
                    _this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                if (_this.c.rowClickFunc) {
                    _this.c.rowClickFunc(event, row.setIndex);
                }
            }
        };

        this.processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;

        if (!this.c.static_mode) {
            this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
            this.y_scroll_handle_style = this.c['y-scroll-handle'].style;
        }

        this.resetInternals();
        this.resetActiveRow();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__row_start_index = null;

        this.regenerate();

        if (!this.c.static_mode) {
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
    }

    TableView.prototype.destroy = function destroy() {
        var _this2 = this;

        if (!this.c.static_mode) {
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
        }

        this.emptyHeader();
        this.emptyBody();

        // release cached DOM nodes
        Object.keys(this.c).forEach(function (key) {
            if (_this2.c[key] instanceof HTMLElement) {
                _this2.c[key] = null;
            }
        });
    };

    TableView.prototype.resetActiveRow = function resetActiveRow() {
        this.active_row = -1;
        this.next_active_row = null;
    };

    TableView.prototype.resetInternals = function resetInternals() {
        this.columns = [];
        this.rows = [];
        this.rows_ordered_by_y = [];
        this.rows_ordered_by_y_length = 0;
        this.n_padding_rows = 3;

        this.x = this.y = 0;
        this.next_x = this.next_y = 0;

        this.distance_from_top = this.c['y-scroll-track'] ? this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset : null;

        this.x_scroll_handle_position = this.y_scroll_handle_position = 0;

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

        this.evt = { preventDefault: _noop2.default };

        this.touch = null;
        this.last_touch_pageX = this.last_touch_pageY = 0;

        this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
        this.x_scroll_handle_size = this.y_scroll_handle_size = null;

        // reset!
        this.performTranslations();
    };

    TableView.prototype.emptyHeader = function emptyHeader() {
        this.columns.length = 0;

        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    };

    TableView.prototype.buildColumns = function buildColumns() {
        var _this3 = this;

        this.emptyHeader();

        this.c.columns.forEach(function (column) {
            return _this3.columns.push(createHeaderCell(column));
        });
    };

    TableView.prototype.computeMinMaxHeaderCellDimensions = function computeMinMaxHeaderCellDimensions() {
        var cs = void 0;

        this.columns.forEach(function (column) {
            cs = window.getComputedStyle(column.node);

            column.minWidth = parseInt(cs['min-width'], 10);
            column.maxWidth = parseInt(cs['max-width'], 10);
        });
    };

    TableView.prototype.injectHeaderCells = function injectHeaderCells() {
        var _this4 = this;

        this.fragment = document.createDocumentFragment();
        this.columns.forEach(function (column) {
            return _this4.fragment.appendChild(column.node);
        });

        this.header.appendChild(this.fragment);

        // must be done after they have been injected into the DOM
        this.computeMinMaxHeaderCellDimensions();

        this.fragment = null; // prevent memleak
    };

    TableView.prototype.emptyBody = function emptyBody() {
        this.rows.length = 0;
        this.rows_ordered_by_y.length = 0;
        this.rows_ordered_by_y_length = 0;

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    };

    TableView.prototype.injectFirstRow = function injectFirstRow() {
        this.emptyBody();

        this.rows.push(createRow({
            active: this.row_start_index === this.active_row,
            data: this.c.getRow(this.row_start_index),
            setIndex: this.row_start_index,
            y: 0
        }, this.columns));

        this.rows_ordered_by_y.push(0);
        this.rows_ordered_by_y_length += 1;

        this.body.appendChild(this.rows[0].node);
    };

    TableView.prototype.injectRestOfRows = function injectRestOfRows() {
        this.fragment = document.createDocumentFragment();

        for (this.i = 1; this.i < this.n_rows_rendered; this.i += 1) {
            this.rows.push(createRow({
                active: this.i + this.row_start_index === this.active_row,
                data: this.c.getRow(this.i + this.row_start_index),
                setIndex: this.i + this.row_start_index,
                y: this.cell_h * this.i
            }, this.columns));

            this.rows_ordered_by_y.push(this.i);
            this.rows_ordered_by_y_length += 1;

            this.fragment.appendChild(this.rows[this.i].node);
        }

        this.body.appendChild(this.fragment);
        this.fragment = null; // prevent memleak
    };

    TableView.prototype.calculateCellHeight = function calculateCellHeight() {
        this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
    };

    TableView.prototype.calculateCellWidths = function calculateCellWidths() {
        var _this5 = this;

        this.rows[0].cells.forEach(function (cell, index) {
            _this5.columns[index].width = _this5.columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = _this5.columns[index].width;
        });
    };

    TableView.prototype.calculateXBound = function calculateXBound() {
        this.row_w = this.rows[0].node.clientWidth || 500;
        this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
    };

    TableView.prototype.calculateYBound = function calculateYBound() {
        this.y_min = 0;
        this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
    };

    TableView.prototype.calculateXScrollHandleSize = function calculateXScrollHandleSize() {
        this.x_scroll_handle_size = this.container_w - Math.abs(this.x_max);

        if (this.x_scroll_handle_size < 12) {
            this.x_scroll_handle_size = 12;
        }

        return this.x_scroll_handle_size;
    };

    TableView.prototype.calculateYScrollHandleSize = function calculateYScrollHandleSize() {
        this.y_scroll_handle_size = this.n_rows_visible === this.n_rows_rendered ? this.container_h : this.container_h * (this.n_rows_visible / this.c.totalRows);

        if (this.y_scroll_handle_size < 12) {
            this.y_scroll_handle_size = 12;
        }

        return this.y_scroll_handle_size;
    };

    TableView.prototype.initializeScrollBars = function initializeScrollBars() {
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
    };

    TableView.prototype.calculateContainerDimensions = function calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.container_h = this.c.wrapper.clientHeight || 150;
        this.container_w = this.c.wrapper.clientWidth || 500;
        this.body_h = this.c.body.clientHeight || 110;
    };

    TableView.prototype.regenerate = function regenerate() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? this.c : arguments[0];

        if (config !== this.c) {
            this.processConfiguration(config);
        }

        /* stores the current state of the union for if we need to rehydrate the previous scroll state */
        this.__x = this.x;
        this.__y = this.y;
        this.__row_start_index = this.row_start_index;

        this.resetInternals();

        if (this.active_row >= this.c.totalRows) {
            this.resetActiveRow();
        }

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

        if (!this.c.static_mode) {
            this.calculateXBound();
            this.calculateYBound();

            this.initializeScrollBars();

            if (this.c.preserveScrollState && this.__x !== null && this.__y !== null) {
                /* the cached values are then applied against the table to arrive at the previous state */

                this.handleMoveIntent({
                    deltaX: -this.__x,
                    deltaY: -this.__y,
                    preventDefault: _noop2.default
                });
            }
        }

        this.__x = this.__y = this.__row_start_index = null;
    };

    TableView.prototype.translateHeader = function translateHeader(x) {
        if (x !== this.last_header_x) {
            this.header_style[_transformProperty2.default] = translate3d(x);
            this.last_header_x = x;
        }
    };

    TableView.prototype.translateBody = function translateBody(x, y) {
        if (x !== this.last_body_x || y !== this.last_body_y) {
            this.body_style[_transformProperty2.default] = translate3d(x, y);
            this.last_body_x = x;
            this.last_body_y = y;
        }
    };

    TableView.prototype.translateXScrollHandle = function translateXScrollHandle(x) {
        if (!this.c.static_mode && x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    };

    TableView.prototype.translateYScrollHandle = function translateYScrollHandle(y) {
        if (!this.c.static_mode && y !== this.last_y_scroll_handle_y) {
            this.y_scroll_handle_style[_transformProperty2.default] = translate3d(0, y);
            this.last_y_scroll_handle_y = y;
        }
    };

    TableView.prototype.performTranslations = function performTranslations(nextX, nextY) {
        this.translateHeader(nextX);
        this.translateBody(nextX, nextY);
        this.translateXScrollHandle(this.x_scroll_handle_position);
        this.translateYScrollHandle(this.y_scroll_handle_position);
    };

    TableView.prototype.scrollUp = function scrollUp() {
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
    };

    TableView.prototype.scrollDown = function scrollDown() {
        /* at the logical end of the table (row index n) we truncate any scroll attempts  */
        if (this.row_end_index >= this.c.totalRows - 1 && this.next_y <= this.y_max) {
            this.next_y = this.y_max;

            if (this.x_scroll_track_hidden === false) {
                this.next_y -= this.x_scroll_track_h;
            }

            return;
        } else if (this.next_y >= this.y_max) {
            return;
        }

        /* Scrolling down, so we want to move the row in the visual top position to the bottom
           (below the lip of the view) */

        this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_max) / this.cell_h);

        if (this.n_rows_to_shift + this.row_end_index + 1 >= this.c.totalRows) {
            /* more rows than there is data available, truncate */
            this.next_y += (this.n_rows_to_shift - (this.c.totalRows - this.row_end_index - (this.top_visible_row_index === 0 ? 0 : 1))) * this.cell_h;

            this.next_y = this.applyDelta(this.applyDelta(this.y_max, this.y) % this.cell_h, this.next_y);

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
    };

    TableView.prototype.applyDelta = function applyDelta(delta, num) {
        if (delta < 0) {
            return num < 0 ? num - delta : num + delta;
        }

        return num - delta;
    };

    TableView.prototype.calculateVisibleTopRowIndex = function calculateVisibleTopRowIndex() {
        var targetY = arguments.length <= 0 || arguments[0] === undefined ? this.next_y : arguments[0];

        return this.rows[this.rows_ordered_by_y[Math.ceil(Math.abs(this.applyDelta(this.y_min, targetY) / this.cell_h))]].setIndex;
    };

    TableView.prototype.unlockDragToScroll = function unlockDragToScroll() {
        this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
    };

    TableView.prototype.applyNewColumnWidth = function applyNewColumnWidth(index, width) {
        this.c.columns[index].width = width; // the provided config objects
        this.columns[index].width = width; // the column nodes
        this.rows.forEach(function (row) {
            row.cells[index].width = width;
        });

        this.calculateXBound();
        this.initializeScrollBars();

        if (this.c.onColumnResize) {
            this.c.onColumnResize(this.columns[index].mapping, width);
        }
    };

    TableView.prototype.handleColumnResize = function handleColumnResize(delta) {
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
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than
        the overall container, whitespace will appear regardless. */
        if (adjusted_delta < 0 && this.row_w + this.x + adjusted_delta < this.container_w) {
            this.evt.deltaX = adjusted_delta;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);
        }
    };

    TableView.prototype.getKeyFromKeyCode = function getKeyFromKeyCode(code) {
        switch (code) {
            case 40:
                return 'ArrowDown';

            case 38:
                return 'ArrowUp';

            case 13:
                return 'Enter';
        }

        return null;
    };

    TableView.prototype.setAriaText = function setAriaText(text) {
        this.c.aria.innerText = text;
    };

    TableView.prototype.setActiveRow = function setActiveRow(setIndex) {
        this.active_row = setIndex;
        this.rows.forEach(function (row) {
            row.active = row.setIndex === setIndex;
        });
    };

    TableView.prototype.changeActiveRow = function changeActiveRow(delta) {
        var _this6 = this;

        if (this.active_row + delta >= this.c.totalRows) {
            return;
        }

        this.next_active_row = (0, _findWhere2.default)(this.rows, 'setIndex', this.active_row + delta);

        if (this.next_active_row) {
            this.setActiveRow(this.next_active_row.setIndex);
            this.setAriaText(this.next_active_row.data[this.columns[0].mapping]);

            if (delta === -1 && this.next_active_row.y * -1 > this.y || delta === 1 && this.next_active_row.y * -1 < this.y - this.body_h + this.cell_h) {
                // Destination row is outside the viewport, so simulate a scroll
                this.evt.deltaX = 0;
                this.evt.deltaY = this.cell_h * delta;

                this.handleMoveIntent(this.evt);
            }
        } else if (delta < 0 && this.active_row > 0 || delta > 0 && this.active_row < this.c.totalRows) {
            /* The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown in the viewport. */
            this.evt.deltaX = 0;
            this.evt.deltaY = (this.row_start_index > this.active_row && this.active_row - this.row_start_index || (this.row_start_index < this.active_row && this.active_row - this.row_start_index) + delta) * this.cell_h;

            this.handleMoveIntent(this.evt);

            // start the process again, now that the row is available
            window.requestAnimationFrame(function () {
                return _this6.changeActiveRow(delta);
            });
        }

        this.next_active_row = null;
    };

    TableView.prototype.discoverCellAndRowNodes = function discoverCellAndRowNodes(target) {
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
    };

    TableView.prototype.jumpToRowIndex = function jumpToRowIndex(index) {
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
    };

    return TableView;
}();

exports.default = TableView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVGFibGUvdGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU0saUJBQWlCLHFCQUF2QjtBQUNBLElBQU0sZ0JBQWdCLG9CQUF0Qjs7QUFFQSxJQUFNLGNBQWMsU0FBUyxXQUFULEdBQW1DO0FBQUEsUUFBZCxDQUFjLHlEQUFWLENBQVU7QUFBQSxRQUFQLENBQU8seURBQUgsQ0FBRzs7QUFDbkQsV0FBTyxpQkFBaUIsQ0FBakIsR0FBcUIsTUFBckIsR0FBOEIsQ0FBOUIsR0FBa0MsVUFBekM7QUFDSCxDQUZELEM7O0FBSUEsSUFBTSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQyxPQUFoQyxFQUF5QztBQUM5RCxRQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsS0FBZ0MsQ0FBOUQsRUFBaUU7QUFDN0QsYUFBSyxXQUFMLENBQWlCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQjtBQUNIOztBQUVELFFBQU0sT0FBTyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNNLFNBQUssU0FBTCxHQUFpQixxQkFBakI7O0FBRU4sUUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFqQjtBQUNNLFNBQUssV0FBTCxDQUFpQixRQUFqQjs7QUFFTixTQUFLLFdBQUwsQ0FBaUIsSUFBakI7O0FBRUEsV0FBTyxRQUFQO0FBQ0gsQ0FkRDs7QUFnQkEsSUFBTSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLE9BQWhDLEVBQXlDLEtBQXpDLEVBQWdEO0FBQ2xFLFFBQU0sT0FBTyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNNLFNBQUssU0FBTCxHQUFpQixlQUFqQjtBQUNBLFNBQUss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Szs7Ozs7a0JBR1UsUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFRhYmxlVmlld1xuICovXG5cbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uLy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuaW1wb3J0IGZpbmRXaGVyZSBmcm9tICcuLi8uLi9VSVV0aWxzL2ZpbmRXaGVyZSc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi8uLi9VSVV0aWxzL25vb3AnO1xuXG4vKlxuXG5GT1IgRlVUVVJFIEVZRVNcblxuU2Nyb2xsIHBlcmZvcm1hbmNlIGlzIGEgdHJpY2t5IGJlYXN0IC0tIG1vcmVzbyB3aGVuIHRyeWluZyB0byBtYWludGFpbiA1MCsgRlBTIGFuZCBwdW1waW5nIGEgbG90IG9mIGRhdGEgdG8gdGhlIERPTS4gVGhlcmUgYXJlIGEgbG90IG9mIGNob2ljZXMgaW4gdGhpcyBjb21wb25lbnQgdGhhdCBtYXkgc2VlbSBvZGQgYXQgZmlyc3QgYmx1c2gsIGJ1dCBsZXQgaXQgYmUga25vd24gdGhhdCB3ZSB0cmllZCB0byBkbyBpdCB0aGUgUmVhY3QgV2F54oSiIGFuZCBpdCB3YXMgbm90IHBlcmZvcm1hbnQgZW5vdWdoLlxuXG5UaGUgY29tYmluYXRpb24gdGhhdCB3YXMgc2V0dGxlZCB1cG9uIGlzIGEgUmVhY3Qgc2hlbGwgd2l0aCBuYXRpdmUgRE9NIGd1dHMuIFRoaXMgY29tYmluYXRpb24geWllbGRzIHRoZSBiZXN0IHBlcmZvcm1hbmNlLCB3aGlsZSBzdGlsbCBiZWluZyBwZXJmZWN0bHkgaW50ZXJvcGVyYWJsZSB3aXRoIHRoZSByZXN0IG9mIFVJS2l0IGFuZCBSZWFjdCB1c2UgY2FzZXMuXG5cbl9fSW1wb3J0YW50IE5vdGVfX1xuXG5BbnkgdGltZSB5b3UgY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQsIG1ha2Ugc3VyZSB5b3UgcmVsZWFzZSBpdCBhZnRlciBieSBzZXR0aW5nIGl0cyB2YXJpYWJsZSB0byBgbnVsbGAuIElmIHlvdSBkb24ndCwgaXQnbGwgY3JlYXRlIGEgbWVtb3J5IGxlYWsuIEFsc28sIG1ha2Ugc3VyZSBhbGwgZ2VuZXJhdGVkIERPTSBpcyByZW1vdmVkIG9uIGNvbXBvbmVudFdpbGxVbm1vdW50LlxuXG5cbk9SREVSIE9GIE9QRVJBVElPTlNcblxuMS4gcmVuZGVyIG9uZSByb3cgb2YgY2VsbHNcbjIuIGNhcHR1cmUgdGFibGUgJiBjZWxsIHNpemluZyBtZXRyaWNzXG4zLiByZW5kZXIgY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcblxuSWYgdGhlIGNvbXBvbmVudCB1cGRhdGVzIGR1ZSB0byBuZXcgcHJvcHMsIGp1c3QgYmxvdyBhd2F5IGV2ZXJ5dGhpbmcgYW5kIHN0YXJ0IG92ZXIuIEl0J3MgY2hlYXBlciB0aGFuIHRyeWluZyB0byBkaWZmLlxuXG4qL1xuXG5jb25zdCBjZWxsQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtY2VsbFxcYi9nO1xuY29uc3Qgcm93Q2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93XFxiL2c7XG5cbmNvbnN0IHRyYW5zbGF0ZTNkID0gZnVuY3Rpb24gdHJhbnNsYXRlM0QoeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDBweCknO1xufTsgLy8geiBpcyBuZXZlciB1c2VkXG5cbmNvbnN0IHJlcGFyZW50Q2VsbFRleHQgPSBmdW5jdGlvbiByZXBhcmVudENlbGxUZXh0KG5vZGUsIGNvbnRlbnQpIHtcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAmJiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsLWlubmVyJztcblxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgICAgdGV4dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG5cbiAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIHRleHROb2RlO1xufTtcblxuY29uc3QgY3JlYXRlRE9NQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbCc7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJywgbWFwcGluZyk7XG4gICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XG5cbiAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgcmVwYXJlbnRDZWxsVGV4dChjZWxsLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUhlYWRlckNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01IZWFkZXJDZWxsKGNvbHVtbiwgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gY3JlYXRlRE9NQ2VsbChjb2x1bW4udGl0bGUsIGNvbHVtbi5tYXBwaW5nLCB3aWR0aCk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAoY29sdW1uLnJlc2l6YWJsZSkge1xuICAgICAgICBjb25zdCBoYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJztcblxuICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVIZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlSGVhZGVyQ2VsbChtZXRhZGF0YSwgd2lkdGgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NSGVhZGVyQ2VsbChtZXRhZGF0YSwgbWV0YWRhdGEud2lkdGggfHwgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19tZXRhZGF0YSc6IG1ldGFkYXRhLFxuICAgICAgICAnX3RpdGxlJzogbWV0YWRhdGEudGl0bGUsXG4gICAgICAgIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9LFxuICAgICAgICBzZXQgdGl0bGUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl90aXRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fdGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiBtZXRhZGF0YS53aWR0aCB8fCB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1hcHBpbmc6IG1ldGFkYXRhLm1hcHBpbmcsXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVDZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19jb250ZW50JzogY29udGVudCxcbiAgICAgICAgZ2V0IGNvbnRlbnQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50OyB9LFxuICAgICAgICBzZXQgY29udGVudCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZVdpZHRoOiBmdW5jdGlvbiB0cnVlV2lkdGgoKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENsYXNzZXMgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICAgICAgLy8gdGFrZSBvZmYgdGhlIGlubmVyIGNsYXNzIHdoaWNoIGlzIHdoYXQgY2F1c2VzIHRoZSBzaXppbmcgY29uc3RyYWludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAvKiBDYXB0dXJlIHRoZSBuZXcgYWRqdXN0ZWQgc2l6ZSwgaGF2ZSB0byB1c2UgdGhlIGhhcmQgd2F5IGJlY2F1c2UgLmNsaWVudFdpZHRoIHJldHVybnMgYW4gaW50ZWdlciB2YWx1ZSwgcmF0aGVyIHRoYW4gdGhlIF9hY3R1YWxfIHdpZHRoLiBTTUguICovXG4gICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgLy8gUHV0IGV2ZXJ5dGhpbmcgYmFja1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gY2hpbGRDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3V2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSAndWktdGFibGUtcm93JztcbiAgICAgICAgICByb3cuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBmdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxzW2luZGV4XS5ub2RlKTtcbiAgICB9KTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgZnJhZ21lbnQgPSBudWxsO1xuXG4gICAgY29uc3Qgcm93T2JqID0ge1xuICAgICAgICBub2RlOiByb3csXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgJ19pdGVyYXRvcic6IG51bGwsXG4gICAgICAgICdfYWN0aXZlJzogZmFsc2UsXG4gICAgICAgIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH0sXG4gICAgICAgIHNldCBhY3RpdmUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWFjdGl2ZScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWFjdGl2ZScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctYWN0aXZlJywgJycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfc2V0SW5kZXgnOiBudWxsLFxuICAgICAgICBnZXQgc2V0SW5kZXgoKSB7IHJldHVybiB0aGlzLl9zZXRJbmRleDsgfSxcbiAgICAgICAgc2V0IHNldEluZGV4KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fc2V0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gICB0aGlzLl9zZXRJbmRleCA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndWktdGFibGUtcm93IHVpLXRhYmxlLXJvdy1ldmVuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1vZGQnLCAndWktdGFibGUtcm93LWV2ZW4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gICB0aGlzLl9zZXRJbmRleCA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndWktdGFibGUtcm93IHVpLXRhYmxlLXJvdy1vZGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWV2ZW4nLCAndWktdGFibGUtcm93LW9kZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCB2YWwpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2FpdGluZ0ZvclJlc29sdXRpb24nOiBmYWxzZSxcbiAgICAgICAgZ2V0IHdhaXRpbmdGb3JSZXNvbHV0aW9uKCkgeyByZXR1cm4gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb247IH0sXG4gICAgICAgIHNldCB3YWl0aW5nRm9yUmVzb2x1dGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWxvYWRpbmcnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctbG9hZGluZycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctbG9hZGluZycsICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gbnVsbCB8fCB0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldFJvd0RhdGEocHJvbWlzZSwgcmVzb2x2ZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX2RhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW3RoaXMuX2l0ZXJhdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfeSc6IG1ldGFkYXRhLnksXG4gICAgICAgIGdldCB5KCkgeyByZXR1cm4gdGhpcy5feTsgfSxcbiAgICAgICAgc2V0IHkodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB0aGlzLl95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHRvIGhhdmUgdGhlIGNsYXNzZXMgYWRkZWQgYXV0b21hdGljYWxseVxuICAgIHJvd09iai5zZXRJbmRleCA9IG1ldGFkYXRhLnNldEluZGV4O1xuICAgIHJvd09iai5hY3RpdmUgPSBtZXRhZGF0YS5hY3RpdmU7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn07XG5cbmNsYXNzIFRhYmxlVmlldyB7XG4gICAgdmFsaWRhdGVDb2x1bW5TaGFwZShjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuICAgIHR5cGVvZiBjb2x1bW4ubWFwcGluZyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4ucmVzaXphYmxlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4udGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAmJiAoY29sdW1uLndpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ251bWJlcicpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgICAgLy8geC1zY3JvbGwtdHJhY2ssIHktc2Nyb2xsLXRyYWNrLCB4LXNjcm9sbC1oYW5kbGUsIHktc2Nyb2xsLWhhbmRsZSwgYW5kIGFyaWEgYXJlIG5vdCByZXF1aXJlZCBpbiBzdGF0aWNfbW9kZVxuICAgICAgICBpZiAoY29uZmlnLnN0YXRpY19tb2RlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5zdGF0aWNfbW9kZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHN0YXRpY19tb2RlYDsgaXQgc2hvdWxkIGJlIGEgYm9vbGVhbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHdyYXBwZXJgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcuaGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGhlYWRlcmAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy5ib2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGJvZHlgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbmZpZy5zdGF0aWNfbW9kZSAmJiAhKGNvbmZpZ1sneC1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnWyd5LXNjcm9sbC10cmFjayddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWdbJ3gtc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnWyd5LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbmZpZy5zdGF0aWNfbW9kZSAmJiAhKGNvbmZpZy5hcmlhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGFyaWFgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgIUFycmF5LmlzQXJyYXkoY29uZmlnLmNvbHVtbnMpXG4gICAgICAgICAgICB8fCBjb25maWcuY29sdW1ucy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgIHx8ICFjb25maWcuY29sdW1ucy5ldmVyeSh0aGlzLnZhbGlkYXRlQ29sdW1uU2hhcGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIHZhbGlkIFxcYGNvbHVtbnNcXGAuIEl0IHNob3VsZCBiZSBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IG9uZSBvYmplY3QgY29uZm9ybWluZyB0bzoge1xuICAgICAgICAgICAgICAgIG1hcHBpbmc6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZXNpemFibGU6IGJvb2wsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogbnVtYmVyIChvcHRpb25hbCksXG4gICAgICAgICAgICB9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50aHJvdHRsZUludGVydmFsICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0aHJvdHRsZUludGVydmFsYDsgaXQgc2hvdWxkIGJlIGEgTnVtYmVyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcudG90YWxSb3dzICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0b3RhbFJvd3NgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5nZXRSb3cgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgZ2V0Um93YDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLnJvd0NsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcucm93Q2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHJvd0NsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5jZWxsQ2xpY2tGdW5jICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5jZWxsQ2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNlbGxDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuY29sdW1uUmVzaXplRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuY29sdW1uUmVzaXplRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBjb2x1bW5SZXNpemVGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5wcmVzZXJ2ZVNjcm9sbFN0YXRlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgcHJlc2VydmVTY3JvbGxTdGF0ZWA7IGl0IHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgICAgdGhpcy5jID0gey4uLmNvbmZpZ307XG5cbiAgICAgICAgLy8gZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID0gdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZTtcbiAgICAgICAgdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgPSB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCB8fCAzMDA7XG4gICAgICAgIHRoaXMuYy50b3RhbFJvd3MgPSB0aGlzLmMudG90YWxSb3dzIHx8IDA7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbmZpZ3VyYXRpb24odGhpcy5jKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpO1xuXG4gICAgICAgIHRoaXMuYm9keSA9IHRoaXMuYy5ib2R5O1xuICAgICAgICB0aGlzLmJvZHlfc3R5bGUgPSB0aGlzLmJvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5jLmhlYWRlcjtcbiAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGUgPSB0aGlzLmhlYWRlci5zdHlsZTtcblxuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNldEludGVybmFscygpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZlUm93KCk7XG5cbiAgICAgICAgLyogdXNlZCBpbiBzY3JvbGwgc3RhdGUgcHJlc2VydmF0aW9uIGNhbGN1bGF0aW9ucyAqL1xuICAgICAgICB0aGlzLl9feCA9IHRoaXMuX195ID0gdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcblxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcblxuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIC8vIHJlbGVhc2UgY2FjaGVkIERPTSBub2Rlc1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNba2V5XSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldEFjdGl2ZVJvdygpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gLTE7XG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXNldEludGVybmFscygpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgIHRoaXMucm93cyA9IFtdO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95ID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5uX3BhZGRpbmdfcm93cyA9IDM7XG5cbiAgICAgICAgdGhpcy54ID0gdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLm5leHRfeSA9IDA7XG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCA9ICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gMDtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IDA7XG5cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHZhcmlhYmxlcyBpbiB2YXJpb3VzIGNhbGN1bGF0aW9uc1xuICAgICAgICB0aGlzLmkgPSBudWxsO1xuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IG51bGw7XG4gICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSBudWxsO1xuXG4gICAgICAgIC8vIHRyYW5zbGF0aW9uIGNhY2hlc1xuICAgICAgICB0aGlzLmxhc3RfaGVhZGVyX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfYm9keV94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmV2dCA9IHtwcmV2ZW50RGVmYXVsdDogbm9vcH07XG5cbiAgICAgICAgdGhpcy50b3VjaCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IDA7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy54X3Njcm9sbF90cmFja19oID0gdGhpcy55X3Njcm9sbF90cmFja19oID0gbnVsbDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSBudWxsO1xuXG4gICAgICAgIC8vIHJlc2V0IVxuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBlbXB0eUhlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUNoaWxkKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRDb2x1bW5zKCkge1xuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG5cbiAgICAgICAgdGhpcy5jLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5jb2x1bW5zLnB1c2goY3JlYXRlSGVhZGVyQ2VsbChjb2x1bW4pKSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgY3M7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29sdW1uLm5vZGUpO1xuXG4gICAgICAgICAgICBjb2x1bW4ubWluV2lkdGggPSBwYXJzZUludChjc1snbWluLXdpZHRoJ10sIDEwKTtcbiAgICAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IHBhcnNlSW50KGNzWydtYXgtd2lkdGgnXSwgMTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbmplY3RIZWFkZXJDZWxscygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29sdW1uLm5vZGUpKTtcblxuICAgICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcblxuICAgICAgICAvLyBtdXN0IGJlIGRvbmUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gaW5qZWN0ZWQgaW50byB0aGUgRE9NXG4gICAgICAgIHRoaXMuY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGVtcHR5Qm9keSgpIHtcbiAgICAgICAgdGhpcy5yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluamVjdEZpcnN0Um93KCkge1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICBhY3RpdmU6IHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3csXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMucm93X3N0YXJ0X2luZGV4KSxcbiAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLnJvd19zdGFydF9pbmRleCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCgwKTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yb3dzWzBdLm5vZGUpO1xuICAgIH1cblxuICAgIGluamVjdFJlc3RPZlJvd3MoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLmkgPSAxOyB0aGlzLmkgPCB0aGlzLm5fcm93c19yZW5kZXJlZDsgdGhpcy5pICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93LFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXgpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxfaCAqIHRoaXMuaSxcbiAgICAgICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5pKTtcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5yb3dzW3RoaXMuaV0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsSGVpZ2h0KCkge1xuICAgICAgICB0aGlzLmNlbGxfaCA9IHRoaXMucm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsV2lkdGhzKCkge1xuICAgICAgICB0aGlzLnJvd3NbMF0uY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoIHx8IGNlbGwubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNlbGwud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYQm91bmQoKSB7XG4gICAgICAgIHRoaXMucm93X3cgPSB0aGlzLnJvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMueF9tYXggPSB0aGlzLmNvbnRhaW5lcl93IDw9IHRoaXMucm93X3cgPyB0aGlzLmNvbnRhaW5lcl93IC0gdGhpcy5yb3dfdyA6IDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLnlfbWluID0gMDtcbiAgICAgICAgdGhpcy55X21heCA9IHRoaXMuYm9keV9oIC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQgKiB0aGlzLmNlbGxfaDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMuY29udGFpbmVyX3cgLSBNYXRoLmFicyh0aGlzLnhfbWF4KTtcblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9ICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9PT0gdGhpcy5uX3Jvd3NfcmVuZGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jb250YWluZXJfaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnRhaW5lcl9oICogKHRoaXMubl9yb3dzX3Zpc2libGUgLyB0aGlzLmMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudFdpZHRoIHx8IHRoaXMuY29udGFpbmVyX3c7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgODtcbiAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCB0aGlzLmNvbnRhaW5lcl9oO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZS53aWR0aCA9IHRoaXMuY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG5cbiAgICAgICAgLyogdG90YWwgdHJhbnNsYXRhYmxlIHNwYWNlIC8gc2Nyb2xsYmFyIHRyYWNrIHNpemUgPSByZWxhdGl2ZSB2YWx1ZSBvZiBhIHNjcm9sbGJhciBwaXhlbCAqL1xuICAgICAgICB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8gPSBNYXRoLmFicyh0aGlzLnhfbWF4KSAvICh0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplKTtcblxuICAgICAgICAvKiBob3cgbWFueSBzY3JvbGxiYXIgcGl4ZWxzID09PSBvbmUgcm93PyAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvID0gKHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUpIC8gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLm5fcm93c192aXNpYmxlKTtcblxuICAgICAgICAvKiBoaWRlIHRoZSBzY3JvbGxiYXJzIGlmIHRoZXkgYXJlIG5vdCBuZWVkZWQgKi9cblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLmNvbnRhaW5lcl9oKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpIHtcbiAgICAgICAgLyogVGhlIGZhbGxiYWNrIGFtb3VudHMgYXJlIGZvciB1bml0IHRlc3RpbmcsIHRoZSBicm93c2VyIHdpbGwgYWx3YXlzIGhhdmVcbiAgICAgICAgYW4gYWN0dWFsIG51bWJlci4gKi9cbiAgICAgICAgdGhpcy5jb250YWluZXJfaCA9IHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuY29udGFpbmVyX3cgPSB0aGlzLmMud3JhcHBlci5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuYm9keV9oID0gdGhpcy5jLmJvZHkuY2xpZW50SGVpZ2h0IHx8IDExMDtcbiAgICB9XG5cbiAgICBoYW5kbGVXaW5kb3dSZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgIT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSB0aGlzLmMpIHsgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpOyB9XG5cbiAgICAgICAgLyogc3RvcmVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB1bmlvbiBmb3IgaWYgd2UgbmVlZCB0byByZWh5ZHJhdGUgdGhlIHByZXZpb3VzIHNjcm9sbCBzdGF0ZSAqL1xuICAgICAgICB0aGlzLl9feCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5fX3kgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleDtcblxuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlUm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmJ1aWxkQ29sdW1ucygpO1xuXG4gICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID0gdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPyB0aGlzLl9fcm93X3N0YXJ0X2luZGV4IHx8IDAgOiAwO1xuXG4gICAgICAgIHRoaXMuaW5qZWN0Rmlyc3RSb3coKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsV2lkdGhzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbEhlaWdodCgpO1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3JlbmRlcmVkID0gTWF0aC5jZWlsKHRoaXMuYm9keV9oIC8gdGhpcy5jZWxsX2gpICsgdGhpcy5uX3BhZGRpbmdfcm93cztcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfcmVuZGVyZWQgPiB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IHRoaXMuYy50b3RhbFJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5fcm93c192aXNpYmxlID0gTWF0aC5mbG9vcih0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdmlzaWJsZSA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5fcm93c192aXNpYmxlID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleCArIHRoaXMubl9yb3dzX3JlbmRlcmVkIC0gMTtcblxuICAgICAgICB0aGlzLmluamVjdEhlYWRlckNlbGxzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UmVzdE9mUm93cygpO1xuXG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVZQm91bmQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgJiYgdGhpcy5fX3ggIT09IG51bGwgJiYgdGhpcy5fX3kgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvKiB0aGUgY2FjaGVkIHZhbHVlcyBhcmUgdGhlbiBhcHBsaWVkIGFnYWluc3QgdGhlIHRhYmxlIHRvIGFycml2ZSBhdCB0aGUgcHJldmlvdXMgc3RhdGUgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogLXRoaXMuX194LFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IC10aGlzLl9feSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9feCA9IHRoaXMuX195ID0gdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlSGVhZGVyKHgpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF9oZWFkZXJfeCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVCb2R5KHgsIHkpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF9ib2R5X3ggfHwgeSAhPT0gdGhpcy5sYXN0X2JvZHlfeSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5X3N0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfYm9keV94ID0geDtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh4KSB7XG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlICYmIHggIT09IHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUgJiYgeSAhPT0gdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95KSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBlcmZvcm1UcmFuc2xhdGlvbnMobmV4dFgsIG5leHRZKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlSGVhZGVyKG5leHRYKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVCb2R5KG5leHRYLCBuZXh0WSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2Nyb2xsVXAoKSB7XG4gICAgICAgIC8qIGF0IHRoZSBsb2dpY2FsIHN0YXJ0IG9mIHRoZSB0YWJsZSAocm93IGluZGV4IDApIHdlIHRydW5jYXRlIHVwd2FyZCBzY3JvbGwgYXR0ZW1wdHNcbiAgICAgICAgICAgdG8gdGhlIHVwcGVyIHRyYW5zbGF0aW9uIGJvdW5kYXJ5IHRvIGtlZXAgZnJvbSBza2lwcGluZyBvZmYgaW50byBub3RoaW5nbmVzcyAqL1xuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCAmJiB0aGlzLm5leHRfeSA+IHRoaXMueV9taW4pIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55X21pbjtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSAwIHx8IHRoaXMubmV4dF95IDw9IHRoaXMueV9taW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIHVwLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIGJvdHRvbSBwb3NpdGlvbiB0byB0aGUgdG9wXG4gICAgICAgICAgIChhYm92ZSB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWluKSAvIHRoaXMuY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgLyogcHJldmVudCB1bmRlci1yb3RhdGluZyBiZWxvdyBpbmRleCB6ZXJvLCB0aGUgbG9naWNhbCBzdGFydCBvZiBhIGRhdGEgc2V0ICovXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMubl9yb3dzX3RvX3NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gTWF0aC5hYnModGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCkgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgZGVjcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBtb3ZlIHRoZSBoaWdoZXN0IFktdmFsdWUgcm93cyB0byB0aGUgdG9wIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXggPSB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIGZvciAodGhpcy5pdGVyYXRvciA9IDE7IHRoaXMuaXRlcmF0b3IgPD0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7IHRoaXMuaXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLml0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSB0aGlzLnJvd3NbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXhdXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyLmRhdGEgPSB0aGlzLmRyYWdfdGltZXIgPyBudWxsIDogdGhpcy5jLmdldFJvdyh0aGlzLnRhcmdldF9pbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuc2V0SW5kZXggPSB0aGlzLnRhcmdldF9pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci55ID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dLnkgLSB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5hY3RpdmUgPSB0aGlzLnRhcmdldF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS51bnNoaWZ0KHRoaXMucm93c19vcmRlcmVkX2J5X3kucG9wKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCAtPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCAtPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiArPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCArPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsRG93bigpIHtcbiAgICAgICAgLyogYXQgdGhlIGxvZ2ljYWwgZW5kIG9mIHRoZSB0YWJsZSAocm93IGluZGV4IG4pIHdlIHRydW5jYXRlIGFueSBzY3JvbGwgYXR0ZW1wdHMgICovXG4gICAgICAgIGlmICh0aGlzLnJvd19lbmRfaW5kZXggPj0gdGhpcy5jLnRvdGFsUm93cyAtIDEgJiYgdGhpcy5uZXh0X3kgPD0gdGhpcy55X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnlfbWF4O1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy54X3Njcm9sbF90cmFja19oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+PSB0aGlzLnlfbWF4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIHRvcCBwb3NpdGlvbiB0byB0aGUgYm90dG9tXG4gICAgICAgICAgIChiZWxvdyB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21heCkgLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ICsgdGhpcy5yb3dfZW5kX2luZGV4ICsgMSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ICs9IChcbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCAtICh0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5yb3dfZW5kX2luZGV4IC0gKHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID09PSAwID8gMCA6IDEpKVxuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMuYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEodGhpcy55X21heCwgdGhpcy55KSAlIHRoaXMuY2VsbF9oLCB0aGlzLm5leHRfeVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMueF9zY3JvbGxfdHJhY2tfaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5yb3dfZW5kX2luZGV4IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgLyogd2hlbiB0aGUgdG90YWwgbW92ZW1lbnQgZW5kcyB1cCBiZWluZyBsYXJnZXIgdGhhbiB0aGUgc2V0IG9mIHJvd3MgYWxyZWFkeSByZW5kZXJlZCwgd2UgY2FuIHNhZmVseSBpbmNyZW1lbnQgdGhlIFwidmlld2FibGVcIiByb3cgcmFuZ2UgYWNjb3JkaW5nbHkgYW5kIHRoZSBuZXh0IHN0ZXAgd2hlcmUgdGhlIGNvbnRlbnQgaXMgc3Vic3RpdHV0ZWQgd2lsbCBhdXRvbWF0aWNhbGx5IGluc2VydCB0aGUgbmV4dCBsb2dpY2FsIHJvdyBpbnRvIGl0cyBwbGFjZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLnNoaWZ0X2RlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLnNoaWZ0X2RlbHRhO1xuXG4gICAgICAgICAgICAgICAgLyogYWNjb21vZGF0ZSBmb3IgdGhlIG51bWJlciBvZiBwaXhlbHMgdGhhdCB3aWxsIG5vdCBiZSByZW5kZXJlZCAqL1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95ICs9IHRoaXMuc2hpZnRfZGVsdGEgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodGhpcy5pdGVyYXRvciA9IDE7IHRoaXMuaXRlcmF0b3IgPD0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7IHRoaXMuaXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gdGhpcy5yb3dfZW5kX2luZGV4ICsgdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIC8qIHRoZSBwYWRkaW5nIHJvd3Mgd2lsbCBleGNlZWQgdGhlIG1heGltdW0gaW5kZXggZm9yIGEgZGF0YSBzZXQgb25jZSB0aGUgdXNlciBoYXMgZnVsbHkgdHJhbnNsYXRlZCB0byB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gKi9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXRfaW5kZXggPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5yb3dzX29yZGVyZWRfYnlfeS5zaGlmdCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBsb3dlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSBib3R0b20gb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVswXV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoIC0gMV1dLnkgKyB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5hY3RpdmUgPSB0aGlzLnRhcmdldF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuXG4gICAgICAgICAgICB0aGlzLnlfbWluIC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLnlfbWF4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseURlbHRhKGRlbHRhLCBudW0pIHtcbiAgICAgICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bSA8IDAgPyBudW0gLSBkZWx0YSA6IG51bSArIGRlbHRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bSAtIGRlbHRhO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCh0YXJnZXRZID0gdGhpcy5uZXh0X3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1tcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbXG4gICAgICAgICAgICAgICAgTWF0aC5jZWlsKE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEodGhpcy55X21pbiwgdGFyZ2V0WSkgLyB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICBdXG4gICAgICAgIF0uc2V0SW5kZXg7XG4gICAgfVxuXG4gICAgaGFuZGxlTW92ZUludGVudCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChldmVudC5kZWx0YVggPT09IDAgICAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kZWx0YV94ID0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIC8vIGRlbHRhTW9kZSAwID09PSBwaXhlbHMsIDEgPT09IGxpbmVzXG4gICAgICAgIHRoaXMuZGVsdGFfeSA9ICAgZXZlbnQuZGVsdGFNb2RlID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQoZXZlbnQuZGVsdGFZLCAxMCkgKiB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICAgICAgICA6IGV2ZW50LmRlbHRhWTtcblxuICAgICAgICAvKiBsb2NrIHRoZSB0cmFuc2xhdGlvbiBheGlzIGlmIHRoZSB1c2VyIGlzIG1hbmlwdWxhdGluZyB0aGUgc3ludGhldGljIHNjcm9sbGJhcnMgKi9cbiAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueCA6IHRoaXMueCAtIHRoaXMuZGVsdGFfeDtcbiAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueSA6IHRoaXMueSAtIHRoaXMuZGVsdGFfeTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X3ggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3ggPCB0aGlzLnhfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueF9tYXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdmlzaWJsZSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBuZWdhdGUgdGhlIHZlcnRpY2FsIG1vdmVtZW50LCBub3QgZW5vdWdoIHJvd3MgdG8gZmlsbCB0aGUgYm9keSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPCB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRG93bigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID4gdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNldF90aW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRfdGltZXIpOyB9XG5cbiAgICAgICAgLyogcmVzZXQgcm93ICYgd3JhcHBlciBZIHZhbHVlcyB0b3dhcmQgMCB0byBwcmV2ZW50IG92ZXJmbG93aW5nICovXG4gICAgICAgIHRoaXMucmVzZXRfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiByZXNldFlBeGlzKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF90aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2V0X2RlbHRhID0gaW5zdGFuY2UueV9taW47XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IGFsbCB0aGUgcG9zaXRpb25pbmcgdmFyaWFibGVzICovXG4gICAgICAgICAgICBpbnN0YW5jZS55ID0gaW5zdGFuY2UuYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueSk7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21pbiA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWluKTtcbiAgICAgICAgICAgIGluc3RhbmNlLnlfbWF4ID0gaW5zdGFuY2UuYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueV9tYXgpO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHJvd3MgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnJvd3Nfb3JkZXJlZF9ieV95LmZvckVhY2goKHBvc2l0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnJvd3NbcG9zaXRpb25dLnkgPSBpbmRleCAqIGluc3RhbmNlLmNlbGxfaDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCB0aGUgd3JhcHBlciAqL1xuICAgICAgICAgICAgaW5zdGFuY2UudHJhbnNsYXRlQm9keShpbnN0YW5jZS54LCBpbnN0YW5jZS55KTtcblxuICAgICAgICB9LCAxMDAsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gdGhpcy5jYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgoKTtcblxuICAgICAgICAvKiBxdWV1ZSB1cCB0cmFuc2xhdGlvbnMgYW5kIHRoZSBicm93c2VyIHdpbGwgZXhlY3V0ZSB0aGVtIGFzIGFibGUsIG5lZWQgdG8gcGFzcyBpbiB0aGUgdmFsdWVzIHRoYXQgd2lsbCBjaGFuZ2UgZHVlIHRvIG1vcmUgaGFuZGxlTW92ZUludGVudCBpbnZvY2F0aW9ucyBiZWZvcmUgdGhpcyByQUYgZXZlbnR1YWxseSBleGVjdXRlcy4gKi9cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiByQUYobmV4dFgsIGN1cnJYLCBuZXh0WSwgdmlzaWJsZVRvcFJvd0luZGV4KSB7XG4gICAgICAgICAgICBpZiAobmV4dFggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICs9ICgobmV4dFggLSBjdXJyWCkgLyB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8pICogLTE7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdmlzaWJsZVRvcFJvd0luZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gYWxsIHRyYW5zZm9ybXMgZ3JvdXBlZCB0b2dldGhlclxuICAgICAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKG5leHRYLCBuZXh0WSk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMubmV4dF94LCB0aGlzLngsIHRoaXMubmV4dF95LCB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCkpO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMubmV4dF94O1xuICAgICAgICB0aGlzLnkgPSB0aGlzLm5leHRfeTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiB3ZSBoYW5kbGUgdG91Y2htb3ZlIGJ5IGRldGVjdGluZyB0aGUgZGVsdGEgb2YgcGFnZVgvWSBhbmQgZm9yd2FyZGluZ1xuICAgICAgICBpdCB0byBoYW5kbGVNb3ZlSW50ZW50KCkgKi9cblxuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWCAtIHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSAtIHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteC1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IChldmVudC5wYWdlWCAtIHRoaXMubGFzdF9wYWdlWCkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW87XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteS1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95LCBldmVudC5wYWdlWSAtIHRoaXMuZGlzdGFuY2VfZnJvbV90b3BcbiAgICAgICAgICAgICkgLyB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvXG4gICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiBhZGp1c3RzIGZvciB0aGUgcGl4ZWwgZGlzdGFuY2UgYmV0d2VlbiB3aGVyZSB0aGUgaGFuZGxlIGlzIGNsaWNrZWQgYW5kIHRoZSB0b3AgZWRnZSBvZiBpdDsgdGhlIGhhbmRsZSBpcyBwb3NpdGlvbmVkIGFjY29yZGluZyB0byBpdHMgdG9wIGVkZ2UgKi9cbiAgICAgICAgdGhpcy55X3Njcm9sbF9vZmZzZXQgPSBldmVudC5vZmZzZXRZO1xuXG4gICAgICAgIHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ190aW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuZHJhZ190aW1lcik7IH1cblxuICAgICAgICAgICAgLyogeC1heGlzIGRvZXNuJ3QgbmVlZCB0aHJvdHRsZSBwcm90ZWN0aW9uIHNpbmNlIGl0IGRvZXNuJ3QgY2F1c2UgYSByb3cgZmV0Y2ggKi9cbiAgICAgICAgICAgIHRoaXMuZHJhZ190aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgLyogTm93IGZldGNoLCBvbmNlIGRyYWcgaGFzIGNlYXNlZCBmb3IgbG9uZyBlbm91Z2guICovXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0YSA9IHRoaXMuYy5nZXRSb3cocm93LnNldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wIC0gdGhpcy55X3Njcm9sbF9vZmZzZXRcbiAgICAgICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IChldmVudC5wYWdlWCAtIHRoaXMubGFzdF9wYWdlWCkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW87XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbHVtblJlc2l6ZShldmVudC5wYWdlWCAtIHRoaXMubGFzdF9jb2x1bW5feCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5sb2NrRHJhZ1RvU2Nyb2xsKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW5kID0gKCkgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyogdGhlIGJyb3dzZXIgZmlyZXMgdGhlIG1vdXNldXAgYW5kIGNsaWNrIGV2ZW50cyBzaW11bHRhbmVvdXNseSwgYW5kIHdlIGRvbid0IHdhbnQgb3VyIGNsaWNrIGhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQsIHNvIGEgemVyby1kZWxheSBzZXRUaW1lb3V0IHdvcmtzIGhlcmUgdG8gbGV0IHRoZSBzdGFjayBjbGVhciBiZWZvcmUgYWxsb3dpbmcgY2xpY2sgZXZlbnRzIGFnYWluLiAqL1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVubG9ja0RyYWdUb1Njcm9sbCgpLCAwKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZScpIHtcbiAgICAgICAgICAgIC8vIEZpeGVzIGRyYWdTdGFydCBvY2Nhc2lvbmFsbHkgaGFwcGVuaW5nIGFuZCBicmVha2luZyB0aGUgc2ltdWxhdGVkIGRyYWdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgICAgICB0aGlzLmNvbHVtbl9pc19yZXNpemluZyA9IGZpbmRXaGVyZSh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB3aWR0aCkge1xuICAgICAgICB0aGlzLmMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgLy8gdGhlIHByb3ZpZGVkIGNvbmZpZyBvYmplY3RzXG4gICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgICAvLyB0aGUgY29sdW1uIG5vZGVzXG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuY2VsbHNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jLm9uQ29sdW1uUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLmMub25Db2x1bW5SZXNpemUodGhpcy5jb2x1bW5zW2luZGV4XS5tYXBwaW5nLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpO1xuICAgICAgICBsZXQgYWRqdXN0ZWRfZGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWRfZGVsdGEgPCAwXG4gICAgICAgICAgICAmJiAhaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhKTtcblxuICAgICAgICAvKiBJZiBhIGNvbHVtbiBzaHJpbmtzLCB0aGUgd3JhcHBlciBYIHRyYW5zbGF0aW9uIG5lZWRzIHRvIGJlIGFkanVzdGVkIGFjY29yZGluZ2x5IG9yXG4gICAgICAgIHdlJ2xsIHNlZSB1bndhbnRlZCB3aGl0ZXNwYWNlIG9uIHRoZSByaWdodCBzaWRlLiBJZiB0aGUgdGFibGUgd2lkdGggYmVjb21lcyBzbWFsbGVyIHRoYW5cbiAgICAgICAgdGhlIG92ZXJhbGwgY29udGFpbmVyLCB3aGl0ZXNwYWNlIHdpbGwgYXBwZWFyIHJlZ2FyZGxlc3MuICovXG4gICAgICAgIGlmIChhZGp1c3RlZF9kZWx0YSA8IDAgJiYgdGhpcy5yb3dfdyArIHRoaXMueCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gYWRqdXN0ZWRfZGVsdGE7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZpbmRXaGVyZSh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgbWFwcGluZyk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbHVtbik7XG5cbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGNvbHVtbi53aWR0aDtcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGg7XG5cbiAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEocm93LmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSAmJiByb3cuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdLnRydWVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoIDwgY2VsbFdpZHRoID8gY2VsbFdpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8qIGZpbmQgdGhlIHJlbmRlcmVkIHJvdyB3aXRoIHRoZSBsb25nZXN0IGNvbnRlbnQgZW50cnkgKi9cblxuICAgICAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRLZXlGcm9tS2V5Q29kZShjb2RlKSB7XG4gICAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd0Rvd24nO1xuXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93VXAnO1xuXG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICByZXR1cm4gJ0VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldEFyaWFUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy5jLmFyaWEuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVSb3coc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSBzZXRJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlUm93KGRlbHRhKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSA+PSB0aGlzLmMudG90YWxSb3dzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93ICsgZGVsdGEpO1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfYWN0aXZlX3Jvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3codGhpcy5uZXh0X2FjdGl2ZV9yb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLm5leHRfYWN0aXZlX3Jvdy5kYXRhW3RoaXMuY29sdW1uc1swXS5tYXBwaW5nXSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAoZGVsdGEgPT09IC0xICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA+IHRoaXMueSlcbiAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5uZXh0X2FjdGl2ZV9yb3cueSAqIC0xIDwgdGhpcy55IC0gdGhpcy5ib2R5X2ggKyB0aGlzLmNlbGxfaClcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmNlbGxfaCAqIGRlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPCAwICYmIHRoaXMuYWN0aXZlX3JvdyA+IDApXG4gICAgICAgICAgICAgICAgICAgfHwgKGRlbHRhID4gMCAmJiB0aGlzLmFjdGl2ZV9yb3cgPCB0aGlzLmMudG90YWxSb3dzKSkge1xuICAgICAgICAgICAgLyogVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duIGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAoICAgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA+IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA8IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBkZWx0YSkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuY2hhbmdlQWN0aXZlUm93KGRlbHRhKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXkgfHwgdGhpcy5nZXRLZXlGcm9tS2V5Q29kZShldmVudC5rZXlDb2RlKTtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzY292ZXJDZWxsQW5kUm93Tm9kZXModGFyZ2V0KSB7XG4gICAgICAgIGxldCBub2RlID0gdGFyZ2V0O1xuICAgICAgICBjb25zdCBub2RlTWFwID0ge307XG5cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvdzogbm9kZX07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoKCFub2RlTWFwLmNlbGwgfHwgIW5vZGVNYXAucm93KSAmJiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2goY2VsbENsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLnJvdyA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZU1hcDtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKG1hcC5yb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHJvdy5zZXRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChtYXAuY2VsbCAmJiB0aGlzLmMuY2VsbENsaWNrRnVuYykge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgsIG1hcC5jZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmMucm93Q2xpY2tGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLnJvd0NsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGp1bXBUb1Jvd0luZGV4KGluZGV4KSB7XG4gICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMueSA9IDA7XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSBpbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyhpbmRleCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZVZpZXc7XG4iXX0=