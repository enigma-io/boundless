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
        var _Object$getPrototypeO;

        _classCallCheck(this, UITable);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UITable)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this._columns = [];
        _this._rows = [];
        _this._rowsOrderedByY = [];

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);

        _this.handleTouchStart = _this.handleTouchStart.bind(_this);
        _this.handleTouchMove = _this.handleTouchMove.bind(_this);
        _this.handleMoveIntent = _this.handleMoveIntent.bind(_this);

        _this.handleXScrollHandleDragStart = _this.handleXScrollHandleDragStart.bind(_this);
        _this.handleYScrollHandleDragStart = _this.handleYScrollHandleDragStart.bind(_this);
        _this.handleDragMove = _this.handleDragMove.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);
        _this.handleColumnDragStart = _this.handleColumnDragStart.bind(_this);

        _this.handleWindowResize = _this.handleWindowResize.bind(_this);
        return _this;
    }

    _createClass(UITable, [{
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

            this._dragEvent = { preventDefault: _noop2.default };

            this._touchEvent = { preventDefault: _noop2.default };
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

            this._touchEvent.deltaX = this._lastTouchPageX - this._touch.pageX;
            this._touchEvent.deltaY = this._lastTouchPageY - this._touch.pageY;

            this._lastTouchPageX = this._touch.pageX;
            this._lastTouchPageY = this._touch.pageY;

            this.handleMoveIntent(this._touchEvent);
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
        key: 'handleXScrollHandleDragStart',
        value: function handleXScrollHandleDragStart(event) {
            if (event.button === 0) {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                this._lastXScroll = event.clientX;
                this._manuallyScrollingX = true;

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'handleYScrollHandleDragStart',
        value: function handleYScrollHandleDragStart(event) {
            if (event.button === 0) {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                this._lastYScroll = event.clientY;
                this._manuallyScrollingY = true;

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'handleDragMove',
        value: function handleDragMove(event) {
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
                    this._dragEvent.deltaY = (event.clientY - this._lastYScroll) / this._container_h * this.props.totalRows * this._cell_h;

                    this.handleMoveIntent(this._dragEvent);

                    this._lastYScroll = event.clientY;
                }
            }
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
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

                this._lastColumnX = event.clientX;

                this._manuallyResizingColumn = (0, _findWhere2.default)(this._columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            var _this6 = this;

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
                return row.cells[index].width = _this6._manuallyResizingColumn.width;
            });

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
            var _this7 = this;

            this._nextActiveRow = (0, _findWhere2.default)(this._rows, 'setIndex', this._activeRow + delta);

            if (this._nextActiveRow) {
                this.setActiveRow(this._nextActiveRow.setIndex);
                this.setAriaText(this._nextActiveRow.data[this._columns[0].mapping]);

                if (delta === -1 && this._nextActiveRow.y * -1 > this._y || delta === 1 && this._nextActiveRow.y * -1 - this._cell_h < this._y - this._container_h + this._cell_h // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this._dragEvent.deltaX = 0;
                        this._dragEvent.deltaY = this._cell_h * delta;

                        this.handleMoveIntent(this._dragEvent);
                    }
            } else if (delta === -1 && this._activeRow > 0 || delta === 1 && this._activeRow < this.props.totalRows) {
                /*
                    The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                    in the viewport.
                 */
                this._dragEvent.deltaX = 0;
                this._dragEvent.deltaY = (this._rowStartIndex > this._activeRow && this._activeRow - this._rowStartIndex || (this._rowStartIndex < this._activeRow && this._activeRow - this._rowStartIndex) + delta) * this._cell_h;

                this.handleMoveIntent(this._dragEvent);

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this7.changeActiveRow(delta);
                });
            }

            this._nextActiveRow = null;
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var _this8 = this;

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
                            var row = (0, _findWhere2.default)(_this8._rows, 'setIndex', _this8._activeRow).data;

                            _this8.setAriaText(_this8._columns.map(function (column) {
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
    totalRows: _react2.default.PropTypes.number
};

UITable.defaultProps = {
    className: '',
    columns: [],
    getRow: _noop2.default,
    offscreenClass: 'ui-offscreen',
    onCellInteract: _noop2.default,
    onRowInteract: _noop2.default,
    totalRows: 0
};

exports.default = UITable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0EsSUFBTSxpQkFBaUIscUJBQWpCO0FBQ04sSUFBTSxnQkFBZ0Isb0JBQWhCO0FBQ04sSUFBTSxtQkFBbUIseUJBQW5CO0FBQ04sSUFBTSxvQkFBb0IsMEJBQXBCO0FBQ04sSUFBTSxpQkFBaUIsdUJBQWpCO0FBQ04sSUFBTSxnQkFBZ0Isc0JBQWhCOztBQUVOLElBQU0sY0FBYyxTQUFTLFdBQVQsR0FBbUM7UUFBZCwwREFBSSxpQkFBVTtRQUFQLDBEQUFJLGlCQUFHOztBQUNuRCxXQUFPLGlCQUFpQixDQUFqQixHQUFxQixNQUFyQixHQUE4QixDQUE5QixHQUFrQyxVQUFsQyxDQUQ0QztDQUFuQzs7QUFJcEIsSUFBTSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQyxPQUFoQyxFQUF5QztBQUM5RCxRQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsS0FBZ0MsQ0FBaEMsRUFBbUM7QUFDN0QsYUFBSyxXQUFMLENBQWlCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQixFQUQ2RDtLQUFqRTs7QUFJQSxRQUFNLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVAsQ0FMd0Q7QUFNeEQsU0FBSyxTQUFMLEdBQWlCLHFCQUFqQixDQU53RDs7QUFROUQsUUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFYLENBUndEO0FBU3hELFNBQUssV0FBTCxDQUFpQixRQUFqQixFQVR3RDs7QUFXOUQsU0FBSyxXQUFMLENBQWlCLElBQWpCLEVBWDhEOztBQWE5RCxXQUFPLFFBQVAsQ0FiOEQ7Q0FBekM7O0FBZ0J6QixJQUFNLGdCQUFnQixTQUFTLGFB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QkEsUUFBUSxZQUFSLEdBQXVCO0FBQ25CLGVBQVcsRUFBWDtBQUNBLGFBQVMsRUFBVDtBQUNBLDBCQUhtQjtBQUluQixvQkFBZ0IsY0FBaEI7QUFDQSxrQ0FMbUI7QUFNbkIsaUNBTm1CO0FBT25CLGVBQVcsQ0FBWDtDQVBKOztrQkFVZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBmaW5kV2hlcmUgZnJvbSAnLi4vVUlVdGlscy9maW5kV2hlcmUnO1xuXG4vKipcbiAqIEZPUiBGVVRVUkUgRVlFU1xuICpcbiAqIFNjcm9sbCBwZXJmb3JtYW5jZSBpcyBhIHRyaWNreSBiZWFzdCAtLSBtb3Jlc28gd2hlbiB0cnlpbmcgdG8gbWFpbnRhaW4gNTArIEZQUyBhbmQgcHVtcGluZyBhIGxvdCBvZiBkYXRhXG4gKiB0byB0aGUgRE9NLiBUaGVyZSBhcmUgYSBsb3Qgb2YgY2hvaWNlcyBpbiB0aGlzIGNvbXBvbmVudCB0aGF0IG1heSBzZWVtIG9kZCBhdCBmaXJzdCBibHVzaCwgYnV0IGxldCBpdFxuICogYmUga25vd24gdGhhdCB3ZSB0cmllZCB0byBkbyBpdCB0aGUgUmVhY3QgV2F54oSiIGFuZCBpdCB3YXMgbm90IHBlcmZvcm1hbnQgZW5vdWdoLlxuICpcbiAqIFRoZSBjb21iaW5hdGlvbiB0aGF0IHdhcyBzZXR0bGVkIHVwb24gaXMgYSBSZWFjdCBzaGVsbCB3aXRoIG5hdGl2ZSBET00gZ3V0cy4gVGhpcyBjb21iaW5hdGlvbiB5aWVsZHMgdGhlXG4gKiBiZXN0IHBlcmZvcm1hbmNlLCB3aGlsZSBzdGlsbCBiZWluZyBwZXJmZWN0bHkgaW50ZXJvcGVyYWJsZSB3aXRoIHRoZSByZXN0IG9mIFVJS2l0IGFuZCBSZWFjdCB1c2UgY2FzZXMuXG4gKlxuICogQXQgc29tZSBwb2ludCwgdGhlIGludGVybmFscyB3aWxsIHByb2JhYmx5IGJlIGZ1bGx5LXNlcGFyYXRlZCBpbnRvIGl0cyBvd24gbW9kdWxlIHN1Y2ggdGhhdCBpdCBjYW5cbiAqIGJlIGVtYmVkZGVkIGluIG90aGVyIHBsYWNlcyB3aXRob3V0IFJlYWN0LlxuICpcbiAqIF9fSW1wb3J0YW50IE5vdGVfX1xuICpcbiAqIEFueSB0aW1lIHlvdSBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCwgbWFrZSBzdXJlIHlvdSByZWxlYXNlIGl0IGFmdGVyIGJ5IHNldHRpbmcgaXRzIHZhcmlhYmxlIHRvIGBudWxsYC5cbiAqIElmIHlvdSBkb24ndCwgaXQnbGwgY3JlYXRlIGEgbWVtb3J5IGxlYWsuIEFsc28sIG1ha2Ugc3VyZSBhbGwgZ2VuZXJhdGVkIERPTSBpcyByZW1vdmVkIG9uIGNvbXBvbmVudFdpbGxVbm1vdW50LlxuICovXG5cbi8qKlxuICogT1JERVIgT0YgT1BFUkFUSU9OU1xuICpcbiAqIDEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4gKiAyLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuICogMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG4gKlxuICogSWYgdGhlIGNvbXBvbmVudCB1cGRhdGVzIGR1ZSB0byBuZXcgcHJvcHMsIGp1c3QgYmxvdyBhd2F5IGV2ZXJ5dGhpbmcgYW5kIHN0YXJ0IG92ZXIuIEl0J3MgY2hlYXBlciB0aGFuXG4gKiB0cnlpbmcgdG8gZGlmZi5cbiAqL1xuXG5jb25zdCBjZWxsQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtY2VsbFxcYi9nO1xuY29uc3Qgcm93Q2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93XFxiL2c7XG5jb25zdCBhY3RpdmVDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctYWN0aXZlL2c7XG5jb25zdCBsb2FkaW5nQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93LWxvYWRpbmcvZztcbmNvbnN0IGV2ZW5DbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctZXZlbi9nO1xuY29uc3Qgb2RkQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93LW9kZC9nO1xuXG5jb25zdCB0cmFuc2xhdGUzZCA9IGZ1bmN0aW9uIHRyYW5zbGF0ZTNEKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn07IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG5jb25zdCByZXBhcmVudENlbGxUZXh0ID0gZnVuY3Rpb24gcmVwYXJlbnRDZWxsVGV4dChub2RlLCBjb250ZW50KSB7XG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggJiYgbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbC1pbm5lcic7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0ZXh0Tm9kZTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwnO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0aXRsZScsIGNvbnRlbnQpO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIG1hcHBpbmcpO1xuICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHJlcGFyZW50Q2VsbFRleHQoY2VsbCwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVET01IZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGNyZWF0ZURPTUNlbGwoY29sdW1uLnRpdGxlLCBjb2x1bW4ubWFwcGluZywgd2lkdGgpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtaGVhZGVyLWNlbGwnO1xuXG4gICAgaWYgKGNvbHVtbi5yZXNpemFibGUpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5jbGFzc05hbWUgPSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSc7XG5cbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUhlYWRlckNlbGwobWV0YWRhdGEsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUhlYWRlckNlbGwobWV0YWRhdGEsIG1ldGFkYXRhLndpZHRoIHx8IHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfbWV0YWRhdGEnOiBtZXRhZGF0YSxcbiAgICAgICAgJ190aXRsZSc6IG1ldGFkYXRhLnRpdGxlLFxuICAgICAgICBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICAgICAgc2V0IHRpdGxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fdGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX3RpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogbWV0YWRhdGEud2lkdGggfHwgd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXBwaW5nOiBtZXRhZGF0YS5tYXBwaW5nLFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVDZWxsID0gZnVuY3Rpb24gY3JlYXRlQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVET01Sb3cgPSBmdW5jdGlvbiBjcmVhdGVET01Sb3coc2V0SW5kZXgsIHkpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLXJvdyc7XG4gICAgICAgICAgcm93LnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG5cbiAgICByZXR1cm4gcm93O1xufTtcblxuY29uc3QgY3JlYXRlUm93ID0gZnVuY3Rpb24gY3JlYXRlUm93KG1ldGFkYXRhLCBjb2x1bW5zKSB7XG4gICAgLyogSU1QT1JUQU5UIE5PVEU6IG1ldGFkYXRhLmRhdGEgbWlnaHQgYmUgYSBwcm9taXNlLiBQbGFuIGFjY29yZGluZ2x5LiAqL1xuXG4gICAgY29uc3Qgcm93ID0gY3JlYXRlRE9NUm93KG1ldGFkYXRhLnNldEluZGV4LCBtZXRhZGF0YS55KTtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIGNlbGxzLnB1c2goY3JlYXRlQ2VsbCgnJywgY29sdW1uLm1hcHBpbmcsIGNvbHVtbi53aWR0aCkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsc1tpbmRleF0ubm9kZSk7XG4gICAgfSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIGZyYWdtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHJvd09iaiA9IHtcbiAgICAgICAgbm9kZTogcm93LFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgICdfaXRlcmF0b3InOiBudWxsLFxuICAgICAgICAnX2FjdGl2ZSc6IGZhbHNlLFxuICAgICAgICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9LFxuICAgICAgICBzZXQgYWN0aXZlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShhY3RpdmVDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3NldEluZGV4JzogbnVsbCxcbiAgICAgICAgZ2V0IHNldEluZGV4KCkgeyByZXR1cm4gdGhpcy5fc2V0SW5kZXg7IH0sXG4gICAgICAgIHNldCBzZXRJbmRleCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3NldEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0SW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2Uob2RkQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWV2ZW4nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoZXZlbkNsYXNzUmVnZXgsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1vZGQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19kYXRhJzogbnVsbCxcbiAgICAgICAgJ193YWl0aW5nRm9yUmVzb2x1dGlvbic6IGZhbHNlLFxuICAgICAgICBzZXQgX3dhaXRpbmdGb3JSZXNvbHV0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShsb2FkaW5nQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCByZXNvbHZlZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn07XG5cbmNsYXNzIFVJVGFibGUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLl9yb3dzID0gW107XG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZID0gW107XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlVG91Y2hNb3ZlID0gdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50ID0gdGhpcy5oYW5kbGVNb3ZlSW50ZW50LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCA9IHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdNb3ZlID0gdGhpcy5oYW5kbGVEcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlV2luZG93UmVzaXplID0gdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fYm9keSA9IHRoaXMucmVmcy5ib2R5O1xuICAgICAgICB0aGlzLl9ib2R5X3MgPSB0aGlzLl9ib2R5LnN0eWxlO1xuICAgICAgICB0aGlzLl9oZWFkZXIgPSB0aGlzLnJlZnMuaGVhZGVyO1xuICAgICAgICB0aGlzLl9oZWFkZXJfcyA9IHRoaXMuX2hlYWRlci5zdHlsZTtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZV9zID0gdGhpcy5yZWZzWyd4LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZV9zID0gdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuX2JvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuX2JvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuXG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLl94ID0gdGhpcy5feSA9IDA7XG4gICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5fbmV4dFkgPSAwO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2ZVJvdyA9IC0xO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gbnVsbDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuX2l0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fZHJhZ0V2ZW50ID0ge3ByZXZlbnREZWZhdWx0OiBub29wfTtcblxuICAgICAgICB0aGlzLl90b3VjaEV2ZW50ID0ge3ByZXZlbnREZWZhdWx0OiBub29wfTtcbiAgICAgICAgdGhpcy5fdG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWCA9IHRoaXMuX2xhc3RUb3VjaFBhZ2VZID0gMDtcblxuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSA9IHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7XG4gICAgfVxuXG4gICAgZW1wdHlIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbnMubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5faGVhZGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWRlci5yZW1vdmVDaGlsZCh0aGlzLl9oZWFkZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZENvbHVtbnMoKSB7XG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcblxuICAgICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5fY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uKSkpO1xuICAgIH1cblxuICAgIGNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IGNzO1xuXG4gICAgICAgIHRoaXMuX2NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb2x1bW4ubm9kZSk7XG5cbiAgICAgICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHBhcnNlSW50KGNzWydtaW4td2lkdGgnXSwgMTApO1xuICAgICAgICAgICAgY29sdW1uLm1heFdpZHRoID0gcGFyc2VJbnQoY3NbJ21heC13aWR0aCddLCAxMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluamVjdEhlYWRlckNlbGxzKCkge1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5fY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLl9mcmFnbWVudC5hcHBlbmRDaGlsZChjb2x1bW4ubm9kZSkpO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5hcHBlbmRDaGlsZCh0aGlzLl9mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLmNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgZW1wdHlCb2R5KCkge1xuICAgICAgICB0aGlzLl9yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuX2JvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5qZWN0Rmlyc3RSb3coKSB7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgdGhpcy5fcm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmdldFJvdygwKSxcbiAgICAgICAgICAgIHNldEluZGV4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgdGhpcy5fY29sdW1ucykpO1xuXG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnB1c2goMCk7XG5cbiAgICAgICAgdGhpcy5fYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9yb3dzWzBdLm5vZGUpO1xuICAgIH1cblxuICAgIGluamVjdFJlc3RPZlJvd3MoKSB7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAxOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuX25Sb3dzVG9SZW5kZXI7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX2l0ZXJhdG9yKSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5faXRlcmF0b3IsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5fY2VsbF9oICogdGhpcy5faXRlcmF0b3IsXG4gICAgICAgICAgICB9LCB0aGlzLl9jb2x1bW5zKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnB1c2godGhpcy5faXRlcmF0b3IpO1xuXG4gICAgICAgICAgICB0aGlzLl9mcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9yb3dzW3RoaXMuX2l0ZXJhdG9yXS5ub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMuX2NlbGxfaCA9IHRoaXMuX3Jvd3NbMF0uY2VsbHNbMF0ubm9kZS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbFdpZHRocygpIHtcbiAgICAgICAgdGhpcy5fcm93c1swXS5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGggPSB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCB8fCBjZWxsLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjZWxsLndpZHRoID0gdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5fcm93X3cgPSB0aGlzLl9yb3dzWzBdLm5vZGUuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLl94TWF4aW11bSA9ICAgdGhpcy5fY29udGFpbmVyX3cgPD0gdGhpcy5fcm93X3dcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX2NvbnRhaW5lcl93IC0gdGhpcy5fcm93X3dcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCA9IDA7XG4gICAgICAgIHRoaXMuX3lMb3dlckJvdW5kID0gdGhpcy5fY29udGFpbmVyX2ggLSAodGhpcy5fblJvd3NUb1JlbmRlciAqIHRoaXMuX2NlbGxfaCk7XG4gICAgfSAvLyBkbyBub3QgcnVuIHRoaXMgdW5sZXNzIHJlYnVpbGRpbmcgdGhlIHRhYmxlLCBkb2VzIG5vdCBwcmVzZXJ2ZSBjdXJyZW50IG1pbi9tYXggdGhyZXNob2xkc1xuXG4gICAgY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID0gdGhpcy5fY29udGFpbmVyX3cgLSBNYXRoLmFicyh0aGlzLl94TWF4aW11bSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5feFNjcm9sbEhhbmRsZVNpemU7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplID0gdGhpcy5fY29udGFpbmVyX2ggKiAodGhpcy5fblJvd3NUb1JlbmRlciAvIHRoaXMucHJvcHMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy5feFNjcm9sbFRyYWNrX3cgPSB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLl95U2Nyb2xsVHJhY2tfaCA9IHRoaXMucmVmc1sneS1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3Mud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3MuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLl9jb250YWluZXJfaCA9IHRoaXMucmVmcy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcl93ID0gdGhpcy5yZWZzLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgIH1cblxuICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5fY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuYnVpbGRDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0Rmlyc3RSb3coKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsV2lkdGhzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbEhlaWdodCgpO1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9SZW5kZXIgPSBNYXRoLmNlaWwoKHRoaXMuX2NvbnRhaW5lcl9oICogMS4zKSAvIHRoaXMuX2NlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9SZW5kZXIgPiB0aGlzLnByb3BzLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1JlbmRlciA9IHRoaXMucHJvcHMudG90YWxSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4ID0gdGhpcy5fblJvd3NUb1JlbmRlcjtcblxuICAgICAgICB0aGlzLmluamVjdEhlYWRlckNlbGxzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UmVzdE9mUm93cygpO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWUJvdW5kKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIGhhbmRsZVNjcm9sbERvd24oKSB7XG4gICAgICAgIGlmICggICB0aGlzLl9yb3dFbmRJbmRleCA9PT0gdGhpcy5wcm9wcy50b3RhbFJvd3NcbiAgICAgICAgICAgIHx8IHRoaXMuX25leHRZID49IHRoaXMuX3lMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBsb3dlc3QgWSB2YWx1ZSB0byB0aGUgeUxvd2VyQm91bmQgYW5kIHJlcXVlc3QgdGhlIG5leHQgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMuX25leHRZIC0gdGhpcy5feUxvd2VyQm91bmQpIC8gdGhpcy5fY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCArIHRoaXMuX3Jvd0VuZEluZGV4ICsgMSA+IHRoaXMucHJvcHMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IHRoaXMucHJvcHMudG90YWxSb3dzIC0gdGhpcy5fcm93RW5kSW5kZXggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiB0aGlzLl9uUm93c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogYSB2ZXJ5IGxhcmdlIHNjcm9sbCBkZWx0YSwgY2FsY3VsYXRlIHdoZXJlIHRoZSBib3VuZGFyaWVzIHNob3VsZCBiZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSB0aGlzLl9uUm93c1RvU2hpZnQgLSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgLT0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCAtPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCArPSB0aGlzLl9zaGlmdERlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4ICs9IHRoaXMuX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuX25Sb3dzVG9TaGlmdDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IHRoaXMuX3Jvd0VuZEluZGV4ICsgdGhpcy5faXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gdGhpcy5fcm93c1t0aGlzLl9yb3dzT3JkZXJlZEJ5WVswXV07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5kYXRhID0gdGhpcy5wcm9wcy5nZXRSb3codGhpcy5fdGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnNldEluZGV4ID0gdGhpcy5fdGFyZ2V0SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIueSA9IHRoaXMuX3RhcmdldEluZGV4ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLmFjdGl2ZSA9IHRoaXMuX3RhcmdldEluZGV4ID09PSB0aGlzLl9hY3RpdmVSb3c7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkucHVzaCh0aGlzLl9yb3dzT3JkZXJlZEJ5WS5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ICs9IHRoaXMuX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCArPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCAtPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgLT0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yb3dTdGFydEluZGV4ID09PSAwIHx8IHRoaXMuX25leHRZIDw9IHRoaXMuX3lVcHBlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgaGlnaGVzdCBZIHZhbHVlIHRvIHRoZSB5VXBwZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgcHJldmlvdXMgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMuX25leHRZIC0gdGhpcy5feVVwcGVyQm91bmQpIC8gdGhpcy5fY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jvd1N0YXJ0SW5kZXggLSB0aGlzLl9uUm93c1RvU2hpZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSB0aGlzLl9yb3dTdGFydEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiB0aGlzLl9uUm93c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogYSB2ZXJ5IGxhcmdlIHNjcm9sbCBkZWx0YSwgY2FsY3VsYXRlIHdoZXJlIHRoZSBib3VuZGFyaWVzIHNob3VsZCBiZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSB0aGlzLl9uUm93c1RvU2hpZnQgLSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgKz0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCArPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCAtPSB0aGlzLl9zaGlmdERlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4IC09IHRoaXMuX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gdGhpcy5fcm93c09yZGVyZWRCeVkubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuX25Sb3dzVG9TaGlmdDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IHRoaXMuX3Jvd1N0YXJ0SW5kZXggLSB0aGlzLl9pdGVyYXRvciAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IHRoaXMuX3Jvd3NbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WVt0aGlzLl9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5kYXRhID0gdGhpcy5wcm9wcy5nZXRSb3codGhpcy5fdGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnNldEluZGV4ID0gdGhpcy5fdGFyZ2V0SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIueSA9IHRoaXMuX3RhcmdldEluZGV4ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLmFjdGl2ZSA9IHRoaXMuX3RhcmdldEluZGV4ID09PSB0aGlzLl9hY3RpdmVSb3c7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkudW5zaGlmdCh0aGlzLl9yb3dzT3JkZXJlZEJ5WS5wb3AoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCAtPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggLT0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgKz0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMuX3lMb3dlckJvdW5kICs9IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fdG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIHRoaXMuX2xhc3RUb3VjaFBhZ2VYID0gdGhpcy5fdG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuX2xhc3RUb3VjaFBhZ2VZID0gdGhpcy5fdG91Y2gucGFnZVk7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogd2UgaGFuZGxlIHRvdWNobW92ZSBieSBkZXRlY3RpbmcgdGhlIGRlbHRhIG9mIHBhZ2VYL1kgYW5kIGZvcndhcmRpbmdcbiAgICAgICAgaXQgdG8gaGFuZGxlTW92ZUludGVudCgpICovXG5cbiAgICAgICAgdGhpcy5fdG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG5cbiAgICAgICAgdGhpcy5fdG91Y2hFdmVudC5kZWx0YVggPSB0aGlzLl9sYXN0VG91Y2hQYWdlWCAtIHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl90b3VjaEV2ZW50LmRlbHRhWSA9IHRoaXMuX2xhc3RUb3VjaFBhZ2VZIC0gdGhpcy5fdG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVggPSB0aGlzLl90b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVkgPSB0aGlzLl90b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fdG91Y2hFdmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlTW92ZUludGVudChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgoZXZlbnQuZGVsdGFYID09PSAwICYmIGV2ZW50LmRlbHRhWSA9PT0gMClcbiAgICAgICAgICAgIHx8IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSAmJiBldmVudC5kZWx0YVkgPT09IDBcbiAgICAgICAgICAgIHx8IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCAmJiBldmVudC5kZWx0YVggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1pbmltdW0gdHJhbnNsYXRpb24gc2hvdWxkIGJlIG9uZSByb3cgaGVpZ2h0XG4gICAgICAgIHRoaXMuX2RlbHRhWCA9IGV2ZW50LmRlbHRhWDtcblxuICAgICAgICAvLyBkZWx0YU1vZGUgMCA9PT0gcGl4ZWxzLCAxID09PSBsaW5lc1xuICAgICAgICB0aGlzLl9kZWx0YVkgPSBldmVudC5kZWx0YU1vZGUgPT09IDEgPyBwYXJzZUludChldmVudC5kZWx0YVksIDEwKSAqIHRoaXMuX2NlbGxfaCA6IGV2ZW50LmRlbHRhWTtcblxuICAgICAgICAvKiBsb2NrIHRoZSB0cmFuc2xhdGlvbiBheGlzIGlmIHRoZSB1c2VyIGlzIG1hbmlwdWxhdGluZyB0aGUgc3ludGhldGljIHNjcm9sbGJhcnMgKi9cbiAgICAgICAgdGhpcy5fbmV4dFggPSB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgPyAwIDogdGhpcy5feCAtIHRoaXMuX2RlbHRhWDtcblxuICAgICAgICBpZiAodGhpcy5fbmV4dFggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0WCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmV4dFggPCB0aGlzLl94TWF4aW11bSkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dFggPSB0aGlzLl94TWF4aW11bTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25leHRZID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID8gMCA6IHRoaXMuX3kgLSB0aGlzLl9kZWx0YVk7XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbmV4dFkgPCB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTY3JvbGxEb3duKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25leHRZID4gdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsVXAoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25leHRZID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRZID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmV4dFkgPCB0aGlzLl95TG93ZXJCb3VuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRZID0gdGhpcy5feUxvd2VyQm91bmQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0WCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbiA9ICAgKE1hdGguYWJzKHRoaXMuX25leHRYKSAvICh0aGlzLl9yb3dfdyAtIHRoaXMuX2NvbnRhaW5lcl93KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICh0aGlzLl94U2Nyb2xsVHJhY2tfdyAtIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gKyB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSA+IHRoaXMuX3hTY3JvbGxUcmFja193KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IHRoaXMuX3hTY3JvbGxUcmFja193IC0gdGhpcy5feFNjcm9sbEhhbmRsZVNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5uZXh0WSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiA9ICAgKE1hdGguYWJzKHRoaXMuX25leHRZKSAvICgodGhpcy5wcm9wcy50b3RhbFJvd3MgKiB0aGlzLl9jZWxsX2gpIC0gdGhpcy5fY29udGFpbmVyX2gpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKHRoaXMuX3lTY3JvbGxUcmFja19oIC0gdGhpcy5feVNjcm9sbEhhbmRsZVNpemUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiArIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplID4gdGhpcy5feVNjcm9sbFRyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uID0gdGhpcy5feVNjcm9sbFRyYWNrX2ggLSB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpOyAvLyBEbyBhbGwgdHJhbnNmb3JtcyBncm91cGVkIHRvZ2V0aGVyXG5cbiAgICAgICAgICAgIHRoaXMuX3ggPSB0aGlzLl9uZXh0WDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB0aGlzLl9uZXh0WTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGVyZm9ybVRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgdGhpcy5faGVhZGVyX3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh0aGlzLl9uZXh0WCk7XG4gICAgICAgIHRoaXMuX2JvZHlfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHRoaXMuX25leHRYLCB0aGlzLl9uZXh0WSk7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbik7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uUmVzaXplKGV2ZW50LmNsaWVudFggLSB0aGlzLl9sYXN0Q29sdW1uWCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYW51YWxseVNjcm9sbGluZ1gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnRXZlbnQuZGVsdGFYID0gZXZlbnQuY2xpZW50WCAtIHRoaXMuX2xhc3RYU2Nyb2xsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2RyYWdFdmVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnRXZlbnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnRXZlbnQuZGVsdGFZID0gKChldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdFlTY3JvbGwpIC8gdGhpcy5fY29udGFpbmVyX2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5wcm9wcy50b3RhbFJvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZHJhZ0V2ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RZU2Nyb2xsID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyYWdFbmQoKSB7XG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuXG4gICAgICAgICAgICB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gZmluZFdoZXJlKHRoaXMuX2NvbHVtbnMsICdtYXBwaW5nJywgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbHVtbnMuaW5kZXhPZih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uKTtcbiAgICAgICAgbGV0IGFkanVzdGVkRGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWREZWx0YSA8IDBcbiAgICAgICAgICAgICYmICFpc05hTih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1pbldpZHRoKVxuICAgICAgICAgICAgJiYgdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPCB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWluV2lkdGggLSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGggKyBhZGp1c3RlZERlbHRhID4gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWF4V2lkdGggLSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRqdXN0IHRoZSBjb2x1bW4gaGVhZGVyIGNlbGxcbiAgICAgICAgdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGggKyBhZGp1c3RlZERlbHRhO1xuXG4gICAgICAgIC8vIEFkanVzdCB0aGUgY29ycmVzcG9uZGluZyByb3cgY2VsbHNcbiAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKHJvdyA9PiByb3cuY2VsbHNbaW5kZXhdLndpZHRoID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCk7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgIC8qIElmIGEgY29sdW1uIHNocmlua3MsIHRoZSB3cmFwcGVyIFggdHJhbnNsYXRpb24gbmVlZHMgdG8gYmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkgb3JcbiAgICAgICAgd2UnbGwgc2VlIHVud2FudGVkIHdoaXRlc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGUuIElmIHRoZSB0YWJsZSB3aWR0aCBiZWNvbWVzIHNtYWxsZXIgdGhhbiB0aGUgb3ZlcmFsbCBjb250YWluZXIsIHdoaXRlc3BhY2Ugd2lsbCBhcHBlYXIgcmVnYXJkbGVzcy4gKi9cbiAgICAgICAgaWYgKGFkanVzdGVkRGVsdGEgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnRXZlbnQuZGVsdGFYID0gYWRqdXN0ZWREZWx0YTtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZHJhZ0V2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleUZyb21LZXlDb2RlKGNvZGUpIHtcbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93RG93bic7XG5cbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dVcCc7XG5cbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIHJldHVybiAnRW50ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0QXJpYVRleHQodGV4dCkge1xuICAgICAgICB0aGlzLnJlZnMuYXJpYS5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVJvdyhzZXRJbmRleCkge1xuICAgICAgICB0aGlzLl9hY3RpdmVSb3cgPSBzZXRJbmRleDtcbiAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKHJvdyA9PiByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSBzZXRJbmRleCk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlUm93KGRlbHRhKSB7XG4gICAgICAgIHRoaXMuX25leHRBY3RpdmVSb3cgPSBmaW5kV2hlcmUodGhpcy5fcm93cywgJ3NldEluZGV4JywgdGhpcy5fYWN0aXZlUm93ICsgZGVsdGEpO1xuXG4gICAgICAgIGlmICh0aGlzLl9uZXh0QWN0aXZlUm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyh0aGlzLl9uZXh0QWN0aXZlUm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5fbmV4dEFjdGl2ZVJvdy5kYXRhW3RoaXMuX2NvbHVtbnNbMF0ubWFwcGluZ10pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLl9uZXh0QWN0aXZlUm93LnkgKiAtMSA+IHRoaXMuX3kpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuX25leHRBY3RpdmVSb3cueSAqIC0xIC0gdGhpcy5fY2VsbF9oIDwgdGhpcy5feSAtIHRoaXMuX2NvbnRhaW5lcl9oICsgdGhpcy5fY2VsbF9oKSAvLyAxIHVuaXQgb2YgY2VsbEhlaWdodCBpcyByZW1vdmVkIHRvIGNvbXBlbnNhdGUgZm9yIHRoZSBoZWFkZXIgcm93XG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVkgPSB0aGlzLl9jZWxsX2ggKiBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9kcmFnRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5fYWN0aXZlUm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5fYWN0aXZlUm93IDwgdGhpcy5wcm9wcy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93blxuICAgICAgICAgICAgICAgIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fZHJhZ0V2ZW50LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9kcmFnRXZlbnQuZGVsdGFZID0gKCAgICggICAgdGhpcy5fcm93U3RhcnRJbmRleCA+IHRoaXMuX2FjdGl2ZVJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fYWN0aXZlUm93IC0gdGhpcy5fcm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPCB0aGlzLl9hY3RpdmVSb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX2FjdGl2ZVJvdyAtIHRoaXMuX3Jvd1N0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBkZWx0YSkgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9kcmFnRXZlbnQpO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25leHRBY3RpdmVSb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgbGV0IGtleSA9IGV2ZW50LmtleSB8fCB0aGlzLmdldEtleUZyb21LZXlDb2RlKGV2ZW50LmtleUNvZGUpO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVSb3cgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLl9yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLl9hY3RpdmVSb3cpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuX2NvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvd1tjb2x1bW4ubWFwcGluZ119YDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGxldCBub2RlTWFwID0ge307XG5cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvdzogbm9kZX07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoKCFub2RlTWFwLmNlbGwgfHwgIW5vZGVNYXAucm93KSAmJiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2goY2VsbENsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLnJvdyA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZU1hcDtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHJvdy5zZXRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChtYXAuY2VsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DZWxsSW50ZXJhY3QoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0KGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgZGF0YS1zZXQtaWRlbnRpZmllcj17dGhpcy5wcm9wcy5pZGVudGlmaWVyfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJyBjbGFzc05hbWU9J3VpLXRhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYScgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzIHx8ICd1aS1vZmZzY3JlZW4nfSBhcmlhLWxpdmU9J3BvbGl0ZScgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXBwaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgcmVzaXphYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBnZXRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGlkZW50aWZpZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DZWxsSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUm93SW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRvdGFsUm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cblVJVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICAgIGNsYXNzTmFtZTogJycsXG4gICAgY29sdW1uczogW10sXG4gICAgZ2V0Um93OiBub29wLFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNlbGxJbnRlcmFjdDogbm9vcCxcbiAgICBvblJvd0ludGVyYWN0OiBub29wLFxuICAgIHRvdGFsUm93czogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGU7XG4iXX0=