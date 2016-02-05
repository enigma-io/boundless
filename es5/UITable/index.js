'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _transform = require('../UIUtils/transform');

var _transform2 = _interopRequireDefault(_transform);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _findWhere = require('../UIUtils/findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A high-performance, infinite table view.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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

var cellClassRegex = /\s?ui-table-cell\b/g;
var rowClassRegex = /\s?ui-table-row\b/g;
var activeClassRegex = /\s?ui-table-row-active/g;
var loadingClassRegex = /\s?ui-table-row-loading/g;
var evenClassRegex = /\s?ui-table-row-even/g;
var oddClassRegex = /\s?ui-table-row-odd/g;

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

                if (val) {
                    this.node.className += ' ui-table-row-active';
                } else {
                    this.node.className = this.node.className.replace(activeClassRegex, '');
                }
            }
        },
        '_setIndex': null,
        get setIndex() {
            return this._setIndex;
        },
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

var UITable = function (_UIView) {
    _inherits(UITable, _UIView);

    function UITable() {
        _classCallCheck(this, UITable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITable).apply(this, arguments));
    }

    _createClass(UITable, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
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
            this.handleAdvanceToXScrollTrackLocation = this.handleAdvanceToXScrollTrackLocation.bind(this);
            this.handleAdvanceToYScrollTrackLocation = this.handleAdvanceToYScrollTrackLocation.bind(this);

            this.handleDragMove = this.handleDragMove.bind(this);
            this.handleDragEnd = this.handleDragEnd.bind(this);
            this.handleColumnDragStart = this.handleColumnDragStart.bind(this);

            this.handleWindowResize = this.handleWindowResize.bind(this);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
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

            this.refs['x-scroll-track'].addEventListener('click', this.handleAdvanceToXScrollTrackLocation);
            this.refs['y-scroll-track'].addEventListener('click', this.handleAdvanceToYScrollTrackLocation);

            window.addEventListener('resize', this.handleWindowResize);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.wrapper.removeEventListener('wheel', this.handleMoveIntent);
            this.refs.wrapper.removeEventListener('mousemove', this.handleDragMove);
            this.refs.wrapper.removeEventListener('touchstart', this.handleTouchStart);
            this.refs.wrapper.removeEventListener('touchmove', this.handleTouchMove);

            this.refs.wrapper.removeEventListener('keydown', this.handleKeyDown);

            this._header.removeEventListener('mousedown', this.handleColumnDragStart);
            this._body.removeEventListener('click', this.handleClick);

            this.refs['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.refs['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

            this.refs['x-scroll-track'].removeEventListener('click', this.handleAdvanceToXScrollTrackLocation);
            this.refs['y-scroll-track'].removeEventListener('click', this.handleAdvanceToYScrollTrackLocation);

            window.removeEventListener('resize', this.handleWindowResize);

            this.emptyHeader();
            this.emptyBody();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.regenerate();
        }
    }, {
        key: 'resetInternals',
        value: function resetInternals() {
            this._x = this._y = 0;
            this._nextX = this._nextY = 0;
            this._lastXScroll = this._lastYScroll = 0;
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

            this._dragTimer = null;

            this._fauxEvent = { preventDefault: _noop2.default };

            this._touch = null;
            this._lastTouchPageX = this._lastTouchPageY = 0;

            this._xScrollHandleSize = this._yScrollHandleSize = null;

            // reset!
            this.performTranslations();
        }
    }, {
        key: 'emptyHeader',
        value: function emptyHeader() {
            this._columns.length = 0;

            while (this._header.firstChild) {
                this._header.removeChild(this._header.firstChild);
            }
        }
    }, {
        key: 'buildColumns',
        value: function buildColumns() {
            var _this2 = this;

            this.emptyHeader();

            this.props.columns.forEach(function (column) {
                return _this2._columns.push(createHeaderCell(column));
            });
        }
    }, {
        key: 'computeMinMaxHeaderCellDimensions',
        value: function computeMinMaxHeaderCellDimensions() {
            var cs = undefined;

            this._columns.forEach(function (column) {
                cs = window.getComputedStyle(column.node);

                column.minWidth = parseInt(cs['min-width'], 10);
                column.maxWidth = parseInt(cs['max-width'], 10);
            });
        }
    }, {
        key: 'injectHeaderCells',
        value: function injectHeaderCells() {
            var _this3 = this;

            this._fragment = document.createDocumentFragment();
            this._columns.forEach(function (column) {
                return _this3._fragment.appendChild(column.node);
            });

            this._header.appendChild(this._fragment);

            // must be done after they have been injected into the DOM
            this.computeMinMaxHeaderCellDimensions();

            this._fragment = null; // prevent memleak
        }
    }, {
        key: 'emptyBody',
        value: function emptyBody() {
            this._rows.length = 0;
            this._rowsOrderedByY.length = 0;

            while (this._body.firstChild) {
                this._body.removeChild(this._body.firstChild);
            }
        }
    }, {
        key: 'injectFirstRow',
        value: function injectFirstRow() {
            this.emptyBody();

            this._rows.push(createRow({
                data: this.props.getRow(0),
                setIndex: 0,
                y: 0
            }, this._columns));

            this._rowsOrderedByY.push(0);

            this._body.appendChild(this._rows[0].node);
        }
    }, {
        key: 'injectRestOfRows',
        value: function injectRestOfRows() {
            this._fragment = document.createDocumentFragment();

            for (this._iterator = 1; this._iterator < this._nRowsToRender; this._iterator += 1) {
                this._rows.push(createRow({
                    data: this.props.getRow(this._iterator),
                    setIndex: this._iterator,
                    y: this._cell_h * this._iterator
                }, this._columns));

                this._rowsOrderedByY.push(this._iterator);

                this._fragment.appendChild(this._rows[this._iterator].node);
            }

            this._body.appendChild(this._fragment);
            this._fragment = null; // prevent memleak
        }
    }, {
        key: 'calculateCellHeight',
        value: function calculateCellHeight() {
            this._cell_h = this._rows[0].cells[0].node.clientHeight || 40;
        }
    }, {
        key: 'calculateCellWidths',
        value: function calculateCellWidths() {
            var _this4 = this;

            this._rows[0].cells.forEach(function (cell, index) {
                _this4._columns[index].width = _this4._columns[index].width || cell.node.getBoundingClientRect().width;
                cell.width = _this4._columns[index].width;
            });
        }
    }, {
        key: 'calculateXBound',
        value: function calculateXBound() {
            this._row_w = this._rows[0].node.clientWidth || 500;
            this._xMaximum = this._container_w <= this._row_w ? this._container_w - this._row_w : 0;
        }
    }, {
        key: 'calculateYBound',
        value: function calculateYBound() {
            this._yUpperBound = 0;
            this._yLowerBound = this._container_h - this._nRowsToRender * this._cell_h;
        } // do not run this unless rebuilding the table, does not preserve current min/max thresholds

    }, {
        key: 'calculateXScrollHandleSize',
        value: function calculateXScrollHandleSize() {
            this._xScrollHandleSize = this._container_w - Math.abs(this._xMaximum);

            if (this._xScrollHandleSize < 12) {
                this._xScrollHandleSize = 12;
            }

            return this._xScrollHandleSize;
        }
    }, {
        key: 'calculateYScrollHandleSize',
        value: function calculateYScrollHandleSize() {
            this._yScrollHandleSize = this._container_h * (this._nRowsToRender / this.props.totalRows);

            if (this._yScrollHandleSize < 12) {
                this._yScrollHandleSize = 12;
            }

            return this._yScrollHandleSize;
        }
    }, {
        key: 'initializeScrollBars',
        value: function initializeScrollBars() {
            this._xScrollTrack_w = this.refs['x-scroll-track'].clientWidth || 500;
            this._yScrollTrack_h = this.refs['y-scroll-track'].clientHeight || 150;
            this._xScrollHandle_s.width = this.calculateXScrollHandleSize() + 'px';
            this._yScrollHandle_s.height = this.calculateYScrollHandleSize() + 'px';
        }
    }, {
        key: 'calculateContainerDimensions',
        value: function calculateContainerDimensions() {
            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */
            this._container_h = this.refs.wrapper.clientHeight || 150;
            this._container_w = this.refs.wrapper.clientWidth || 500;
        }
    }, {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
            if (this.refs.wrapper.clientHeight !== this._container_h) {
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
            this.resetInternals();
            this.calculateContainerDimensions();

            this.buildColumns();
            this.injectFirstRow();
            this.calculateCellWidths();
            this.calculateCellHeight();

            this._nRowsToRender = Math.ceil(this._container_h * 1.3 / this._cell_h);

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
    }, {
        key: 'handleScrollDown',
        value: function handleScrollDown() {
            if (this._rowEndIndex === this.props.totalRows || this._nextY >= this._yLowerBound) {
                return;
            }

            /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this._nRowsToShift = Math.ceil(Math.abs(this._nextY - this._yLowerBound) / this._cell_h);

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

                        this._rowPointer.data = this._dragTimer ? null : this.props.getRow(this._targetIndex);
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
    }, {
        key: 'handleScrollUp',
        value: function handleScrollUp() {
            if (this._rowStartIndex === 0 || this._nextY <= this._yUpperBound) {
                return;
            }

            /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this._nRowsToShift = Math.ceil(Math.abs(this._nextY - this._yUpperBound) / this._cell_h);

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

                        this._rowPointer = this._rows[this._rowsOrderedByY[this._orderedYArrayTargetIndex]];

                        this._rowPointer.data = this._dragTimer ? null : this.props.getRow(this._targetIndex);
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
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(event) {
            this._touch = event.touches.item(0);
            this._lastTouchPageX = this._touch.pageX;
            this._lastTouchPageY = this._touch.pageY;
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(event) {
            event.preventDefault();

            /* we handle touchmove by detecting the delta of pageX/Y and forwarding
            it to handleMoveIntent() */

            this._touch = event.touches.item(0);

            this._fauxEvent.deltaX = this._lastTouchPageX - this._touch.pageX;
            this._fauxEvent.deltaY = this._lastTouchPageY - this._touch.pageY;

            this._lastTouchPageX = this._touch.pageX;
            this._lastTouchPageY = this._touch.pageY;

            this.handleMoveIntent(this._fauxEvent);
        }
    }, {
        key: 'handleMoveIntent',
        value: function handleMoveIntent(event) {
            var _this5 = this;

            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0 || this._manuallyScrollingY && event.deltaY === 0 || this._manuallyScrollingX && event.deltaX === 0) {
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

            window.requestAnimationFrame(function () {
                if (_this5._nextY < _this5._y) {
                    _this5.handleScrollDown();
                } else if (_this5._nextY > _this5._y) {
                    _this5.handleScrollUp();
                }

                if (_this5._nextY > 0) {
                    _this5._nextY = 0;
                } else if (_this5._nextY < _this5._yLowerBound) {
                    _this5._nextY = _this5._yLowerBound;
                }

                if (_this5._nextX === 0) {
                    _this5._xScrollHandlePosition = 0;
                } else {
                    _this5._xScrollHandlePosition = Math.abs(_this5._nextX) / (_this5._row_w - _this5._container_w) * (_this5._xScrollTrack_w - _this5._xScrollHandleSize);

                    if (_this5._xScrollHandlePosition + _this5._xScrollHandleSize > _this5._xScrollTrack_w) {
                        _this5._xScrollHandlePosition = _this5._xScrollTrack_w - _this5._xScrollHandleSize;
                    }
                }

                if (_this5.nextY === 0) {
                    _this5._yScrollHandlePosition = 0;
                } else {
                    _this5._yScrollHandlePosition = Math.abs(_this5._nextY) / (_this5.props.totalRows * _this5._cell_h - _this5._container_h) * (_this5._yScrollTrack_h - _this5._yScrollHandleSize);

                    if (_this5._yScrollHandlePosition + _this5._yScrollHandleSize > _this5._yScrollTrack_h) {
                        _this5._yScrollHandlePosition = _this5._yScrollTrack_h - _this5._yScrollHandleSize;
                    }
                }

                _this5.performTranslations(); // Do all transforms grouped together

                _this5._x = _this5._nextX;
                _this5._y = _this5._nextY;
            });
        }
    }, {
        key: 'performTranslations',
        value: function performTranslations() {
            this._header_s[_transform2.default] = translate3d(this._nextX);
            this._body_s[_transform2.default] = translate3d(this._nextX, this._nextY);
            this._xScrollHandle_s[_transform2.default] = translate3d(this._xScrollHandlePosition);
            this._yScrollHandle_s[_transform2.default] = translate3d(0, this._yScrollHandlePosition);
        }
    }, {
        key: 'handleAdvanceToXScrollTrackLocation',
        value: function handleAdvanceToXScrollTrackLocation(event) {
            if (event.target.className !== 'ui-table-x-scroll-track') {
                return;
            }

            this._fauxEvent.deltaX = event.layerX - this._lastXScroll;
            this._fauxEvent.deltaY = 0;

            this.handleMoveIntent(this._fauxEvent);

            this._lastXScroll = event.layerX;
        }
    }, {
        key: 'handleAdvanceToYScrollTrackLocation',
        value: function handleAdvanceToYScrollTrackLocation(event) {
            if (event.target.className !== 'ui-table-y-scroll-track') {
                return;
            }

            this._fauxEvent.deltaX = 0;
            this._fauxEvent.deltaY = (event.layerY - this._lastYScroll) / this._container_h * this.props.totalRows * this._cell_h;

            this.handleMoveIntent(this._fauxEvent);

            this._lastYScroll = event.layerY;
        }
    }, {
        key: 'handleXScrollHandleDragStart',
        value: function handleXScrollHandleDragStart(event) {
            if (event.button !== 0) {
                return;
            }

            this._leftButtonPressed = true;

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this._lastXScroll = event.clientX;
            this._manuallyScrollingX = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }, {
        key: 'handleYScrollHandleDragStart',
        value: function handleYScrollHandleDragStart(event) {
            if (event.button !== 0) {
                return;
            }

            this._leftButtonPressed = true;

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this._lastYScroll = event.clientY;
            this._manuallyScrollingY = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }, {
        key: 'handleDragMove',
        value: function handleDragMove(event) {
            var _this6 = this;

            if (!this._leftButtonPressed) {
                return;
            }

            if (this._dragTimer) {
                window.clearTimeout(this._dragTimer);
            }

            this._dragTimer = window.setTimeout(function () {
                _this6._dragTimer = null;

                /* Now fetch, once drag has ceased for long enough. */
                _this6._rows.forEach(function (row) {
                    if (row.data === null) {
                        row.data = _this6.props.getRow(row.setIndex);
                    }
                });
            }, this.props.throttleInterval);

            if (this._manuallyScrollingY) {
                this._fauxEvent.deltaX = 0;
                this._fauxEvent.deltaY = (event.clientY - this._lastYScroll) / this._container_h * this.props.totalRows * this._cell_h;

                this.handleMoveIntent(this._fauxEvent);

                this._lastYScroll = event.clientY;
            } else if (this._manuallyScrollingX) {

                this._fauxEvent.deltaX = event.clientX - this._lastXScroll;
                this._fauxEvent.deltaY = 0;

                this.handleMoveIntent(this._fauxEvent);

                this._lastXScroll = event.clientX;
            } else if (this._manuallyResizingColumn) {

                this.handleColumnResize(event.clientX - this._lastColumnX);

                this._lastColumnX = event.clientX;
            }
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            this._leftButtonPressed = false;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.removeEventListener('mouseup', this.handleDragEnd, true);

            this._manuallyScrollingX = this._manuallyScrollingY = this._manuallyResizingColumn = false;
        }
    }, {
        key: 'handleColumnDragStart',
        value: function handleColumnDragStart(event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                this._leftButtonPressed = true;

                this._lastColumnX = event.clientX;

                this._manuallyResizingColumn = (0, _findWhere2.default)(this._columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            var _this7 = this;

            if (delta === 0) {
                return;
            }

            var index = this._columns.indexOf(this._manuallyResizingColumn);
            var adjustedDelta = delta;

            if (adjustedDelta < 0 && !isNaN(this._manuallyResizingColumn.minWidth) && this._manuallyResizingColumn.width + adjustedDelta < this._manuallyResizingColumn.minWidth) {
                adjustedDelta = this._manuallyResizingColumn.minWidth - this._manuallyResizingColumn.width;
            } else if (!isNaN(this._manuallyResizingColumn.maxWidth) && this._manuallyResizingColumn.width + adjustedDelta > this._manuallyResizingColumn.maxWidth) {
                adjustedDelta = this._manuallyResizingColumn.maxWidth - this._manuallyResizingColumn.width;
            }

            // Adjust the column header cell
            this._manuallyResizingColumn.width = this._manuallyResizingColumn.width + adjustedDelta;

            // Adjust the corresponding row cells
            this._rows.forEach(function (row) {
                return row.cells[index].width = _this7._manuallyResizingColumn.width;
            });

            this.calculateXBound();
            this.initializeScrollBars();

            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
            if (adjustedDelta < 0) {
                this._fauxEvent.deltaX = adjustedDelta;
                this._fauxEvent.deltaY = 0;

                this.handleMoveIntent(this._fauxEvent);
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
            this.refs.aria.innerText = text;
        }
    }, {
        key: 'setActiveRow',
        value: function setActiveRow(setIndex) {
            this._activeRow = setIndex;
            this._rows.forEach(function (row) {
                return row.active = row.setIndex === setIndex;
            });
        }
    }, {
        key: 'changeActiveRow',
        value: function changeActiveRow(delta) {
            var _this8 = this;

            this._nextActiveRow = (0, _findWhere2.default)(this._rows, 'setIndex', this._activeRow + delta);

            if (this._nextActiveRow) {
                this.setActiveRow(this._nextActiveRow.setIndex);
                this.setAriaText(this._nextActiveRow.data[this._columns[0].mapping]);

                if (delta === -1 && this._nextActiveRow.y * -1 > this._y || delta === 1 && this._nextActiveRow.y * -1 - this._cell_h < this._y - this._container_h + this._cell_h // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this._fauxEvent.deltaX = 0;
                        this._fauxEvent.deltaY = this._cell_h * delta;

                        this.handleMoveIntent(this._fauxEvent);
                    }
            } else if (delta === -1 && this._activeRow > 0 || delta === 1 && this._activeRow < this.props.totalRows) {
                /*
                    The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                    in the viewport.
                 */
                this._fauxEvent.deltaX = 0;
                this._fauxEvent.deltaY = (this._rowStartIndex > this._activeRow && this._activeRow - this._rowStartIndex || (this._rowStartIndex < this._activeRow && this._activeRow - this._rowStartIndex) + delta) * this._cell_h;

                this.handleMoveIntent(this._fauxEvent);

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this8.changeActiveRow(delta);
                });
            }

            this._nextActiveRow = null;
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
                    if (this._activeRow !== -1) {
                        (function () {
                            var row = (0, _findWhere2.default)(_this9._rows, 'setIndex', _this9._activeRow).data;

                            _this9.setAriaText(_this9._columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;
            }

            if (typeof this.props.onKeyDown === 'function') {
                this.props.onKeyDown(event);
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
                var row = (0, _findWhere2.default)(this._rows, 'node', map.row);

                this.setActiveRow(row.setIndex);

                if (map.cell) {
                    this.props.onCellInteract(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                this.props.onRowInteract(event, row.setIndex);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: 'ui-table-wrapper ' + this.props.className,
                    'data-set-identifier': this.props.identifier,
                    tabIndex: '0' }),
                _react2.default.createElement(
                    'div',
                    { ref: 'table', className: 'ui-table' },
                    _react2.default.createElement('div', { ref: 'header', className: 'ui-table-header' }),
                    _react2.default.createElement('div', { ref: 'body', className: 'ui-table-body' })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
                        _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
                        _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
                    )
                ),
                _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' })
            );
        }
    }]);

    return UITable;
}(_UIView3.default);

UITable.propTypes = {
    columns: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        mapping: _react2.default.PropTypes.string,
        resizable: _react2.default.PropTypes.bool,
        title: _react2.default.PropTypes.string,
        width: _react2.default.PropTypes.number
    })),
    getRow: _react2.default.PropTypes.func,
    identifier: _react2.default.PropTypes.string,
    offscreenClass: _react2.default.PropTypes.string,
    onCellInteract: _react2.default.PropTypes.func,
    onRowInteract: _react2.default.PropTypes.func,
    throttleInterval: _react2.default.PropTypes.number,
    totalRows: _react2.default.PropTypes.number
};

UITable.defaultProps = {
    className: '',
    columns: [],
    getRow: _noop2.default,
    offscreenClass: 'ui-offscreen',
    onCellInteract: _noop2.default,
    onRowInteract: _noop2.default,
    throttleInterval: 300,
    totalRows: 0
};

exports.default = UITable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0EsSUFBTSxpQkFBaUIscUJBQWpCO0FBQ04sSUFBTSxnQkFBZ0Isb0JBQWhCO0FBQ04sSUFBTSxtQkFBbUIseUJBQW5CO0FBQ04sSUFBTSxvQkFBb0IsMEJBQXBCO0FBQ04sSUFBTSxpQkFBaUIsdUJBQWpCO0FBQ04sSUFBTSxnQkFBZ0Isc0JBQWhCOztBQUVOLElBQU0sY0FBYyxTQUFTLFdBQVQsR0FBbUM7UUFBZCwwREFBSSxpQkFBVTtRQUFQLDBEQUFJLGlCQUFHOztBQUNuRCxXQUFPLGlCQUFpQixDQUFqQixHQUFxQixNQUFyQixHQUE4QixDQUE5QixHQUFrQyxVQUFsQyxDQUQ0QztDQUFuQzs7QUFJcEIsSUFBTSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQyxPQUFoQyxFQUF5QztBQUM5RCxRQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsS0FBZ0MsQ0FBaEMsRUFBbUM7QUFDN0QsYUFBSyxXQUFMLENBQWlCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQixFQUQ2RDtLQUFqRTs7QUFJQSxRQUFNLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVAsQ0FMd0Q7QUFNeEQsU0FBSyxTQUFMLEdBQWlCLHFCQUFqQixDQU53RDs7QUFROUQsUUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFYLENBUndEO0FBU3hELFNBQUssV0FBTCxDQUFpQixRQUFqQixFQVR3RDs7QUFXOUQsU0FBSyxXQUFMLENBQWlCLElBQWpCLEVBWDhEOztBQWE5RCxXQUFPLFFBQVAsQ0FiOEQ7Q0FBekM7O0FBZ0J6QixJQUFNLGdCQUFnQixTQUFTLGFB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Z0IsTUFBaEI7QUFDaEIsb0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDaEIsbUJBQWUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNmLHNCQUFrQixnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ2xCLGVBQVcsZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtDQWZmOztBQWtCQSxRQUFRLFlBQVIsR0FBdUI7QUFDbkIsZUFBVyxFQUFYO0FBQ0EsYUFBUyxFQUFUO0FBQ0EsMEJBSG1CO0FBSW5CLG9CQUFnQixjQUFoQjtBQUNBLGtDQUxtQjtBQU1uQixpQ0FObUI7QUFPbkIsc0JBQWtCLEdBQWxCO0FBQ0EsZUFBVyxDQUFYO0NBUko7O2tCQVdlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGhpZ2gtcGVyZm9ybWFuY2UsIGluZmluaXRlIHRhYmxlIHZpZXcuXG4gKiBAY2xhc3MgVUlUYWJsZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IGZpbmRXaGVyZSBmcm9tICcuLi9VSVV0aWxzL2ZpbmRXaGVyZSc7XG5cbi8qKlxuICogRk9SIEZVVFVSRSBFWUVTXG4gKlxuICogU2Nyb2xsIHBlcmZvcm1hbmNlIGlzIGEgdHJpY2t5IGJlYXN0IC0tIG1vcmVzbyB3aGVuIHRyeWluZyB0byBtYWludGFpbiA1MCsgRlBTIGFuZCBwdW1waW5nIGEgbG90IG9mIGRhdGFcbiAqIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0XG4gKiBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG4gKlxuICogVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGVcbiAqIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cbiAqXG4gKiBBdCBzb21lIHBvaW50LCB0aGUgaW50ZXJuYWxzIHdpbGwgcHJvYmFibHkgYmUgZnVsbHktc2VwYXJhdGVkIGludG8gaXRzIG93biBtb2R1bGUgc3VjaCB0aGF0IGl0IGNhblxuICogYmUgZW1iZWRkZWQgaW4gb3RoZXIgcGxhY2VzIHdpdGhvdXQgUmVhY3QuXG4gKlxuICogX19JbXBvcnRhbnQgTm90ZV9fXG4gKlxuICogQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLlxuICogSWYgeW91IGRvbid0LCBpdCdsbCBjcmVhdGUgYSBtZW1vcnkgbGVhay4gQWxzbywgbWFrZSBzdXJlIGFsbCBnZW5lcmF0ZWQgRE9NIGlzIHJlbW92ZWQgb24gY29tcG9uZW50V2lsbFVubW91bnQuXG4gKi9cblxuLyoqXG4gKiBPUkRFUiBPRiBPUEVSQVRJT05TXG4gKlxuICogMS4gcmVuZGVyIG9uZSByb3cgb2YgY2VsbHNcbiAqIDIuIGNhcHR1cmUgdGFibGUgJiBjZWxsIHNpemluZyBtZXRyaWNzXG4gKiAzLiByZW5kZXIgY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcbiAqXG4gKiBJZiB0aGUgY29tcG9uZW50IHVwZGF0ZXMgZHVlIHRvIG5ldyBwcm9wcywganVzdCBibG93IGF3YXkgZXZlcnl0aGluZyBhbmQgc3RhcnQgb3Zlci4gSXQncyBjaGVhcGVyIHRoYW5cbiAqIHRyeWluZyB0byBkaWZmLlxuICovXG5cbmNvbnN0IGNlbGxDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1jZWxsXFxiL2c7XG5jb25zdCByb3dDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3dcXGIvZztcbmNvbnN0IGFjdGl2ZUNsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1hY3RpdmUvZztcbmNvbnN0IGxvYWRpbmdDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctbG9hZGluZy9nO1xuY29uc3QgZXZlbkNsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1ldmVuL2c7XG5jb25zdCBvZGRDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctb2RkL2c7XG5cbmNvbnN0IHRyYW5zbGF0ZTNkID0gZnVuY3Rpb24gdHJhbnNsYXRlM0QoeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDBweCknO1xufTsgLy8geiBpcyBuZXZlciB1c2VkXG5cbmNvbnN0IHJlcGFyZW50Q2VsbFRleHQgPSBmdW5jdGlvbiByZXBhcmVudENlbGxUZXh0KG5vZGUsIGNvbnRlbnQpIHtcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAmJiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsLWlubmVyJztcblxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgICAgdGV4dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG5cbiAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIHRleHROb2RlO1xufTtcblxuY29uc3QgY3JlYXRlRE9NQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbCc7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgY29udGVudCk7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJywgbWFwcGluZyk7XG4gICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XG5cbiAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgcmVwYXJlbnRDZWxsVGV4dChjZWxsLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUhlYWRlckNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01IZWFkZXJDZWxsKGNvbHVtbiwgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gY3JlYXRlRE9NQ2VsbChjb2x1bW4udGl0bGUsIGNvbHVtbi5tYXBwaW5nLCB3aWR0aCk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAoY29sdW1uLnJlc2l6YWJsZSkge1xuICAgICAgICBjb25zdCBoYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJztcblxuICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVIZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlSGVhZGVyQ2VsbChtZXRhZGF0YSwgd2lkdGgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NSGVhZGVyQ2VsbChtZXRhZGF0YSwgbWV0YWRhdGEud2lkdGggfHwgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19tZXRhZGF0YSc6IG1ldGFkYXRhLFxuICAgICAgICAnX3RpdGxlJzogbWV0YWRhdGEudGl0bGUsXG4gICAgICAgIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9LFxuICAgICAgICBzZXQgdGl0bGUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl90aXRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fdGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiBtZXRhZGF0YS53aWR0aCB8fCB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1hcHBpbmc6IG1ldGFkYXRhLm1hcHBpbmcsXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVDZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19jb250ZW50JzogY29udGVudCxcbiAgICAgICAgZ2V0IGNvbnRlbnQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50OyB9LFxuICAgICAgICBzZXQgY29udGVudCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl9jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSAndWktdGFibGUtcm93JztcbiAgICAgICAgICByb3cuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBmdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxzW2luZGV4XS5ub2RlKTtcbiAgICB9KTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgZnJhZ21lbnQgPSBudWxsO1xuXG4gICAgY29uc3Qgcm93T2JqID0ge1xuICAgICAgICBub2RlOiByb3csXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgJ19pdGVyYXRvcic6IG51bGwsXG4gICAgICAgICdfYWN0aXZlJzogZmFsc2UsXG4gICAgICAgIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH0sXG4gICAgICAgIHNldCBhY3RpdmUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKGFjdGl2ZUNsYXNzUmVnZXgsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfc2V0SW5kZXgnOiBudWxsLFxuICAgICAgICBnZXQgc2V0SW5kZXgoKSB7IHJldHVybiB0aGlzLl9zZXRJbmRleDsgfSxcbiAgICAgICAgc2V0IHNldEluZGV4KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fc2V0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbmRleCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXRJbmRleCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShvZGRDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctZXZlbic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShldmVuQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LW9kZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIHNldCBfd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKGxvYWRpbmdDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UgfHwgdGhpcy5fZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldFJvd0RhdGEocHJvbWlzZSwgcmVzb2x2ZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn07XG5cbmNsYXNzIFVJVGFibGUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLl9yb3dzID0gW107XG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZID0gW107XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlVG91Y2hNb3ZlID0gdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50ID0gdGhpcy5oYW5kbGVNb3ZlSW50ZW50LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCA9IHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uID0gdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uID0gdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ01vdmUgPSB0aGlzLmhhbmRsZURyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCA9IHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUgPSB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLl9ib2R5ID0gdGhpcy5yZWZzLmJvZHk7XG4gICAgICAgIHRoaXMuX2JvZHlfcyA9IHRoaXMuX2JvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IHRoaXMucmVmcy5oZWFkZXI7XG4gICAgICAgIHRoaXMuX2hlYWRlcl9zID0gdGhpcy5faGVhZGVyLnN0eWxlO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3MgPSB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3MgPSB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5faGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5fYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuX2JvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcblxuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcbiAgICB9XG5cbiAgICByZXNldEludGVybmFscygpIHtcbiAgICAgICAgdGhpcy5feCA9IHRoaXMuX3kgPSAwO1xuICAgICAgICB0aGlzLl9uZXh0WCA9IHRoaXMuX25leHRZID0gMDtcbiAgICAgICAgdGhpcy5fbGFzdFhTY3JvbGwgPSB0aGlzLl9sYXN0WVNjcm9sbCA9IDA7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlUm93ID0gLTE7XG4gICAgICAgIHRoaXMuX25leHRBY3RpdmVSb3cgPSBudWxsO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hpZnREZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RhcmdldEluZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9kcmFnVGltZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2ZhdXhFdmVudCA9IHtwcmV2ZW50RGVmYXVsdDogbm9vcH07XG5cbiAgICAgICAgdGhpcy5fdG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWCA9IHRoaXMuX2xhc3RUb3VjaFBhZ2VZID0gMDtcblxuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSA9IHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7XG4gICAgfVxuXG4gICAgZW1wdHlIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbnMubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5faGVhZGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWRlci5yZW1vdmVDaGlsZCh0aGlzLl9oZWFkZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZENvbHVtbnMoKSB7XG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcblxuICAgICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5fY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uKSkpO1xuICAgIH1cblxuICAgIGNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IGNzO1xuXG4gICAgICAgIHRoaXMuX2NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb2x1bW4ubm9kZSk7XG5cbiAgICAgICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHBhcnNlSW50KGNzWydtaW4td2lkdGgnXSwgMTApO1xuICAgICAgICAgICAgY29sdW1uLm1heFdpZHRoID0gcGFyc2VJbnQoY3NbJ21heC13aWR0aCddLCAxMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluamVjdEhlYWRlckNlbGxzKCkge1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5fY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLl9mcmFnbWVudC5hcHBlbmRDaGlsZChjb2x1bW4ubm9kZSkpO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5hcHBlbmRDaGlsZCh0aGlzLl9mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLmNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgZW1wdHlCb2R5KCkge1xuICAgICAgICB0aGlzLl9yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuX2JvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5qZWN0Rmlyc3RSb3coKSB7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgdGhpcy5fcm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmdldFJvdygwKSxcbiAgICAgICAgICAgIHNldEluZGV4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgdGhpcy5fY29sdW1ucykpO1xuXG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnB1c2goMCk7XG5cbiAgICAgICAgdGhpcy5fYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9yb3dzWzBdLm5vZGUpO1xuICAgIH1cblxuICAgIGluamVjdFJlc3RPZlJvd3MoKSB7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAxOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuX25Sb3dzVG9SZW5kZXI7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX2l0ZXJhdG9yKSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5faXRlcmF0b3IsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5fY2VsbF9oICogdGhpcy5faXRlcmF0b3IsXG4gICAgICAgICAgICB9LCB0aGlzLl9jb2x1bW5zKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnB1c2godGhpcy5faXRlcmF0b3IpO1xuXG4gICAgICAgICAgICB0aGlzLl9mcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9yb3dzW3RoaXMuX2l0ZXJhdG9yXS5ub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMuX2NlbGxfaCA9IHRoaXMuX3Jvd3NbMF0uY2VsbHNbMF0ubm9kZS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbFdpZHRocygpIHtcbiAgICAgICAgdGhpcy5fcm93c1swXS5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGggPSB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCB8fCBjZWxsLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjZWxsLndpZHRoID0gdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5fcm93X3cgPSB0aGlzLl9yb3dzWzBdLm5vZGUuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLl94TWF4aW11bSA9ICAgdGhpcy5fY29udGFpbmVyX3cgPD0gdGhpcy5fcm93X3dcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX2NvbnRhaW5lcl93IC0gdGhpcy5fcm93X3dcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCA9IDA7XG4gICAgICAgIHRoaXMuX3lMb3dlckJvdW5kID0gdGhpcy5fY29udGFpbmVyX2ggLSAodGhpcy5fblJvd3NUb1JlbmRlciAqIHRoaXMuX2NlbGxfaCk7XG4gICAgfSAvLyBkbyBub3QgcnVuIHRoaXMgdW5sZXNzIHJlYnVpbGRpbmcgdGhlIHRhYmxlLCBkb2VzIG5vdCBwcmVzZXJ2ZSBjdXJyZW50IG1pbi9tYXggdGhyZXNob2xkc1xuXG4gICAgY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID0gdGhpcy5fY29udGFpbmVyX3cgLSBNYXRoLmFicyh0aGlzLl94TWF4aW11bSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5feFNjcm9sbEhhbmRsZVNpemU7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplID0gdGhpcy5fY29udGFpbmVyX2ggKiAodGhpcy5fblJvd3NUb1JlbmRlciAvIHRoaXMucHJvcHMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy5feFNjcm9sbFRyYWNrX3cgPSB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLl95U2Nyb2xsVHJhY2tfaCA9IHRoaXMucmVmc1sneS1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3Mud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3MuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLl9jb250YWluZXJfaCA9IHRoaXMucmVmcy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcl93ID0gdGhpcy5yZWZzLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgIH1cblxuICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5fY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuYnVpbGRDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0Rmlyc3RSb3coKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsV2lkdGhzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbEhlaWdodCgpO1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9SZW5kZXIgPSBNYXRoLmNlaWwoKHRoaXMuX2NvbnRhaW5lcl9oICogMS4zKSAvIHRoaXMuX2NlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9SZW5kZXIgPiB0aGlzLnByb3BzLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1JlbmRlciA9IHRoaXMucHJvcHMudG90YWxSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4ID0gdGhpcy5fblJvd3NUb1JlbmRlcjtcblxuICAgICAgICB0aGlzLmluamVjdEhlYWRlckNlbGxzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UmVzdE9mUm93cygpO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWUJvdW5kKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIGhhbmRsZVNjcm9sbERvd24oKSB7XG4gICAgICAgIGlmICggICB0aGlzLl9yb3dFbmRJbmRleCA9PT0gdGhpcy5wcm9wcy50b3RhbFJvd3NcbiAgICAgICAgICAgIHx8IHRoaXMuX25leHRZID49IHRoaXMuX3lMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBsb3dlc3QgWSB2YWx1ZSB0byB0aGUgeUxvd2VyQm91bmQgYW5kIHJlcXVlc3QgdGhlIG5leHQgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMuX25leHRZIC0gdGhpcy5feUxvd2VyQm91bmQpIC8gdGhpcy5fY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCArIHRoaXMuX3Jvd0VuZEluZGV4ICsgMSA+IHRoaXMucHJvcHMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IHRoaXMucHJvcHMudG90YWxSb3dzIC0gdGhpcy5fcm93RW5kSW5kZXggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiB0aGlzLl9uUm93c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogYSB2ZXJ5IGxhcmdlIHNjcm9sbCBkZWx0YSwgY2FsY3VsYXRlIHdoZXJlIHRoZSBib3VuZGFyaWVzIHNob3VsZCBiZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSB0aGlzLl9uUm93c1RvU2hpZnQgLSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgLT0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCAtPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCArPSB0aGlzLl9zaGlmdERlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4ICs9IHRoaXMuX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuX25Sb3dzVG9TaGlmdDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IHRoaXMuX3Jvd0VuZEluZGV4ICsgdGhpcy5faXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gdGhpcy5fcm93c1t0aGlzLl9yb3dzT3JkZXJlZEJ5WVswXV07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5kYXRhID0gdGhpcy5fZHJhZ1RpbWVyID8gbnVsbCA6IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnkgPSB0aGlzLl90YXJnZXRJbmRleCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5hY3RpdmUgPSB0aGlzLl90YXJnZXRJbmRleCA9PT0gdGhpcy5fYWN0aXZlUm93O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnB1c2godGhpcy5fcm93c09yZGVyZWRCeVkuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCArPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggKz0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgLT0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMuX3lMb3dlckJvdW5kIC09IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZVNjcm9sbFVwKCkge1xuICAgICAgICBpZiAodGhpcy5fcm93U3RhcnRJbmRleCA9PT0gMCB8fCB0aGlzLl9uZXh0WSA8PSB0aGlzLl95VXBwZXJCb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIHVwLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIGhpZ2hlc3QgWSB2YWx1ZSB0byB0aGUgeVVwcGVyQm91bmQgYW5kIHJlcXVlc3QgdGhlIHByZXZpb3VzIHJvdy4gU2NhbGUgYXBwcm9wcmlhdGVseSBpZiBhIGJpZyBkZWx0YSBhbmQgbWlncmF0ZSBhcyBtYW55IHJvd3MgYXMgYXJlIG5lY2Vzc2FyeS4gKi9cblxuICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLl9uZXh0WSAtIHRoaXMuX3lVcHBlckJvdW5kKSAvIHRoaXMuX2NlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3dTdGFydEluZGV4IC0gdGhpcy5fblJvd3NUb1NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fcm93U3RhcnRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gdGhpcy5fblJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdERlbHRhID0gdGhpcy5fblJvd3NUb1NoaWZ0IC0gdGhpcy5fblJvd3NUb1JlbmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kICs9IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgKz0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCAtPSB0aGlzLl9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fblJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBoaWdoZXN0IFktdmFsdWUgcm93cyB0byB0aGUgdG9wIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IHRoaXMuX3Jvd3NPcmRlcmVkQnlZLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLl9uUm93c1RvU2hpZnQ7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0SW5kZXggPSB0aGlzLl9yb3dTdGFydEluZGV4IC0gdGhpcy5faXRlcmF0b3IgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSB0aGlzLl9yb3dzW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVlbdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4XVxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMuX2RyYWdUaW1lciA/IG51bGwgOiB0aGlzLnByb3BzLmdldFJvdyh0aGlzLl90YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuc2V0SW5kZXggPSB0aGlzLl90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci55ID0gdGhpcy5fdGFyZ2V0SW5kZXggKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuYWN0aXZlID0gdGhpcy5fdGFyZ2V0SW5kZXggPT09IHRoaXMuX2FjdGl2ZVJvdztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WS51bnNoaWZ0KHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnBvcCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4IC09IHRoaXMuX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCAtPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCArPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgKz0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICB0aGlzLl90b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVggPSB0aGlzLl90b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVkgPSB0aGlzLl90b3VjaC5wYWdlWTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiB3ZSBoYW5kbGUgdG91Y2htb3ZlIGJ5IGRldGVjdGluZyB0aGUgZGVsdGEgb2YgcGFnZVgvWSBhbmQgZm9yd2FyZGluZ1xuICAgICAgICBpdCB0byBoYW5kbGVNb3ZlSW50ZW50KCkgKi9cblxuICAgICAgICB0aGlzLl90b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFYID0gdGhpcy5fbGFzdFRvdWNoUGFnZVggLSB0aGlzLl90b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9IHRoaXMuX2xhc3RUb3VjaFBhZ2VZIC0gdGhpcy5fdG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVggPSB0aGlzLl90b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVkgPSB0aGlzLl90b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVNb3ZlSW50ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKChldmVudC5kZWx0YVggPT09IDAgJiYgZXZlbnQuZGVsdGFZID09PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZICYmIGV2ZW50LmRlbHRhWSA9PT0gMFxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYICYmIGV2ZW50LmRlbHRhWCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWluaW11bSB0cmFuc2xhdGlvbiBzaG91bGQgYmUgb25lIHJvdyBoZWlnaHRcbiAgICAgICAgdGhpcy5fZGVsdGFYID0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIC8vIGRlbHRhTW9kZSAwID09PSBwaXhlbHMsIDEgPT09IGxpbmVzXG4gICAgICAgIHRoaXMuX2RlbHRhWSA9IGV2ZW50LmRlbHRhTW9kZSA9PT0gMSA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSwgMTApICogdGhpcy5fY2VsbF9oIDogZXZlbnQuZGVsdGFZO1xuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLl9uZXh0WCA9IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSA/IDAgOiB0aGlzLl94IC0gdGhpcy5fZGVsdGFYO1xuXG4gICAgICAgIGlmICh0aGlzLl9uZXh0WCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRYID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZXh0WCA8IHRoaXMuX3hNYXhpbXVtKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0WCA9IHRoaXMuX3hNYXhpbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbmV4dFkgPSB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggPyAwIDogdGhpcy5feSAtIHRoaXMuX2RlbHRhWTtcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0WSA8IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbERvd24oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmV4dFkgPiB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTY3JvbGxVcCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbmV4dFkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFkgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZXh0WSA8IHRoaXMuX3lMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFkgPSB0aGlzLl95TG93ZXJCb3VuZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uID0gICAoTWF0aC5hYnModGhpcy5fbmV4dFgpIC8gKHRoaXMuX3Jvd193IC0gdGhpcy5fY29udGFpbmVyX3cpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKHRoaXMuX3hTY3JvbGxUcmFja193IC0gdGhpcy5feFNjcm9sbEhhbmRsZVNpemUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbiArIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID4gdGhpcy5feFNjcm9sbFRyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uID0gdGhpcy5feFNjcm9sbFRyYWNrX3cgLSB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm5leHRZID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uID0gICAoTWF0aC5hYnModGhpcy5fbmV4dFkpIC8gKCh0aGlzLnByb3BzLnRvdGFsUm93cyAqIHRoaXMuX2NlbGxfaCkgLSB0aGlzLl9jb250YWluZXJfaCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAodGhpcy5feVNjcm9sbFRyYWNrX2ggLSB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uICsgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPiB0aGlzLl95U2Nyb2xsVHJhY2tfaCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSB0aGlzLl95U2Nyb2xsVHJhY2tfaCAtIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7IC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcblxuICAgICAgICAgICAgdGhpcy5feCA9IHRoaXMuX25leHRYO1xuICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX25leHRZO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwZXJmb3JtVHJhbnNsYXRpb25zKCkge1xuICAgICAgICB0aGlzLl9oZWFkZXJfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHRoaXMuX25leHRYKTtcbiAgICAgICAgdGhpcy5fYm9keV9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QodGhpcy5fbmV4dFgsIHRoaXMuX25leHRZKTtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZV9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QodGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZV9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFYID0gZXZlbnQubGF5ZXJYIC0gdGhpcy5fbGFzdFhTY3JvbGw7XG4gICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuXG4gICAgICAgIHRoaXMuX2xhc3RYU2Nyb2xsID0gZXZlbnQubGF5ZXJYO1xuICAgIH1cblxuICAgIGhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteS1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gKChldmVudC5sYXllclkgLSB0aGlzLl9sYXN0WVNjcm9sbCkgLyB0aGlzLl9jb250YWluZXJfaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5wcm9wcy50b3RhbFJvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5fY2VsbF9oO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuXG4gICAgICAgIHRoaXMuX2xhc3RZU2Nyb2xsID0gZXZlbnQubGF5ZXJZO1xuICAgIH1cblxuICAgIGhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9sZWZ0QnV0dG9uUHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuX2xhc3RYU2Nyb2xsID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9sZWZ0QnV0dG9uUHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuX2xhc3RZU2Nyb2xsID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVmdEJ1dHRvblByZXNzZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RyYWdUaW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX2RyYWdUaW1lcik7IH1cblxuICAgICAgICB0aGlzLl9kcmFnVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnVGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICAvKiBOb3cgZmV0Y2gsIG9uY2UgZHJhZyBoYXMgY2Vhc2VkIGZvciBsb25nIGVub3VnaC4gKi9cbiAgICAgICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByb3cuZGF0YSA9IHRoaXMucHJvcHMuZ2V0Um93KHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMucHJvcHMudGhyb3R0bGVJbnRlcnZhbCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSkge1xuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gKChldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdFlTY3JvbGwpIC8gdGhpcy5fY29udGFpbmVyX2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5fY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSBldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdFhTY3JvbGw7XG4gICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2ZhdXhFdmVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RYU2Nyb2xsID0gZXZlbnQuY2xpZW50WDtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4pIHtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQuY2xpZW50WCAtIHRoaXMuX2xhc3RDb2x1bW5YKTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCgpIHtcbiAgICAgICAgdGhpcy5fbGVmdEJ1dHRvblByZXNzZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCA9IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZScpIHtcbiAgICAgICAgICAgIC8vIEZpeGVzIGRyYWdTdGFydCBvY2Nhc2lvbmFsbHkgaGFwcGVuaW5nIGFuZCBicmVha2luZyB0aGUgc2ltdWxhdGVkIGRyYWdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2xlZnRCdXR0b25QcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuXG4gICAgICAgICAgICB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gZmluZFdoZXJlKHRoaXMuX2NvbHVtbnMsICdtYXBwaW5nJywgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY29sdW1ucy5pbmRleE9mKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4pO1xuICAgICAgICBsZXQgYWRqdXN0ZWREZWx0YSA9IGRlbHRhO1xuXG4gICAgICAgIGlmICggICBhZGp1c3RlZERlbHRhIDwgMFxuICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoICsgYWRqdXN0ZWREZWx0YSA8IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZERlbHRhID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5taW5XaWR0aCAtIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWF4V2lkdGgpXG4gICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPiB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1heFdpZHRoKSB7XG4gICAgICAgICAgICBhZGp1c3RlZERlbHRhID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXhXaWR0aCAtIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGp1c3QgdGhlIGNvbHVtbiBoZWFkZXIgY2VsbFxuICAgICAgICB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCArIGFkanVzdGVkRGVsdGE7XG5cbiAgICAgICAgLy8gQWRqdXN0IHRoZSBjb3JyZXNwb25kaW5nIHJvdyBjZWxsc1xuICAgICAgICB0aGlzLl9yb3dzLmZvckVhY2gocm93ID0+IHJvdy5jZWxsc1tpbmRleF0ud2lkdGggPSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWREZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSBhZGp1c3RlZERlbHRhO1xuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0S2V5RnJvbUtleUNvZGUoY29kZSkge1xuICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dEb3duJztcblxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd1VwJztcblxuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgcmV0dXJuICdFbnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRBcmlhVGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMucmVmcy5hcmlhLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlUm93KHNldEluZGV4KSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVJvdyA9IHNldEluZGV4O1xuICAgICAgICB0aGlzLl9yb3dzLmZvckVhY2gocm93ID0+IHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHNldEluZGV4KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgdGhpcy5fbmV4dEFjdGl2ZVJvdyA9IGZpbmRXaGVyZSh0aGlzLl9yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLl9hY3RpdmVSb3cgKyBkZWx0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25leHRBY3RpdmVSb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHRoaXMuX25leHRBY3RpdmVSb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLl9uZXh0QWN0aXZlUm93LmRhdGFbdGhpcy5fY29sdW1uc1swXS5tYXBwaW5nXSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAoZGVsdGEgPT09IC0xICYmIHRoaXMuX25leHRBY3RpdmVSb3cueSAqIC0xID4gdGhpcy5feSlcbiAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5fbmV4dEFjdGl2ZVJvdy55ICogLTEgLSB0aGlzLl9jZWxsX2ggPCB0aGlzLl95IC0gdGhpcy5fY29udGFpbmVyX2ggKyB0aGlzLl9jZWxsX2gpIC8vIDEgdW5pdCBvZiBjZWxsSGVpZ2h0IGlzIHJlbW92ZWQgdG8gY29tcGVuc2F0ZSBmb3IgdGhlIGhlYWRlciByb3dcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9IHRoaXMuX2NlbGxfaCAqIGRlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2ZhdXhFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLl9hY3RpdmVSb3cgPiAwKVxuICAgICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLl9hY3RpdmVSb3cgPCB0aGlzLnByb3BzLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duXG4gICAgICAgICAgICAgICAgaW4gdGhlIHZpZXdwb3J0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVkgPSAoICAgKCAgICB0aGlzLl9yb3dTdGFydEluZGV4ID4gdGhpcy5fYWN0aXZlUm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9hY3RpdmVSb3cgLSB0aGlzLl9yb3dTdGFydEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICggICAgdGhpcy5fcm93U3RhcnRJbmRleCA8IHRoaXMuX2FjdGl2ZVJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fYWN0aXZlUm93IC0gdGhpcy5fcm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2ZhdXhFdmVudCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBwcm9jZXNzIGFnYWluLCBub3cgdGhhdCB0aGUgcm93IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbmV4dEFjdGl2ZVJvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXkgfHwgdGhpcy5nZXRLZXlGcm9tS2V5Q29kZShldmVudC5rZXlDb2RlKTtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVJvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5fcm93cywgJ3NldEluZGV4JywgdGhpcy5fYWN0aXZlUm93KS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLl9jb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29sdW1uLnRpdGxlfTogJHtyb3dbY29sdW1uLm1hcHBpbmddfWA7XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGNvbnN0IG5vZGVNYXAgPSB7fTtcblxuICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7cm93OiBub2RlfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICgoIW5vZGVNYXAuY2VsbCB8fCAhbm9kZU1hcC5yb3cpICYmIG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChjZWxsQ2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLmNlbGwgPSBub2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAucm93ID0gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlTWFwO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZGlzY292ZXJDZWxsQW5kUm93Tm9kZXMoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICBpZiAobWFwLnJvdykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHJvdy5zZXRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChtYXAuY2VsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DZWxsSW50ZXJhY3QoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0KGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgZGF0YS1zZXQtaWRlbnRpZmllcj17dGhpcy5wcm9wcy5pZGVudGlmaWVyfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJyBjbGFzc05hbWU9J3VpLXRhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYScgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzIHx8ICd1aS1vZmZzY3JlZW4nfSBhcmlhLWxpdmU9J3BvbGl0ZScgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXBwaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgcmVzaXphYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBnZXRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGlkZW50aWZpZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DZWxsSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUm93SW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRocm90dGxlSW50ZXJ2YWw6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgdG90YWxSb3dzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxufTtcblxuVUlUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBjb2x1bW5zOiBbXSxcbiAgICBnZXRSb3c6IG5vb3AsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgIG9uQ2VsbEludGVyYWN0OiBub29wLFxuICAgIG9uUm93SW50ZXJhY3Q6IG5vb3AsXG4gICAgdGhyb3R0bGVJbnRlcnZhbDogMzAwLFxuICAgIHRvdGFsUm93czogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGU7XG4iXX0=