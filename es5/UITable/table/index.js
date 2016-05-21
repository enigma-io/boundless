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
                                                                                                                                                           * @class Table
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

function translate3d() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
}; // z is never used

function reparentCellText(node, content) {
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

function createDOMCell(content, mapping, width, index) {
    var cell = document.createElement('div');

    cell.className = 'ui-table-cell ';
    cell.className += index % 2 === 0 ? 'ui-table-cell-even' : 'ui-table-cell-odd';

    cell.setAttribute('data-column', mapping);
    cell.appendChild(document.createTextNode(content));

    if (width) {
        cell.style.width = width + 'px';
        reparentCellText(cell, content);
    }

    return cell;
};

function createDOMHeaderCell(column, width, index) {
    var cell = createDOMCell(column.title, column.mapping, width, index);
    cell.className += ' ui-table-header-cell';

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = 'ui-table-header-cell-resize-handle';

        cell.appendChild(handle);
    }

    return cell;
};

function createHeaderCell(metadata, index) {
    var node = createDOMHeaderCell(metadata, metadata.width, index);

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
        '_width': metadata.width,
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

function createCell(content, mapping, width, index) {
    var node = createDOMCell(content, mapping, width, index);

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

function createDOMRow(setIndex, y) {
    var row = document.createElement('div');
    row.className = 'ui-table-row';
    row.style[_transformProperty2.default] = translate3d(0, y);

    return row;
};

function createRow(metadata, columns) {
    /* IMPORTANT NOTE: metadata.data might be a promise. Plan accordingly. */

    var row = createDOMRow(metadata.setIndex, metadata.y);
    var cells = [];

    var fragment = document.createDocumentFragment();

    columns.forEach(function (column, index) {
        cells.push(createCell('', column.mapping, column.width, index));
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

function validateColumnShape(column) {
    return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
}

function validateConfiguration(config) {
    // x-scroll-track, y-scroll-track, x-scroll-handle, y-scroll-handle, and aria are not required in static_mode
    if (config.static_mode !== undefined && typeof config.static_mode !== 'boolean') {
        throw Error('Table was not passed a valid `static_mode`; it should be a boolean.');
    }

    if (!(config.wrapper instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `wrapper` element.');
    }

    if (!(config.header instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `header` element.');
    }

    if (!(config.body instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `body` element.');
    }

    if (!config.static_mode && !(config['x-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-track` element.');
    }

    if (!config.static_mode && !(config['y-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-track` element.');
    }

    if (!config.static_mode && !(config['x-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-handle` element.');
    }

    if (!config.static_mode && !(config['y-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-handle` element.');
    }

    if (!config.static_mode && !(config.aria instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `aria` element.');
    }

    if (!Array.isArray(config.columns) || config.columns.length === 0 || !config.columns.every(validateColumnShape)) {
        throw Error('Table was not passed valid `columns`. It should be an array with at least one object conforming to: {\n            mapping: string,\n            resizable: bool,\n            title: string,\n            width: number (optional),\n        }');
    }

    if (typeof config.throttleInterval !== 'number') {
        throw Error('Table was not passed a valid `throttleInterval`; it should be a Number.');
    }

    if (typeof config.totalRows !== 'number') {
        throw Error('Table was not passed a valid `totalRows`; it should be a Number.');
    }

    if (typeof config.getRow !== 'function') {
        throw Error('Table was not passed a valid `getRow`; it should be a function.');
    }

    if (config.rowClickFunc !== undefined && typeof config.rowClickFunc !== 'function') {
        throw Error('Table was not passed a valid `rowClickFunc`; it should be a function.');
    }

    if (config.cellClickFunc !== undefined && typeof config.cellClickFunc !== 'function') {
        throw Error('Table was not passed a valid `cellClickFunc`; it should be a function.');
    }

    if (config.columnResizeFunc !== undefined && typeof config.columnResizeFunc !== 'function') {
        throw Error('Table was not passed a valid `columnResizeFunc`; it should be a function.');
    }

    if (typeof config.preserveScrollState !== 'boolean') {
        throw Error('Table was not passed a valid `preserveScrollState`; it should be a boolean.');
    }
}

var Table = function () {
    Table.prototype.processConfiguration = function processConfiguration(config) {
        this.c = _extends({}, config);

        // fallback values
        this.c.preserveScrollState = this.c.preserveScrollState === undefined ? true : this.c.preserveScrollState;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        validateConfiguration(this.c);
    };

    function Table(config) {
        var _this = this;

        _classCallCheck(this, Table);

        this.handleWindowResize = function () {
            if (_this.c.wrapper.clientHeight !== _this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return _this.regenerate();
            } else if (_this.c.wrapper.clientWidth !== _this.container_w) {
                var old_width = _this.container_w;

                _this.calculateContainerDimensions();
                _this.calculateXBound();
                _this.initializeScrollBars();

                _this.x_scroll_handle_position = _this.x / _this.x_table_pixel_ratio * -1;

                if (_this.x_scroll_handle_position + _this.x_scroll_handle_size > _this.x_scroll_track_w) {
                    _this.x_scroll_handle_position = _this.x_scroll_track_w - _this.x_scroll_handle_size;
                }

                _this.translateXScrollHandle(_this.x_scroll_handle_position);

                // getting larger and we're fully scrolled to the right
                if (old_width < _this.container_w && _this.x_scroll_handle_position + _this.x_scroll_handle_size === _this.x_scroll_track_w) {
                    _this.x += _this.container_w - old_width;

                    _this.translateHeader(_this.x);
                    _this.translateBody(_this.x, _this.last_body_y);
                }
            }
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
                instance.y = applyDelta(instance.reset_delta, instance.y);
                instance.y_min = applyDelta(instance.reset_delta, instance.y_min);
                instance.y_max = applyDelta(instance.reset_delta, instance.y_max);

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

            _this.evt.deltaX = Math.floor(applyDelta(_this.last_x_scroll_handle_x, event.pageX - _this.distance_from_left) * _this.x_table_pixel_ratio);

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
            _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

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
                _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top - _this.y_scroll_offset) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

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
            var key = event.key || getKeyFromKeyCode(event.keyCode);

            switch (key) {
                case 'Escape':
                    _this.resetActiveRow();
                    break;

                case 'ArrowDown':
                    if (_this.active_row !== -1 // already keying through the table
                     || _this.active_row === -1 && _this.row_start_index === 0 // at the beginning
                    ) {
                            _this.changeActiveRow(1);
                        } else {
                        // start the active row on the topmost row in the current viewport
                        _this.changeActiveRow(_this.row_start_index + _this.n_padding_rows + 1);
                    }

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

    Table.prototype.destroy = function destroy() {
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

    Table.prototype.resetActiveRow = function resetActiveRow() {
        var _this3 = this;

        this.active_row = -1;
        this.next_active_row = null;

        if (this.rows.length) {
            this.rows.forEach(function (row) {
                row.active = row.setIndex === _this3.active_row;
            });
        }
    };

    Table.prototype.resetInternals = function resetInternals() {
        this.columns = [];
        this.rows = [];
        this.rows_ordered_by_y = [];
        this.rows_ordered_by_y_length = 0;
        this.n_padding_rows = 3;

        this.x = this.y = 0;
        this.next_x = this.next_y = 0;

        if (this.c['y-scroll-track']) {
            this.c['y-scroll-track'].style.display = '';
        }

        this.distance_from_top = this.c['y-scroll-track'] ? this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset : null;

        if (this.c['x-scroll-track']) {
            this.c['x-scroll-track'].style.display = '';
        }

        this.distance_from_left = this.c['x-scroll-track'] ? this.c['x-scroll-track'].getBoundingClientRect().left + window.pageXOffset : null;

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

    Table.prototype.emptyHeader = function emptyHeader() {
        this.columns.length = 0;

        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    };

    Table.prototype.buildColumns = function buildColumns() {
        var _this4 = this;

        this.emptyHeader();

        this.c.columns.forEach(function (column, index) {
            _this4.columns.push(createHeaderCell(column, index));
        });
    };

    Table.prototype.computeMinMaxHeaderCellDimensions = function computeMinMaxHeaderCellDimensions() {
        var cs = void 0;

        this.columns.forEach(function (column) {
            cs = window.getComputedStyle(column.node);

            column.minWidth = parseInt(cs['min-width'], 10);
            column.maxWidth = parseInt(cs['max-width'], 10);
        });
    };

    Table.prototype.injectHeaderCells = function injectHeaderCells() {
        var _this5 = this;

        this.fragment = document.createDocumentFragment();
        this.columns.forEach(function (column) {
            return _this5.fragment.appendChild(column.node);
        });

        this.header.appendChild(this.fragment);

        // must be done after they have been injected into the DOM
        this.computeMinMaxHeaderCellDimensions();

        this.fragment = null; // prevent memleak
    };

    Table.prototype.emptyBody = function emptyBody() {
        this.rows.length = 0;
        this.rows_ordered_by_y.length = 0;
        this.rows_ordered_by_y_length = 0;

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    };

    Table.prototype.injectFirstRow = function injectFirstRow() {
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

    Table.prototype.injectRestOfRows = function injectRestOfRows() {
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

    Table.prototype.calculateCellHeight = function calculateCellHeight() {
        this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
    };

    Table.prototype.calculateCellWidths = function calculateCellWidths() {
        var _this6 = this;

        this.rows[0].cells.forEach(function (cell, index) {
            _this6.columns[index].width = _this6.columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = _this6.columns[index].width;
        });
    };

    Table.prototype.calculateXBound = function calculateXBound() {
        this.row_w = this.rows[0].node.clientWidth || 500;
        this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
    };

    Table.prototype.calculateYBound = function calculateYBound() {
        this.y_min = 0;
        this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
    };

    Table.prototype.calculateXScrollHandleSize = function calculateXScrollHandleSize() {
        this.x_scroll_handle_size = this.x_scroll_track_w / this.row_w * this.x_scroll_track_w;

        if (this.x_scroll_handle_size < 12) {
            this.x_scroll_handle_size = 12;
        } else if (this.x_scroll_handle_size > this.x_scroll_track_w) {
            this.x_scroll_handle_size = this.x_scroll_track_w;
        }

        return this.x_scroll_handle_size;
    };

    Table.prototype.calculateYScrollHandleSize = function calculateYScrollHandleSize() {
        this.y_scroll_handle_size = this.n_rows_visible === this.n_rows_rendered ? this.container_h : this.container_h * (this.n_rows_visible / this.c.totalRows);

        if (this.y_scroll_handle_size < 12) {
            this.y_scroll_handle_size = 12;
        }

        return this.y_scroll_handle_size;
    };

    Table.prototype.initializeScrollBars = function initializeScrollBars() {
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

        if (this.x_scroll_handle_size === this.x_scroll_track_w) {
            this.c['x-scroll-track'].style.display = 'none';
            this.x_scroll_track_hidden = true;
        } else {
            this.c['x-scroll-track'].style.display = '';
            this.x_scroll_track_hidden = false;
        }

        if (this.y_scroll_handle_size === this.y_scroll_track_h) {
            this.c['y-scroll-track'].style.display = 'none';
            this.y_scroll_track_hidden = true;
        } else {
            this.c['y-scroll-track'].style.display = '';
            this.y_scroll_track_hidden = false;
        }
    };

    Table.prototype.calculateContainerDimensions = function calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.container_h = this.c.wrapper.clientHeight || 150;
        this.container_w = this.c.wrapper.clientWidth || 500;
        this.body_h = this.c.body.clientHeight || 110;
    };

    Table.prototype.regenerate = function regenerate() {
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

    Table.prototype.translateHeader = function translateHeader(x) {
        if (x !== this.last_header_x) {
            this.header_style[_transformProperty2.default] = translate3d(x);
            this.last_header_x = x;
        }
    };

    Table.prototype.translateBody = function translateBody(x, y) {
        if (x !== this.last_body_x || y !== this.last_body_y) {
            this.body_style[_transformProperty2.default] = translate3d(x, y);
            this.last_body_x = x;
            this.last_body_y = y;
        }
    };

    Table.prototype.translateXScrollHandle = function translateXScrollHandle(x) {
        if (!this.c.static_mode && x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    };

    Table.prototype.translateYScrollHandle = function translateYScrollHandle(y) {
        if (!this.c.static_mode && y !== this.last_y_scroll_handle_y) {
            this.y_scroll_handle_style[_transformProperty2.default] = translate3d(0, y);
            this.last_y_scroll_handle_y = y;
        }
    };

    Table.prototype.performTranslations = function performTranslations(nextX, nextY) {
        this.translateHeader(nextX);
        this.translateBody(nextX, nextY);
        this.translateXScrollHandle(this.x_scroll_handle_position);
        this.translateYScrollHandle(this.y_scroll_handle_position);
    };

    Table.prototype.scrollUp = function scrollUp() {
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

    Table.prototype.scrollDown = function scrollDown() {
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

            this.next_y = applyDelta(applyDelta(this.y_max, this.y) % this.cell_h, this.next_y);

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

    Table.prototype.calculateVisibleTopRowIndex = function calculateVisibleTopRowIndex() {
        var targetY = arguments.length <= 0 || arguments[0] === undefined ? this.next_y : arguments[0];

        return this.rows[this.rows_ordered_by_y[Math.ceil(Math.abs(applyDelta(this.y_min, targetY) / this.cell_h))]].setIndex;
    };

    Table.prototype.unlockDragToScroll = function unlockDragToScroll() {
        this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
    };

    Table.prototype.applyNewColumnWidth = function applyNewColumnWidth(index, width) {
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

    Table.prototype.handleColumnResize = function handleColumnResize(delta) {
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

    Table.prototype.setAriaText = function setAriaText(text) {
        this.c.aria.innerText = text;
    };

    Table.prototype.setActiveRow = function setActiveRow(setIndex) {
        this.active_row = setIndex;
        this.rows.forEach(function (row) {
            row.active = row.setIndex === setIndex;
        });
    };

    Table.prototype.changeActiveRow = function changeActiveRow(delta) {
        var _this7 = this;

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
                return _this7.changeActiveRow(delta);
            });
        }

        this.next_active_row = null;
    };

    Table.prototype.discoverCellAndRowNodes = function discoverCellAndRowNodes(target) {
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

    Table.prototype.jumpToRowIndex = function jumpToRowIndex(index) {
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

    return Table;
}();

exports.default = Table;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVGFibGUvdGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU0saUJBQWlCLHFCQUF2QjtBQUNBLElBQU0sZ0JBQWdCLG9CQUF0Qjs7QUFFQSxTQUFTLFVBQVQsQ0FBb0IsS0FBcEIsRUFBMkIsR0FBM0IsRUFBZ0M7QUFDNUIsUUFBSSxRQUFRLENBQVosRUFBZTtBQUNYLGVBQU8sTUFBTSxDQUFOLEdBQVUsTUFBTSxLQUFoQixHQUF3QixNQUFNLEtBQXJDO0FBQ0g7O0FBRUQsV0FBTyxNQUFNLEtBQWI7QUFDSDs7QUFFRCxTQUFTLGlCQUFULENBQTJCLElBQTNCLEVBQWlDO0FBQzdCLFlBQVEsSUFBUjtBQUNBLGFBQUssR0FBTDtBQUNJLG1CQUFPLFFBQVA7O0FBRUosYUFBSyxFQUFMO0FBQ0ksbUJBQU8sV0FBUDs7QUFFSixhQUFLLEVBQUw7QUFDSSxtQkFBTyxTQUFQOztBQUVKLGFBQUssRUFBTDtBQUNJLG1CQUFPLE9BQVA7QUFYSjs7QUFjQSxXQUFPLElBQVA7QUFDSDs7QUFFRCxTQUFTLFdBQVQsR0FBb0M7QUFBQSxRQUFkLENBQWMseURBQVYsQ0FBVTtBQUFBLFFBQVAsQ0FBTyx5REFBSCxDQUFHOztBQUNoQyxXQUFPLGlCQUFpQixDQUFqQixHQUFxQixNQUFyQixHQUE4QixDQUE5QixHQUFrQyxVQUF6QztBQUNILEU7O0FBR0QsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQyxPQUFoQyxFQUF5QztBQUNyQyxRQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsS0FBZ0MsQ0FBOUQsRUFBaUU7QUFDN0QsYUFBSyxXQUFMLENBQWlCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQjtBQUNIOztBQUVELFFBQU0sT0FB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LFNBQUwsQ0FBZSxLQUFmLENBQXFCLGFBQXJCLENBQUosRUFBeUM7QUFDNUMsd0JBQVEsR0FBUixHQUFjLElBQWQ7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLFVBQVo7QUFDSDs7QUFFRCxlQUFPLE9BQVA7QUFDSCxLOztvQkFvQkQsYywyQkFBZSxLLEVBQU87QUFDbEIsYUFBSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDs7QUFFQSxhQUFLLFVBQUw7O0FBRUEsYUFBSyxxQkFBTCxHQUE2QixLQUE3QjtBQUNBLGFBQUssd0JBQUwsR0FBZ0MsUUFBUSxLQUFLLHVCQUE3Qzs7QUFFQSxZQUFJLEtBQUssd0JBQUwsR0FBZ0MsS0FBSyxvQkFBckMsR0FBNEQsS0FBSyxnQkFBckUsRUFBdUY7QUFDbkYsaUJBQUssd0JBQUwsR0FBZ0MsS0FBSyxnQkFBTCxHQUF3QixLQUFLLG9CQUE3RDtBQUNIOztBQUVELGFBQUssc0JBQUwsQ0FBNEIsS0FBSyx3QkFBakM7O0FBRUEsYUFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0gsSzs7Ozs7a0JBcmlDZ0IsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFRhYmxlXG4gKi9cblxuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5pbXBvcnQgZmluZFdoZXJlIGZyb20gJy4uLy4uL1VJVXRpbHMvZmluZFdoZXJlJztcbmltcG9ydCBub29wIGZyb20gJy4uLy4uL1VJVXRpbHMvbm9vcCc7XG5cbi8qXG5cbkZPUiBGVVRVUkUgRVlFU1xuXG5TY3JvbGwgcGVyZm9ybWFuY2UgaXMgYSB0cmlja3kgYmVhc3QgLS0gbW9yZXNvIHdoZW4gdHJ5aW5nIHRvIG1haW50YWluIDUwKyBGUFMgYW5kIHB1bXBpbmcgYSBsb3Qgb2YgZGF0YSB0byB0aGUgRE9NLiBUaGVyZSBhcmUgYSBsb3Qgb2YgY2hvaWNlcyBpbiB0aGlzIGNvbXBvbmVudCB0aGF0IG1heSBzZWVtIG9kZCBhdCBmaXJzdCBibHVzaCwgYnV0IGxldCBpdCBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG5cblRoZSBjb21iaW5hdGlvbiB0aGF0IHdhcyBzZXR0bGVkIHVwb24gaXMgYSBSZWFjdCBzaGVsbCB3aXRoIG5hdGl2ZSBET00gZ3V0cy4gVGhpcyBjb21iaW5hdGlvbiB5aWVsZHMgdGhlIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cblxuX19JbXBvcnRhbnQgTm90ZV9fXG5cbkFueSB0aW1lIHlvdSBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCwgbWFrZSBzdXJlIHlvdSByZWxlYXNlIGl0IGFmdGVyIGJ5IHNldHRpbmcgaXRzIHZhcmlhYmxlIHRvIGBudWxsYC4gSWYgeW91IGRvbid0LCBpdCdsbCBjcmVhdGUgYSBtZW1vcnkgbGVhay4gQWxzbywgbWFrZSBzdXJlIGFsbCBnZW5lcmF0ZWQgRE9NIGlzIHJlbW92ZWQgb24gY29tcG9uZW50V2lsbFVubW91bnQuXG5cblxuT1JERVIgT0YgT1BFUkFUSU9OU1xuXG4xLiByZW5kZXIgb25lIHJvdyBvZiBjZWxsc1xuMi4gY2FwdHVyZSB0YWJsZSAmIGNlbGwgc2l6aW5nIG1ldHJpY3NcbjMuIHJlbmRlciBjb2x1bW4gaGVhZHMgYW5kIHRoZSByZXN0IG9mIHRoZSBjZWxsc1xuXG5JZiB0aGUgY29tcG9uZW50IHVwZGF0ZXMgZHVlIHRvIG5ldyBwcm9wcywganVzdCBibG93IGF3YXkgZXZlcnl0aGluZyBhbmQgc3RhcnQgb3Zlci4gSXQncyBjaGVhcGVyIHRoYW4gdHJ5aW5nIHRvIGRpZmYuXG5cbiovXG5cbmNvbnN0IGNlbGxDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1jZWxsXFxiL2c7XG5jb25zdCByb3dDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3dcXGIvZztcblxuZnVuY3Rpb24gYXBwbHlEZWx0YShkZWx0YSwgbnVtKSB7XG4gICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICByZXR1cm4gbnVtIDwgMCA/IG51bSAtIGRlbHRhIDogbnVtICsgZGVsdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bSAtIGRlbHRhO1xufVxuXG5mdW5jdGlvbiBnZXRLZXlGcm9tS2V5Q29kZShjb2RlKSB7XG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAxOTI6XG4gICAgICAgIHJldHVybiAnRXNjYXBlJztcblxuICAgIGNhc2UgNDA6XG4gICAgICAgIHJldHVybiAnQXJyb3dEb3duJztcblxuICAgIGNhc2UgMzg6XG4gICAgICAgIHJldHVybiAnQXJyb3dVcCc7XG5cbiAgICBjYXNlIDEzOlxuICAgICAgICByZXR1cm4gJ0VudGVyJztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlM2QgKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn07IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG5cbmZ1bmN0aW9uIHJlcGFyZW50Q2VsbFRleHQobm9kZSwgY29udGVudCkge1xuICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoICYmIG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwtaW5uZXInO1xuXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgICB0ZXh0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblxuICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICByZXR1cm4gdGV4dE5vZGU7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNlbGwuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwgJztcbiAgICBjZWxsLmNsYXNzTmFtZSArPSBpbmRleCAlIDIgPT09IDAgPyAndWktdGFibGUtY2VsbC1ldmVuJyA6ICd1aS10YWJsZS1jZWxsLW9kZCc7XG5cbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nLCBtYXBwaW5nKTtcbiAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpKTtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICByZXBhcmVudENlbGxUZXh0KGNlbGwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVET01DZWxsKGNvbHVtbi50aXRsZSwgY29sdW1uLm1hcHBpbmcsIHdpZHRoLCBpbmRleCk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAoY29sdW1uLnJlc2l6YWJsZSkge1xuICAgICAgICBjb25zdCBoYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJztcblxuICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJDZWxsKG1ldGFkYXRhLCBpbmRleCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01IZWFkZXJDZWxsKG1ldGFkYXRhLCBtZXRhZGF0YS53aWR0aCwgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19tZXRhZGF0YSc6IG1ldGFkYXRhLFxuICAgICAgICAnX3RpdGxlJzogbWV0YWRhdGEudGl0bGUsXG4gICAgICAgIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9LFxuICAgICAgICBzZXQgdGl0bGUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl90aXRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fdGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiBtZXRhZGF0YS53aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1hcHBpbmc6IG1ldGFkYXRhLm1hcHBpbmcsXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl9jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRydWVXaWR0aDogZnVuY3Rpb24gdHJ1ZVdpZHRoKCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDbGFzc2VzID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIHRha2Ugb2ZmIHRoZSBpbm5lciBjbGFzcyB3aGljaCBpcyB3aGF0IGNhdXNlcyB0aGUgc2l6aW5nIGNvbnN0cmFpbnRcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSAnJztcblxuICAgICAgICAgICAgLyogQ2FwdHVyZSB0aGUgbmV3IGFkanVzdGVkIHNpemUsIGhhdmUgdG8gdXNlIHRoZSBoYXJkIHdheSBiZWNhdXNlIC5jbGllbnRXaWR0aCByZXR1cm5zIGFuIGludGVnZXIgdmFsdWUsIHJhdGhlciB0aGFuIHRoZSBfYWN0dWFsXyB3aWR0aC4gU01ILiAqL1xuICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgICAgIC8vIFB1dCBldmVyeXRoaW5nIGJhY2tcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9IGNoaWxkQ2xhc3NlcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVET01Sb3coc2V0SW5kZXgsIHkpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLXJvdyc7XG4gICAgICAgICAgcm93LnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG5cbiAgICByZXR1cm4gcm93O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUm93KG1ldGFkYXRhLCBjb2x1bW5zKSB7XG4gICAgLyogSU1QT1JUQU5UIE5PVEU6IG1ldGFkYXRhLmRhdGEgbWlnaHQgYmUgYSBwcm9taXNlLiBQbGFuIGFjY29yZGluZ2x5LiAqL1xuXG4gICAgY29uc3Qgcm93ID0gY3JlYXRlRE9NUm93KG1ldGFkYXRhLnNldEluZGV4LCBtZXRhZGF0YS55KTtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIGNlbGxzLnB1c2goY3JlYXRlQ2VsbCgnJywgY29sdW1uLm1hcHBpbmcsIGNvbHVtbi53aWR0aCwgaW5kZXgpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbHNbaW5kZXhdLm5vZGUpO1xuICAgIH0pO1xuXG4gICAgcm93LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICBmcmFnbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCByb3dPYmogPSB7XG4gICAgICAgIG5vZGU6IHJvdyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICAnX2l0ZXJhdG9yJzogbnVsbCxcbiAgICAgICAgJ19hY3RpdmUnOiBmYWxzZSxcbiAgICAgICAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfSxcbiAgICAgICAgc2V0IGFjdGl2ZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19zZXRJbmRleCc6IG51bGwsXG4gICAgICAgIGdldCBzZXRJbmRleCgpIHsgcmV0dXJuIHRoaXMuX3NldEluZGV4OyB9LFxuICAgICAgICBzZXQgc2V0SW5kZXgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zZXRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LWV2ZW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LW9kZCcsICd1aS10YWJsZS1yb3ctZXZlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LW9kZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctZXZlbicsICd1aS10YWJsZS1yb3ctb2RkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHZhbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbmRleCA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193YWl0aW5nRm9yUmVzb2x1dGlvbic6IGZhbHNlLFxuICAgICAgICBnZXQgd2FpdGluZ0ZvclJlc29sdXRpb24oKSB7IHJldHVybiB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbjsgfSxcbiAgICAgICAgc2V0IHdhaXRpbmdGb3JSZXNvbHV0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctbG9hZGluZycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWxvYWRpbmcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJywgJycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfZGF0YSc6IG51bGwsXG4gICAgICAgIGdldCBkYXRhKCkgeyByZXR1cm4gdGhpcy5fZGF0YTsgfSxcbiAgICAgICAgc2V0IGRhdGEodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhID09PSBudWxsIHx8IHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCByZXNvbHZlZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc29sdmVkVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLl9kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbdGhpcy5faXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVtjb2x1bW5zW3RoaXMuX2l0ZXJhdG9yXS5tYXBwaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG4gICAgcm93T2JqLmFjdGl2ZSA9IG1ldGFkYXRhLmFjdGl2ZTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSBzbyB0aGUgUHJvbWlzZSBoYW5kbGluZyBjYW4gdGFrZSBwbGFjZSBpZiBuZWVkZWQuLi5cbiAgICByb3dPYmouZGF0YSA9IG1ldGFkYXRhLmRhdGE7XG5cbiAgICByZXR1cm4gcm93T2JqO1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVDb2x1bW5TaGFwZShjb2x1bW4pIHtcbiAgICByZXR1cm4gICAgdHlwZW9mIGNvbHVtbi5tYXBwaW5nID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnJlc2l6YWJsZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4udGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICYmIChjb2x1bW4ud2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgY29sdW1uLndpZHRoID09PSAnbnVtYmVyJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAvLyB4LXNjcm9sbC10cmFjaywgeS1zY3JvbGwtdHJhY2ssIHgtc2Nyb2xsLWhhbmRsZSwgeS1zY3JvbGwtaGFuZGxlLCBhbmQgYXJpYSBhcmUgbm90IHJlcXVpcmVkIGluIHN0YXRpY19tb2RlXG4gICAgaWYgKGNvbmZpZy5zdGF0aWNfbW9kZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuc3RhdGljX21vZGUgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgc3RhdGljX21vZGVgOyBpdCBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgIH1cblxuICAgIGlmICghKGNvbmZpZy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB3cmFwcGVyYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNvbmZpZy5oZWFkZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGhlYWRlcmAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShjb25maWcuYm9keSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYm9keWAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5zdGF0aWNfbW9kZSAmJiAhKGNvbmZpZ1sneC1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWdbJ3ktc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnWyd4LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnWyd5LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnLmFyaWEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGFyaWFgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCAgICFBcnJheS5pc0FycmF5KGNvbmZpZy5jb2x1bW5zKVxuICAgICAgICB8fCBjb25maWcuY29sdW1ucy5sZW5ndGggPT09IDBcbiAgICAgICAgfHwgIWNvbmZpZy5jb2x1bW5zLmV2ZXJ5KHZhbGlkYXRlQ29sdW1uU2hhcGUpKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBUYWJsZSB3YXMgbm90IHBhc3NlZCB2YWxpZCBcXGBjb2x1bW5zXFxgLiBJdCBzaG91bGQgYmUgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgb2JqZWN0IGNvbmZvcm1pbmcgdG86IHtcbiAgICAgICAgICAgIG1hcHBpbmc6IHN0cmluZyxcbiAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogbnVtYmVyIChvcHRpb25hbCksXG4gICAgICAgIH1gKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy50aHJvdHRsZUludGVydmFsICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgdGhyb3R0bGVJbnRlcnZhbGA7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy50b3RhbFJvd3MgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0b3RhbFJvd3NgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcuZ2V0Um93ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBnZXRSb3dgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLnJvd0NsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcucm93Q2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGByb3dDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNlbGxDbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmNlbGxDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNlbGxDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNvbHVtblJlc2l6ZUZ1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmNvbHVtblJlc2l6ZUZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNvbHVtblJlc2l6ZUZ1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5wcmVzZXJ2ZVNjcm9sbFN0YXRlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHByZXNlcnZlU2Nyb2xsU3RhdGVgOyBpdCBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUge1xuICAgIHByb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZykge1xuICAgICAgICB0aGlzLmMgPSB7Li4uY29uZmlnfTtcblxuICAgICAgICAvLyBmYWxsYmFjayB2YWx1ZXNcbiAgICAgICAgdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPSB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlO1xuICAgICAgICB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCA9IHRoaXMuYy50aHJvdHRsZUludGVydmFsIHx8IDMwMDtcbiAgICAgICAgdGhpcy5jLnRvdGFsUm93cyA9IHRoaXMuYy50b3RhbFJvd3MgfHwgMDtcblxuICAgICAgICB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24odGhpcy5jKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpO1xuXG4gICAgICAgIHRoaXMuYm9keSA9IHRoaXMuYy5ib2R5O1xuICAgICAgICB0aGlzLmJvZHlfc3R5bGUgPSB0aGlzLmJvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5jLmhlYWRlcjtcbiAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGUgPSB0aGlzLmhlYWRlci5zdHlsZTtcblxuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNldEludGVybmFscygpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZlUm93KCk7XG5cbiAgICAgICAgLyogdXNlZCBpbiBzY3JvbGwgc3RhdGUgcHJlc2VydmF0aW9uIGNhbGN1bGF0aW9ucyAqL1xuICAgICAgICB0aGlzLl9feCA9IHRoaXMuX195ID0gdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcblxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcblxuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIC8vIHJlbGVhc2UgY2FjaGVkIERPTSBub2Rlc1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNba2V5XSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldEFjdGl2ZVJvdygpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gLTE7XG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm5fcGFkZGluZ19yb3dzID0gMztcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMubmV4dF95ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5jWyd5LXNjcm9sbC10cmFjayddKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCA9ICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5jWyd4LXNjcm9sbC10cmFjayddKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnQgPSAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5pID0gbnVsbDtcbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMucHRyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICAvLyB0cmFuc2xhdGlvbiBjYWNoZXNcbiAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5ldnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IG51bGw7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7XG4gICAgfVxuXG4gICAgZW1wdHlIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmhlYWRlci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVDaGlsZCh0aGlzLmhlYWRlci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuXG4gICAgICAgIHRoaXMuYy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uLCBpbmRleCkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IGNzO1xuXG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbHVtbi5ub2RlKTtcblxuICAgICAgICAgICAgY29sdW1uLm1pbldpZHRoID0gcGFyc2VJbnQoY3NbJ21pbi13aWR0aCddLCAxMCk7XG4gICAgICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSBwYXJzZUludChjc1snbWF4LXdpZHRoJ10sIDEwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLmNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBlbXB0eUJvZHkoKSB7XG4gICAgICAgIHRoaXMucm93cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93LFxuICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdyh0aGlzLnJvd19zdGFydF9pbmRleCksXG4gICAgICAgICAgICBzZXRJbmRleDogdGhpcy5yb3dfc3RhcnRfaW5kZXgsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCB0aGlzLmNvbHVtbnMpKTtcblxuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2goMCk7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMucm93c1swXS5ub2RlKTtcbiAgICB9XG5cbiAgICBpbmplY3RSZXN0T2ZSb3dzKCkge1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGZvciAodGhpcy5pID0gMTsgdGhpcy5pIDwgdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7IHRoaXMuaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdyxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMuaSArIHRoaXMucm93X3N0YXJ0X2luZGV4KSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXgsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5jZWxsX2ggKiB0aGlzLmksXG4gICAgICAgICAgICB9LCB0aGlzLmNvbHVtbnMpKTtcblxuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMuaSk7XG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMucm93c1t0aGlzLmldLm5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5jZWxsX2ggPSB0aGlzLnJvd3NbMF0uY2VsbHNbMF0ubm9kZS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbFdpZHRocygpIHtcbiAgICAgICAgdGhpcy5yb3dzWzBdLmNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoID0gdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCB8fCBjZWxsLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjZWxsLndpZHRoID0gdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWEJvdW5kKCkge1xuICAgICAgICB0aGlzLnJvd193ID0gdGhpcy5yb3dzWzBdLm5vZGUuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLnhfbWF4ID0gdGhpcy5jb250YWluZXJfdyA8PSB0aGlzLnJvd193ID8gdGhpcy5jb250YWluZXJfdyAtIHRoaXMucm93X3cgOiAwO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVlCb3VuZCgpIHtcbiAgICAgICAgdGhpcy55X21pbiA9IDA7XG4gICAgICAgIHRoaXMueV9tYXggPSB0aGlzLmJvZHlfaCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkICogdGhpcy5jZWxsX2g7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLyB0aGlzLnJvd193ICogdGhpcy54X3Njcm9sbF90cmFja193O1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy54X3Njcm9sbF90cmFja193O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSAgIHRoaXMubl9yb3dzX3Zpc2libGUgPT09IHRoaXMubl9yb3dzX3JlbmRlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY29udGFpbmVyX2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5jb250YWluZXJfaCAqICh0aGlzLm5fcm93c192aXNpYmxlIC8gdGhpcy5jLnRvdGFsUm93cyk7XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRXaWR0aCB8fCB0aGlzLmNvbnRhaW5lcl93O1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50SGVpZ2h0IHx8IDg7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgdGhpcy5jb250YWluZXJfaDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZS5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuXG4gICAgICAgIC8qIHRvdGFsIHRyYW5zbGF0YWJsZSBzcGFjZSAvIHNjcm9sbGJhciB0cmFjayBzaXplID0gcmVsYXRpdmUgdmFsdWUgb2YgYSBzY3JvbGxiYXIgcGl4ZWwgKi9cbiAgICAgICAgdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvID0gTWF0aC5hYnModGhpcy54X21heCkgLyAodGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSk7XG5cbiAgICAgICAgLyogaG93IG1hbnkgc2Nyb2xsYmFyIHBpeGVscyA9PT0gb25lIHJvdz8gKi9cbiAgICAgICAgdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbyA9ICh0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplKSAvICh0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5uX3Jvd3NfdmlzaWJsZSk7XG5cbiAgICAgICAgLyogaGlkZSB0aGUgc2Nyb2xsYmFycyBpZiB0aGV5IGFyZSBub3QgbmVlZGVkICovXG5cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl9oID0gdGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0IHx8IDE1MDtcbiAgICAgICAgdGhpcy5jb250YWluZXJfdyA9IHRoaXMuYy53cmFwcGVyLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy5ib2R5X2ggPSB0aGlzLmMuYm9keS5jbGllbnRIZWlnaHQgfHwgMTEwO1xuICAgIH1cblxuICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5jb250YWluZXJfaCkge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIG1heSBiZSBuZWVkZWQgdG8gZGlzcGxheSB0aGUgZGF0YSwgc28gd2UgbmVlZCB0byByZWJ1aWxkICovXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggIT09IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZF93aWR0aCA9IHRoaXMuY29udGFpbmVyX3c7XG5cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnggLyB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8gKiAtMTtcblxuICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcblxuICAgICAgICAgICAgLy8gZ2V0dGluZyBsYXJnZXIgYW5kIHdlJ3JlIGZ1bGx5IHNjcm9sbGVkIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgaWYgKG9sZF93aWR0aCA8IHRoaXMuY29udGFpbmVyX3cgJiYgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5jb250YWluZXJfdyAtIG9sZF93aWR0aDtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlSGVhZGVyKHRoaXMueCk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVCb2R5KHRoaXMueCwgdGhpcy5sYXN0X2JvZHlfeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSB0aGlzLmMpIHsgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpOyB9XG5cbiAgICAgICAgLyogc3RvcmVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB1bmlvbiBmb3IgaWYgd2UgbmVlZCB0byByZWh5ZHJhdGUgdGhlIHByZXZpb3VzIHNjcm9sbCBzdGF0ZSAqL1xuICAgICAgICB0aGlzLl9feCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5fX3kgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleDtcblxuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlUm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmJ1aWxkQ29sdW1ucygpO1xuXG4gICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID0gdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPyB0aGlzLl9fcm93X3N0YXJ0X2luZGV4IHx8IDAgOiAwO1xuXG4gICAgICAgIHRoaXMuaW5qZWN0Rmlyc3RSb3coKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsV2lkdGhzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbEhlaWdodCgpO1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3JlbmRlcmVkID0gTWF0aC5jZWlsKHRoaXMuYm9keV9oIC8gdGhpcy5jZWxsX2gpICsgdGhpcy5uX3BhZGRpbmdfcm93cztcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfcmVuZGVyZWQgPiB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IHRoaXMuYy50b3RhbFJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5fcm93c192aXNpYmxlID0gTWF0aC5mbG9vcih0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdmlzaWJsZSA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5fcm93c192aXNpYmxlID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleCArIHRoaXMubl9yb3dzX3JlbmRlcmVkIC0gMTtcblxuICAgICAgICB0aGlzLmluamVjdEhlYWRlckNlbGxzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UmVzdE9mUm93cygpO1xuXG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVZQm91bmQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgJiYgdGhpcy5fX3ggIT09IG51bGwgJiYgdGhpcy5fX3kgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvKiB0aGUgY2FjaGVkIHZhbHVlcyBhcmUgdGhlbiBhcHBsaWVkIGFnYWluc3QgdGhlIHRhYmxlIHRvIGFycml2ZSBhdCB0aGUgcHJldmlvdXMgc3RhdGUgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogLXRoaXMuX194LFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IC10aGlzLl9feSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9feCA9IHRoaXMuX195ID0gdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlSGVhZGVyKHgpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF9oZWFkZXJfeCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVCb2R5KHgsIHkpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF9ib2R5X3ggfHwgeSAhPT0gdGhpcy5sYXN0X2JvZHlfeSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5X3N0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfYm9keV94ID0geDtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh4KSB7XG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlICYmIHggIT09IHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUgJiYgeSAhPT0gdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95KSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBlcmZvcm1UcmFuc2xhdGlvbnMobmV4dFgsIG5leHRZKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlSGVhZGVyKG5leHRYKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVCb2R5KG5leHRYLCBuZXh0WSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2Nyb2xsVXAoKSB7XG4gICAgICAgIC8qIGF0IHRoZSBsb2dpY2FsIHN0YXJ0IG9mIHRoZSB0YWJsZSAocm93IGluZGV4IDApIHdlIHRydW5jYXRlIHVwd2FyZCBzY3JvbGwgYXR0ZW1wdHNcbiAgICAgICAgICAgdG8gdGhlIHVwcGVyIHRyYW5zbGF0aW9uIGJvdW5kYXJ5IHRvIGtlZXAgZnJvbSBza2lwcGluZyBvZmYgaW50byBub3RoaW5nbmVzcyAqL1xuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCAmJiB0aGlzLm5leHRfeSA+IHRoaXMueV9taW4pIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55X21pbjtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSAwIHx8IHRoaXMubmV4dF95IDw9IHRoaXMueV9taW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIHVwLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIGJvdHRvbSBwb3NpdGlvbiB0byB0aGUgdG9wXG4gICAgICAgICAgIChhYm92ZSB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWluKSAvIHRoaXMuY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgLyogcHJldmVudCB1bmRlci1yb3RhdGluZyBiZWxvdyBpbmRleCB6ZXJvLCB0aGUgbG9naWNhbCBzdGFydCBvZiBhIGRhdGEgc2V0ICovXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMubl9yb3dzX3RvX3NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gTWF0aC5hYnModGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCkgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgZGVjcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBtb3ZlIHRoZSBoaWdoZXN0IFktdmFsdWUgcm93cyB0byB0aGUgdG9wIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXggPSB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIGZvciAodGhpcy5pdGVyYXRvciA9IDE7IHRoaXMuaXRlcmF0b3IgPD0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7IHRoaXMuaXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLml0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSB0aGlzLnJvd3NbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXhdXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyLmRhdGEgPSB0aGlzLmRyYWdfdGltZXIgPyBudWxsIDogdGhpcy5jLmdldFJvdyh0aGlzLnRhcmdldF9pbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuc2V0SW5kZXggPSB0aGlzLnRhcmdldF9pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci55ID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dLnkgLSB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5hY3RpdmUgPSB0aGlzLnRhcmdldF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS51bnNoaWZ0KHRoaXMucm93c19vcmRlcmVkX2J5X3kucG9wKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCAtPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCAtPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiArPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCArPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsRG93bigpIHtcbiAgICAgICAgLyogYXQgdGhlIGxvZ2ljYWwgZW5kIG9mIHRoZSB0YWJsZSAocm93IGluZGV4IG4pIHdlIHRydW5jYXRlIGFueSBzY3JvbGwgYXR0ZW1wdHMgICovXG4gICAgICAgIGlmICh0aGlzLnJvd19lbmRfaW5kZXggPj0gdGhpcy5jLnRvdGFsUm93cyAtIDEgJiYgdGhpcy5uZXh0X3kgPD0gdGhpcy55X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnlfbWF4O1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy54X3Njcm9sbF90cmFja19oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+PSB0aGlzLnlfbWF4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIHRvcCBwb3NpdGlvbiB0byB0aGUgYm90dG9tXG4gICAgICAgICAgIChiZWxvdyB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21heCkgLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ICsgdGhpcy5yb3dfZW5kX2luZGV4ICsgMSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ICs9IChcbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCAtICh0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5yb3dfZW5kX2luZGV4IC0gKHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID09PSAwID8gMCA6IDEpKVxuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IGFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgYXBwbHlEZWx0YSh0aGlzLnlfbWF4LCB0aGlzLnkpICUgdGhpcy5jZWxsX2gsIHRoaXMubmV4dF95XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy54X3Njcm9sbF90cmFja19oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGluY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ICs9IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ICs9IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh0aGlzLml0ZXJhdG9yID0gMTsgdGhpcy5pdGVyYXRvciA8PSB0aGlzLm5fcm93c190b19zaGlmdDsgdGhpcy5pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSB0aGlzLnJvd19lbmRfaW5kZXggKyB0aGlzLml0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgLyogdGhlIHBhZGRpbmcgcm93cyB3aWxsIGV4Y2VlZCB0aGUgbWF4aW11bSBpbmRleCBmb3IgYSBkYXRhIHNldCBvbmNlIHRoZSB1c2VyIGhhcyBmdWxseSB0cmFuc2xhdGVkIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbiAqL1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyLmRhdGEgPSB0aGlzLmRyYWdfdGltZXIgPyBudWxsIDogdGhpcy5jLmdldFJvdyh0aGlzLnRhcmdldF9pbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuc2V0SW5kZXggPSB0aGlzLnRhcmdldF9pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci55ID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggLSAxXV0ueSArIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLmFjdGl2ZSA9IHRoaXMudGFyZ2V0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5yb3dzX29yZGVyZWRfYnlfeS5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCh0YXJnZXRZID0gdGhpcy5uZXh0X3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1tcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbXG4gICAgICAgICAgICAgICAgTWF0aC5jZWlsKE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9taW4sIHRhcmdldFkpIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgXVxuICAgICAgICBdLnNldEluZGV4O1xuICAgIH1cblxuICAgIGhhbmRsZU1vdmVJbnRlbnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoZXZlbnQuZGVsdGFYID09PSAwICAgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZGVsdGFfeCA9IGV2ZW50LmRlbHRhWDtcblxuICAgICAgICAvLyBkZWx0YU1vZGUgMCA9PT0gcGl4ZWxzLCAxID09PSBsaW5lc1xuICAgICAgICB0aGlzLmRlbHRhX3kgPSAgIGV2ZW50LmRlbHRhTW9kZSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSwgMTApICogdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICAgICAgICAgOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnggOiB0aGlzLnggLSB0aGlzLmRlbHRhX3g7XG4gICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy54X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnkgOiB0aGlzLnkgLSB0aGlzLmRlbHRhX3k7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF94ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF94IDwgdGhpcy54X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnhfbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbmVnYXRlIHRoZSB2ZXJ0aWNhbCBtb3ZlbWVudCwgbm90IGVub3VnaCByb3dzIHRvIGZpbGwgdGhlIGJvZHkgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95IDwgdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlc2V0X3RpbWVyKTsgfVxuXG4gICAgICAgIC8qIHJlc2V0IHJvdyAmIHdyYXBwZXIgWSB2YWx1ZXMgdG93YXJkIDAgdG8gcHJldmVudCBvdmVyZmxvd2luZyAqL1xuICAgICAgICB0aGlzLnJlc2V0X3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gcmVzZXRZQXhpcyhpbnN0YW5jZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF9kZWx0YSA9IGluc3RhbmNlLnlfbWluO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHBvc2l0aW9uaW5nIHZhcmlhYmxlcyAqL1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9taW4gPSBhcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21pbik7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21heCA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWF4KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSByb3dzICovXG4gICAgICAgICAgICBpbnN0YW5jZS5yb3dzX29yZGVyZWRfYnlfeS5mb3JFYWNoKChwb3NpdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5yb3dzW3Bvc2l0aW9uXS55ID0gaW5kZXggKiBpbnN0YW5jZS5jZWxsX2g7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgdGhlIHdyYXBwZXIgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnRyYW5zbGF0ZUJvZHkoaW5zdGFuY2UueCwgaW5zdGFuY2UueSk7XG5cbiAgICAgICAgfSwgMTAwLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IHRoaXMuY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KCk7XG5cbiAgICAgICAgLyogcXVldWUgdXAgdHJhbnNsYXRpb25zIGFuZCB0aGUgYnJvd3NlciB3aWxsIGV4ZWN1dGUgdGhlbSBhcyBhYmxlLCBuZWVkIHRvIHBhc3MgaW4gdGhlIHZhbHVlcyB0aGF0IHdpbGwgY2hhbmdlIGR1ZSB0byBtb3JlIGhhbmRsZU1vdmVJbnRlbnQgaW52b2NhdGlvbnMgYmVmb3JlIHRoaXMgckFGIGV2ZW50dWFsbHkgZXhlY3V0ZXMuICovXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gckFGKG5leHRYLCBjdXJyWCwgbmV4dFksIHZpc2libGVUb3BSb3dJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArPSAoKG5leHRYIC0gY3VyclgpIC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvKSAqIC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHZpc2libGVUb3BSb3dJbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucyhuZXh0WCwgbmV4dFkpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLm5leHRfeCwgdGhpcy54LCB0aGlzLm5leHRfeSwgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXgpKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLm5leHRfeDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5uZXh0X3k7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogd2UgaGFuZGxlIHRvdWNobW92ZSBieSBkZXRlY3RpbmcgdGhlIGRlbHRhIG9mIHBhZ2VYL1kgYW5kIGZvcndhcmRpbmdcbiAgICAgICAgaXQgdG8gaGFuZGxlTW92ZUludGVudCgpICovXG5cbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVggLSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgLSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3gsIGV2ZW50LnBhZ2VYIC0gdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnRcbiAgICAgICAgICAgICkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW9cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcFxuICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIGFkanVzdHMgZm9yIHRoZSBwaXhlbCBkaXN0YW5jZSBiZXR3ZWVuIHdoZXJlIHRoZSBoYW5kbGUgaXMgY2xpY2tlZCBhbmQgdGhlIHRvcCBlZGdlIG9mIGl0OyB0aGUgaGFuZGxlIGlzIHBvc2l0aW9uZWQgYWNjb3JkaW5nIHRvIGl0cyB0b3AgZWRnZSAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX29mZnNldCA9IGV2ZW50Lm9mZnNldFk7XG5cbiAgICAgICAgdGhpcy55X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnX3RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5kcmFnX3RpbWVyKTsgfVxuXG4gICAgICAgICAgICAvKiB4LWF4aXMgZG9lc24ndCBuZWVkIHRocm90dGxlIHByb3RlY3Rpb24gc2luY2UgaXQgZG9lc24ndCBjYXVzZSBhIHJvdyBmZXRjaCAqL1xuICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvKiBOb3cgZmV0Y2gsIG9uY2UgZHJhZyBoYXMgY2Vhc2VkIGZvciBsb25nIGVub3VnaC4gKi9cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5kYXRhID0gdGhpcy5jLmdldFJvdyhyb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgIGFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wIC0gdGhpcy55X3Njcm9sbF9vZmZzZXRcbiAgICAgICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IChldmVudC5wYWdlWCAtIHRoaXMubGFzdF9wYWdlWCkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW87XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbHVtblJlc2l6ZShldmVudC5wYWdlWCAtIHRoaXMubGFzdF9jb2x1bW5feCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5sb2NrRHJhZ1RvU2Nyb2xsKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW5kID0gKCkgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyogdGhlIGJyb3dzZXIgZmlyZXMgdGhlIG1vdXNldXAgYW5kIGNsaWNrIGV2ZW50cyBzaW11bHRhbmVvdXNseSwgYW5kIHdlIGRvbid0IHdhbnQgb3VyIGNsaWNrIGhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQsIHNvIGEgemVyby1kZWxheSBzZXRUaW1lb3V0IHdvcmtzIGhlcmUgdG8gbGV0IHRoZSBzdGFjayBjbGVhciBiZWZvcmUgYWxsb3dpbmcgY2xpY2sgZXZlbnRzIGFnYWluLiAqL1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVubG9ja0RyYWdUb1Njcm9sbCgpLCAwKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZScpIHtcbiAgICAgICAgICAgIC8vIEZpeGVzIGRyYWdTdGFydCBvY2Nhc2lvbmFsbHkgaGFwcGVuaW5nIGFuZCBicmVha2luZyB0aGUgc2ltdWxhdGVkIGRyYWdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgICAgICB0aGlzLmNvbHVtbl9pc19yZXNpemluZyA9IGZpbmRXaGVyZSh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB3aWR0aCkge1xuICAgICAgICB0aGlzLmMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgLy8gdGhlIHByb3ZpZGVkIGNvbmZpZyBvYmplY3RzXG4gICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgICAvLyB0aGUgY29sdW1uIG5vZGVzXG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuY2VsbHNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jLm9uQ29sdW1uUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLmMub25Db2x1bW5SZXNpemUodGhpcy5jb2x1bW5zW2luZGV4XS5tYXBwaW5nLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpO1xuICAgICAgICBsZXQgYWRqdXN0ZWRfZGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWRfZGVsdGEgPCAwXG4gICAgICAgICAgICAmJiAhaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhKTtcblxuICAgICAgICAvKiBJZiBhIGNvbHVtbiBzaHJpbmtzLCB0aGUgd3JhcHBlciBYIHRyYW5zbGF0aW9uIG5lZWRzIHRvIGJlIGFkanVzdGVkIGFjY29yZGluZ2x5IG9yXG4gICAgICAgIHdlJ2xsIHNlZSB1bndhbnRlZCB3aGl0ZXNwYWNlIG9uIHRoZSByaWdodCBzaWRlLiBJZiB0aGUgdGFibGUgd2lkdGggYmVjb21lcyBzbWFsbGVyIHRoYW5cbiAgICAgICAgdGhlIG92ZXJhbGwgY29udGFpbmVyLCB3aGl0ZXNwYWNlIHdpbGwgYXBwZWFyIHJlZ2FyZGxlc3MuICovXG4gICAgICAgIGlmIChhZGp1c3RlZF9kZWx0YSA8IDAgJiYgdGhpcy5yb3dfdyArIHRoaXMueCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gYWRqdXN0ZWRfZGVsdGE7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZpbmRXaGVyZSh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgbWFwcGluZyk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbHVtbik7XG5cbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGNvbHVtbi53aWR0aDtcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGg7XG5cbiAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEocm93LmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSAmJiByb3cuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdLnRydWVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoIDwgY2VsbFdpZHRoID8gY2VsbFdpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8qIGZpbmQgdGhlIHJlbmRlcmVkIHJvdyB3aXRoIHRoZSBsb25nZXN0IGNvbnRlbnQgZW50cnkgKi9cblxuICAgICAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRBcmlhVGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMuYy5hcmlhLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlUm93KHNldEluZGV4KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlX3JvdyA9IHNldEluZGV4O1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmFjdGl2ZSA9IHJvdy5zZXRJbmRleCA9PT0gc2V0SW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ICsgZGVsdGEgPj0gdGhpcy5jLnRvdGFsUm93cykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X2FjdGl2ZV9yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHRoaXMubmV4dF9hY3RpdmVfcm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5uZXh0X2FjdGl2ZV9yb3cuZGF0YVt0aGlzLmNvbHVtbnNbMF0ubWFwcGluZ10pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPiB0aGlzLnkpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA8IHRoaXMueSAtIHRoaXMuYm9keV9oICsgdGhpcy5jZWxsX2gpXG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5jZWxsX2ggKiBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoICAgKGRlbHRhIDwgMCAmJiB0aGlzLmFjdGl2ZV9yb3cgPiAwKVxuICAgICAgICAgICAgICAgICAgIHx8IChkZWx0YSA+IDAgJiYgdGhpcy5hY3RpdmVfcm93IDwgdGhpcy5jLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93biBpbiB0aGUgdmlld3BvcnQuICovXG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gKCAgICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPiB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPCB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZGVsdGEpICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBwcm9jZXNzIGFnYWluLCBub3cgdGhhdCB0aGUgcm93IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5IHx8IGdldEtleUZyb21LZXlDb2RlKGV2ZW50LmtleUNvZGUpO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlUm93KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEgLy8gYWxyZWFkeSBrZXlpbmcgdGhyb3VnaCB0aGUgdGFibGVcbiAgICAgICAgICAgICAgICB8fCAodGhpcy5hY3RpdmVfcm93ID09PSAtMSAmJiB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCkgLy8gYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBhY3RpdmUgcm93IG9uIHRoZSB0b3Btb3N0IHJvdyBpbiB0aGUgY3VycmVudCB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KHRoaXMucm93X3N0YXJ0X2luZGV4ICsgdGhpcy5uX3BhZGRpbmdfcm93cyArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzY292ZXJDZWxsQW5kUm93Tm9kZXModGFyZ2V0KSB7XG4gICAgICAgIGxldCBub2RlID0gdGFyZ2V0O1xuICAgICAgICBjb25zdCBub2RlTWFwID0ge307XG5cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvdzogbm9kZX07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoKCFub2RlTWFwLmNlbGwgfHwgIW5vZGVNYXAucm93KSAmJiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2goY2VsbENsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLnJvdyA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZU1hcDtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKG1hcC5yb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHJvdy5zZXRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChtYXAuY2VsbCAmJiB0aGlzLmMuY2VsbENsaWNrRnVuYykge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgsIG1hcC5jZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmMucm93Q2xpY2tGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLnJvd0NsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGp1bXBUb1Jvd0luZGV4KGluZGV4KSB7XG4gICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMueSA9IDA7XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSBpbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyhpbmRleCk7XG4gICAgfVxufVxuIl19