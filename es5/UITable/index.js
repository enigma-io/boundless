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
            this.handleColumnAutoExpand = this.handleColumnAutoExpand.bind(this);

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
            this._header.addEventListener('dblclick', this.handleColumnAutoExpand);

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
            this._header.removeEventListener('dblclick', this.handleColumnAutoExpand);

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
        key: 'applyNewColumnWidth',
        value: function applyNewColumnWidth(index, width) {
            this._columns[index].width = width;
            this._rows.forEach(function (row) {
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

            var index = this._columns.indexOf(this._manuallyResizingColumn);
            var adjustedDelta = delta;

            if (adjustedDelta < 0 && !isNaN(this._manuallyResizingColumn.minWidth) && this._manuallyResizingColumn.width + adjustedDelta < this._manuallyResizingColumn.minWidth) {
                adjustedDelta = this._manuallyResizingColumn.minWidth - this._manuallyResizingColumn.width;
            } else if (!isNaN(this._manuallyResizingColumn.maxWidth) && this._manuallyResizingColumn.width + adjustedDelta > this._manuallyResizingColumn.maxWidth) {
                adjustedDelta = this._manuallyResizingColumn.maxWidth - this._manuallyResizingColumn.width;
            }

            this.applyNewColumnWidth(index, this._manuallyResizingColumn.width + adjustedDelta);

            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
            if (adjustedDelta < 0) {
                this._fauxEvent.deltaX = adjustedDelta;
                this._fauxEvent.deltaY = 0;

                this.handleMoveIntent(this._fauxEvent);
            }
        }
    }, {
        key: 'handleColumnAutoExpand',
        value: function handleColumnAutoExpand(event) {
            var _this7 = this;

            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this7._columns, 'mapping', mapping);
                    var columnIndex = _this7._columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = undefined;

                    _this7._rows.forEach(function (row) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0EsSUFBTSxpQkFBaUIscUJBQWpCO0FBQ04sSUFBTSxnQkFBZ0Isb0JBQWhCO0FBQ04sSUFBTSxtQkFBbUIseUJBQW5CO0FBQ04sSUFBTSxvQkFBb0IsMEJBQXBCO0FBQ04sSUFBTSxpQkFBaUIsdUJBQWpCO0FBQ04sSUFBTSxnQkFBZ0Isc0JBQWhCOztBQUVOLElBQU0sY0FBYyxTQUFTLFdBQVQsR0FBbUM7UUFBZCwwREFBSSxpQkFBVTtRQUFQLDBEQUFJLGlCQUFHOztBQUNuRCxXQUFPLGlCQUFpQixDQUFqQixHQUFxQixNQUFyQixHQUE4QixDQUE5QixHQUFrQyxVQUFsQyxDQUQ0QztDQUFuQzs7QUFJcEIsSUFBTSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQyxPQUFoQyxFQUF5QztBQUM5RCxRQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsS0FBZ0MsQ0FBaEMsRUFBbUM7QUFDN0QsYUFBSyxXQUFMLENBQWlCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQixFQUQ2RDtLQUFqRTs7QUFJQSxRQUFNLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVAsQ0FMd0Q7QUFNeEQsU0FBSyxTQUFMLEdBQWlCLHFCQUFqQixDQU53RDs7QUFROUQsUUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFYLENBUndEO0FBU3hELFNBQUssV0FBTCxDQUFpQixRQUFqQixFQVR3RDs7QUFXOUQsU0FBSyxXQUFMLENBQWlCLElBQWpCLEVBWDhEOztBQWE5RCxXQUFPLFFBQVAsQ0FiOEQ7Q0FBekM7O0FBZ0J6QixJQUFNLGdCQUFnQixTQUFTLGFB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MEJBQVYsRUFBM0IsQ0FESjtxQkFKSjtpQkFUSjtnQkFpQkksdUNBQUssS0FBSSxNQUFKLEVBQVcsV0FBVyxLQUFLLEtBQUwsQ0FBVyxjQUFYLElBQTZCLGNBQTdCLEVBQTZDLGFBQVUsUUFBVixFQUF4RSxDQWpCSjthQURKLENBREs7Ozs7V0E1eUJQOzs7QUFxMEJOLFFBQVEsU0FBUixHQUFvQjtBQUNoQixhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FDTCxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCO0FBQ2xCLGlCQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDVCxtQkFBVyxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ1gsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0tBSlgsQ0FESyxDQUFUO0FBUUEsWUFBUSxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ1IsZ0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNaLG9CQUFnQixnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ2hCLG9CQUFnQixnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ2hCLG1CQUFlLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDZixzQkFBa0IsZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNsQixlQUFXLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7Q0FmZjs7QUFrQkEsUUFBUSxZQUFSLEdBQXVCO0FBQ25CLGVBQVcsRUFBWDtBQUNBLGFBQVMsRUFBVDtBQUNBLDBCQUhtQjtBQUluQixvQkFBZ0IsY0FBaEI7QUFDQSxrQ0FMbUI7QUFNbkIsaUNBTm1CO0FBT25CLHNCQUFrQixHQUFsQjtBQUNBLGVBQVcsQ0FBWDtDQVJKOztrQkFXZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBmaW5kV2hlcmUgZnJvbSAnLi4vVUlVdGlscy9maW5kV2hlcmUnO1xuXG4vKipcbiAqIEZPUiBGVVRVUkUgRVlFU1xuICpcbiAqIFNjcm9sbCBwZXJmb3JtYW5jZSBpcyBhIHRyaWNreSBiZWFzdCAtLSBtb3Jlc28gd2hlbiB0cnlpbmcgdG8gbWFpbnRhaW4gNTArIEZQUyBhbmQgcHVtcGluZyBhIGxvdCBvZiBkYXRhXG4gKiB0byB0aGUgRE9NLiBUaGVyZSBhcmUgYSBsb3Qgb2YgY2hvaWNlcyBpbiB0aGlzIGNvbXBvbmVudCB0aGF0IG1heSBzZWVtIG9kZCBhdCBmaXJzdCBibHVzaCwgYnV0IGxldCBpdFxuICogYmUga25vd24gdGhhdCB3ZSB0cmllZCB0byBkbyBpdCB0aGUgUmVhY3QgV2F54oSiIGFuZCBpdCB3YXMgbm90IHBlcmZvcm1hbnQgZW5vdWdoLlxuICpcbiAqIFRoZSBjb21iaW5hdGlvbiB0aGF0IHdhcyBzZXR0bGVkIHVwb24gaXMgYSBSZWFjdCBzaGVsbCB3aXRoIG5hdGl2ZSBET00gZ3V0cy4gVGhpcyBjb21iaW5hdGlvbiB5aWVsZHMgdGhlXG4gKiBiZXN0IHBlcmZvcm1hbmNlLCB3aGlsZSBzdGlsbCBiZWluZyBwZXJmZWN0bHkgaW50ZXJvcGVyYWJsZSB3aXRoIHRoZSByZXN0IG9mIFVJS2l0IGFuZCBSZWFjdCB1c2UgY2FzZXMuXG4gKlxuICogQXQgc29tZSBwb2ludCwgdGhlIGludGVybmFscyB3aWxsIHByb2JhYmx5IGJlIGZ1bGx5LXNlcGFyYXRlZCBpbnRvIGl0cyBvd24gbW9kdWxlIHN1Y2ggdGhhdCBpdCBjYW5cbiAqIGJlIGVtYmVkZGVkIGluIG90aGVyIHBsYWNlcyB3aXRob3V0IFJlYWN0LlxuICpcbiAqIF9fSW1wb3J0YW50IE5vdGVfX1xuICpcbiAqIEFueSB0aW1lIHlvdSBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCwgbWFrZSBzdXJlIHlvdSByZWxlYXNlIGl0IGFmdGVyIGJ5IHNldHRpbmcgaXRzIHZhcmlhYmxlIHRvIGBudWxsYC5cbiAqIElmIHlvdSBkb24ndCwgaXQnbGwgY3JlYXRlIGEgbWVtb3J5IGxlYWsuIEFsc28sIG1ha2Ugc3VyZSBhbGwgZ2VuZXJhdGVkIERPTSBpcyByZW1vdmVkIG9uIGNvbXBvbmVudFdpbGxVbm1vdW50LlxuICovXG5cbi8qKlxuICogT1JERVIgT0YgT1BFUkFUSU9OU1xuICpcbiAqIDEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4gKiAyLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuICogMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG4gKlxuICogSWYgdGhlIGNvbXBvbmVudCB1cGRhdGVzIGR1ZSB0byBuZXcgcHJvcHMsIGp1c3QgYmxvdyBhd2F5IGV2ZXJ5dGhpbmcgYW5kIHN0YXJ0IG92ZXIuIEl0J3MgY2hlYXBlciB0aGFuXG4gKiB0cnlpbmcgdG8gZGlmZi5cbiAqL1xuXG5jb25zdCBjZWxsQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtY2VsbFxcYi9nO1xuY29uc3Qgcm93Q2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93XFxiL2c7XG5jb25zdCBhY3RpdmVDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctYWN0aXZlL2c7XG5jb25zdCBsb2FkaW5nQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93LWxvYWRpbmcvZztcbmNvbnN0IGV2ZW5DbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctZXZlbi9nO1xuY29uc3Qgb2RkQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93LW9kZC9nO1xuXG5jb25zdCB0cmFuc2xhdGUzZCA9IGZ1bmN0aW9uIHRyYW5zbGF0ZTNEKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn07IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG5jb25zdCByZXBhcmVudENlbGxUZXh0ID0gZnVuY3Rpb24gcmVwYXJlbnRDZWxsVGV4dChub2RlLCBjb250ZW50KSB7XG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggJiYgbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbC1pbm5lcic7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0ZXh0Tm9kZTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwnO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0aXRsZScsIGNvbnRlbnQpO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIG1hcHBpbmcpO1xuICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHJlcGFyZW50Q2VsbFRleHQoY2VsbCwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVET01IZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGNyZWF0ZURPTUNlbGwoY29sdW1uLnRpdGxlLCBjb2x1bW4ubWFwcGluZywgd2lkdGgpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtaGVhZGVyLWNlbGwnO1xuXG4gICAgaWYgKGNvbHVtbi5yZXNpemFibGUpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5jbGFzc05hbWUgPSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSc7XG5cbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUhlYWRlckNlbGwobWV0YWRhdGEsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUhlYWRlckNlbGwobWV0YWRhdGEsIG1ldGFkYXRhLndpZHRoIHx8IHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfbWV0YWRhdGEnOiBtZXRhZGF0YSxcbiAgICAgICAgJ190aXRsZSc6IG1ldGFkYXRhLnRpdGxlLFxuICAgICAgICBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICAgICAgc2V0IHRpdGxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fdGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX3RpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogbWV0YWRhdGEud2lkdGggfHwgd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXBwaW5nOiBtZXRhZGF0YS5tYXBwaW5nLFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVDZWxsID0gZnVuY3Rpb24gY3JlYXRlQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cnVlV2lkdGg6IGZ1bmN0aW9uIHRydWVXaWR0aCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ2xhc3NlcyA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWU7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpO1xuXG4gICAgICAgICAgICAvLyB0YWtlIG9mZiB0aGUgaW5uZXIgY2xhc3Mgd2hpY2ggaXMgd2hhdCBjYXVzZXMgdGhlIHNpemluZyBjb25zdHJhaW50XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gJyc7XG5cbiAgICAgICAgICAgIC8qIENhcHR1cmUgdGhlIG5ldyBhZGp1c3RlZCBzaXplLCBoYXZlIHRvIHVzZSB0aGUgaGFyZCB3YXkgYmVjYXVzZSAuY2xpZW50V2lkdGggcmV0dXJuc1xuICAgICAgICAgICAgYW4gaW50ZWdlciB2YWx1ZSwgcmF0aGVyIHRoYW4gdGhlIF9hY3R1YWxfIHdpZHRoLiBTTUguICovXG4gICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgLy8gUHV0IGV2ZXJ5dGhpbmcgYmFja1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gY2hpbGRDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3V2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSAndWktdGFibGUtcm93JztcbiAgICAgICAgICByb3cuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBmdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxzW2luZGV4XS5ub2RlKTtcbiAgICB9KTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgZnJhZ21lbnQgPSBudWxsO1xuXG4gICAgY29uc3Qgcm93T2JqID0ge1xuICAgICAgICBub2RlOiByb3csXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgJ19pdGVyYXRvcic6IG51bGwsXG4gICAgICAgICdfYWN0aXZlJzogZmFsc2UsXG4gICAgICAgIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH0sXG4gICAgICAgIHNldCBhY3RpdmUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKGFjdGl2ZUNsYXNzUmVnZXgsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfc2V0SW5kZXgnOiBudWxsLFxuICAgICAgICBnZXQgc2V0SW5kZXgoKSB7IHJldHVybiB0aGlzLl9zZXRJbmRleDsgfSxcbiAgICAgICAgc2V0IHNldEluZGV4KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fc2V0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbmRleCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXRJbmRleCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShvZGRDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctZXZlbic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShldmVuQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LW9kZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIHNldCBfd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKGxvYWRpbmdDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UgfHwgdGhpcy5fZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldFJvd0RhdGEocHJvbWlzZSwgcmVzb2x2ZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn07XG5cbmNsYXNzIFVJVGFibGUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLl9yb3dzID0gW107XG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZID0gW107XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlVG91Y2hNb3ZlID0gdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50ID0gdGhpcy5oYW5kbGVNb3ZlSW50ZW50LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCA9IHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uID0gdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uID0gdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ01vdmUgPSB0aGlzLmhhbmRsZURyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCA9IHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCA9IHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlV2luZG93UmVzaXplID0gdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fYm9keSA9IHRoaXMucmVmcy5ib2R5O1xuICAgICAgICB0aGlzLl9ib2R5X3MgPSB0aGlzLl9ib2R5LnN0eWxlO1xuICAgICAgICB0aGlzLl9oZWFkZXIgPSB0aGlzLnJlZnMuaGVhZGVyO1xuICAgICAgICB0aGlzLl9oZWFkZXJfcyA9IHRoaXMuX2hlYWRlci5zdHlsZTtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZV9zID0gdGhpcy5yZWZzWyd4LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZV9zID0gdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuX2hlYWRlci5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5fYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuX2hlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5fYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuXG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLl94ID0gdGhpcy5feSA9IDA7XG4gICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5fbmV4dFkgPSAwO1xuICAgICAgICB0aGlzLl9sYXN0WFNjcm9sbCA9IHRoaXMuX2xhc3RZU2Nyb2xsID0gMDtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uID0gdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uID0gMDtcblxuICAgICAgICB0aGlzLl9hY3RpdmVSb3cgPSAtMTtcbiAgICAgICAgdGhpcy5fbmV4dEFjdGl2ZVJvdyA9IG51bGw7XG5cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHZhcmlhYmxlcyBpbiB2YXJpb3VzIGNhbGN1bGF0aW9uc1xuICAgICAgICB0aGlzLl9pdGVyYXRvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaGlmdERlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGFyZ2V0SW5kZXggPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2RyYWdUaW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fZmF1eEV2ZW50ID0ge3ByZXZlbnREZWZhdWx0OiBub29wfTtcblxuICAgICAgICB0aGlzLl90b3VjaCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RUb3VjaFBhZ2VYID0gdGhpcy5fbGFzdFRvdWNoUGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID0gdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSBudWxsO1xuXG4gICAgICAgIC8vIHJlc2V0IVxuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBlbXB0eUhlYWRlcigpIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucy5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLl9oZWFkZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZGVyLnJlbW92ZUNoaWxkKHRoaXMuX2hlYWRlci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLl9jb2x1bW5zLnB1c2goY3JlYXRlSGVhZGVyQ2VsbChjb2x1bW4pKSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgY3M7XG5cbiAgICAgICAgdGhpcy5fY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbHVtbi5ub2RlKTtcblxuICAgICAgICAgICAgY29sdW1uLm1pbldpZHRoID0gcGFyc2VJbnQoY3NbJ21pbi13aWR0aCddLCAxMCk7XG4gICAgICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSBwYXJzZUludChjc1snbWF4LXdpZHRoJ10sIDEwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB0aGlzLl9jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuX2ZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5faGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuX2ZyYWdtZW50KTtcblxuICAgICAgICAvLyBtdXN0IGJlIGRvbmUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gaW5qZWN0ZWQgaW50byB0aGUgRE9NXG4gICAgICAgIHRoaXMuY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBlbXB0eUJvZHkoKSB7XG4gICAgICAgIHRoaXMuX3Jvd3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5fYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2JvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICB0aGlzLl9yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KDApLFxuICAgICAgICAgICAgc2V0SW5kZXg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCB0aGlzLl9jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkucHVzaCgwKTtcblxuICAgICAgICB0aGlzLl9ib2R5LmFwcGVuZENoaWxkKHRoaXMuX3Jvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgaW5qZWN0UmVzdE9mUm93cygpIHtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDE7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5fblJvd3NUb1JlbmRlcjsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5fcm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5nZXRSb3codGhpcy5faXRlcmF0b3IpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLl9pdGVyYXRvcixcbiAgICAgICAgICAgICAgICB5OiB0aGlzLl9jZWxsX2ggKiB0aGlzLl9pdGVyYXRvcixcbiAgICAgICAgICAgIH0sIHRoaXMuX2NvbHVtbnMpKTtcblxuICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkucHVzaCh0aGlzLl9pdGVyYXRvcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX3Jvd3NbdGhpcy5faXRlcmF0b3JdLm5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5fY2VsbF9oID0gdGhpcy5fcm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsV2lkdGhzKCkge1xuICAgICAgICB0aGlzLl9yb3dzWzBdLmNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoIHx8IGNlbGwubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNlbGwud2lkdGggPSB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWEJvdW5kKCkge1xuICAgICAgICB0aGlzLl9yb3dfdyA9IHRoaXMuX3Jvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuX3hNYXhpbXVtID0gICB0aGlzLl9jb250YWluZXJfdyA8PSB0aGlzLl9yb3dfd1xuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fY29udGFpbmVyX3cgLSB0aGlzLl9yb3dfd1xuICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZQm91bmQoKSB7XG4gICAgICAgIHRoaXMuX3lVcHBlckJvdW5kID0gMDtcbiAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgPSB0aGlzLl9jb250YWluZXJfaCAtICh0aGlzLl9uUm93c1RvUmVuZGVyICogdGhpcy5fY2VsbF9oKTtcbiAgICB9IC8vIGRvIG5vdCBydW4gdGhpcyB1bmxlc3MgcmVidWlsZGluZyB0aGUgdGFibGUsIGRvZXMgbm90IHByZXNlcnZlIGN1cnJlbnQgbWluL21heCB0aHJlc2hvbGRzXG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSB0aGlzLl9jb250YWluZXJfdyAtIE1hdGguYWJzKHRoaXMuX3hNYXhpbXVtKTtcblxuICAgICAgICBpZiAodGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSB0aGlzLl9jb250YWluZXJfaCAqICh0aGlzLl9uUm93c1RvUmVuZGVyIC8gdGhpcy5wcm9wcy50b3RhbFJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVTY3JvbGxCYXJzKCkge1xuICAgICAgICB0aGlzLl94U2Nyb2xsVHJhY2tfdyA9IHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxUcmFja19oID0gdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVfcy53aWR0aCA9IHRoaXMuY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVfcy5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcl9oID0gdGhpcy5yZWZzLndyYXBwZXIuY2xpZW50SGVpZ2h0IHx8IDE1MDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyX3cgPSB0aGlzLnJlZnMud3JhcHBlci5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgfVxuXG4gICAgaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy5yZWZzLndyYXBwZXIuY2xpZW50SGVpZ2h0ICE9PSB0aGlzLl9jb250YWluZXJfaCkge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIG1heSBiZSBuZWVkZWQgdG8gZGlzcGxheSB0aGUgZGF0YSwgc28gd2UgbmVlZCB0byByZWJ1aWxkICovXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIHJlZ2VuZXJhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXRJbnRlcm5hbHMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5idWlsZENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5pbmplY3RGaXJzdFJvdygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxXaWR0aHMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsSGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5fblJvd3NUb1JlbmRlciA9IE1hdGguY2VpbCgodGhpcy5fY29udGFpbmVyX2ggKiAxLjMpIC8gdGhpcy5fY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1JlbmRlciA+IHRoaXMucHJvcHMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLl9uUm93c1RvUmVuZGVyID0gdGhpcy5wcm9wcy50b3RhbFJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggPSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgIHRoaXMuaW5qZWN0SGVhZGVyQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5pbmplY3RSZXN0T2ZSb3dzKCk7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVZQm91bmQoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsRG93bigpIHtcbiAgICAgICAgaWYgKCAgIHRoaXMuX3Jvd0VuZEluZGV4ID09PSB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgfHwgdGhpcy5fbmV4dFkgPj0gdGhpcy5feUxvd2VyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIGxvd2VzdCBZIHZhbHVlIHRvIHRoZSB5TG93ZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgbmV4dCByb3cuIFNjYWxlIGFwcHJvcHJpYXRlbHkgaWYgYSBiaWcgZGVsdGEgYW5kIG1pZ3JhdGUgYXMgbWFueSByb3dzIGFzIGFyZSBuZWNlc3NhcnkuICovXG5cbiAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5fbmV4dFkgLSB0aGlzLl95TG93ZXJCb3VuZCkgLyB0aGlzLl9jZWxsX2hcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ICsgdGhpcy5fcm93RW5kSW5kZXggKyAxID4gdGhpcy5wcm9wcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5wcm9wcy50b3RhbFJvd3MgLSB0aGlzLl9yb3dFbmRJbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IHRoaXMuX25Sb3dzVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiBhIHZlcnkgbGFyZ2Ugc2Nyb2xsIGRlbHRhLCBjYWxjdWxhdGUgd2hlcmUgdGhlIGJvdW5kYXJpZXMgc2hvdWxkIGJlICovXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hpZnREZWx0YSA9IHRoaXMuX25Sb3dzVG9TaGlmdCAtIHRoaXMuX25Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCAtPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMuX3lMb3dlckJvdW5kIC09IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ICs9IHRoaXMuX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggKz0gdGhpcy5fc2hpZnREZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IHRoaXMuX25Sb3dzVG9SZW5kZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5fblJvd3NUb1NoaWZ0OyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEluZGV4ID0gdGhpcy5fcm93RW5kSW5kZXggKyB0aGlzLl9pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBsb3dlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSBib3R0b20gb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSB0aGlzLl9yb3dzW3RoaXMuX3Jvd3NPcmRlcmVkQnlZWzBdXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLl9kcmFnVGltZXIgPyBudWxsIDogdGhpcy5wcm9wcy5nZXRSb3codGhpcy5fdGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnNldEluZGV4ID0gdGhpcy5fdGFyZ2V0SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIueSA9IHRoaXMuX3RhcmdldEluZGV4ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLmFjdGl2ZSA9IHRoaXMuX3RhcmdldEluZGV4ID09PSB0aGlzLl9hY3RpdmVSb3c7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkucHVzaCh0aGlzLl9yb3dzT3JkZXJlZEJ5WS5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ICs9IHRoaXMuX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCArPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCAtPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgLT0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yb3dTdGFydEluZGV4ID09PSAwIHx8IHRoaXMuX25leHRZIDw9IHRoaXMuX3lVcHBlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgaGlnaGVzdCBZIHZhbHVlIHRvIHRoZSB5VXBwZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgcHJldmlvdXMgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMuX25leHRZIC0gdGhpcy5feVVwcGVyQm91bmQpIC8gdGhpcy5fY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jvd1N0YXJ0SW5kZXggLSB0aGlzLl9uUm93c1RvU2hpZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSB0aGlzLl9yb3dTdGFydEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiB0aGlzLl9uUm93c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogYSB2ZXJ5IGxhcmdlIHNjcm9sbCBkZWx0YSwgY2FsY3VsYXRlIHdoZXJlIHRoZSBib3VuZGFyaWVzIHNob3VsZCBiZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSB0aGlzLl9uUm93c1RvU2hpZnQgLSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgKz0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCArPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCAtPSB0aGlzLl9zaGlmdERlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4IC09IHRoaXMuX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gdGhpcy5fcm93c09yZGVyZWRCeVkubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuX25Sb3dzVG9TaGlmdDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IHRoaXMuX3Jvd1N0YXJ0SW5kZXggLSB0aGlzLl9pdGVyYXRvciAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IHRoaXMuX3Jvd3NbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WVt0aGlzLl9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5kYXRhID0gdGhpcy5fZHJhZ1RpbWVyID8gbnVsbCA6IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnkgPSB0aGlzLl90YXJnZXRJbmRleCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5hY3RpdmUgPSB0aGlzLl90YXJnZXRJbmRleCA9PT0gdGhpcy5fYWN0aXZlUm93O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnVuc2hpZnQodGhpcy5fcm93c09yZGVyZWRCeVkucG9wKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4IC09IHRoaXMuX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kICs9IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCArPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3RvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWCA9IHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWSA9IHRoaXMuX3RvdWNoLnBhZ2VZO1xuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIHdlIGhhbmRsZSB0b3VjaG1vdmUgYnkgZGV0ZWN0aW5nIHRoZSBkZWx0YSBvZiBwYWdlWC9ZIGFuZCBmb3J3YXJkaW5nXG4gICAgICAgIGl0IHRvIGhhbmRsZU1vdmVJbnRlbnQoKSAqL1xuXG4gICAgICAgIHRoaXMuX3RvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuXG4gICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSB0aGlzLl9sYXN0VG91Y2hQYWdlWCAtIHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gdGhpcy5fbGFzdFRvdWNoUGFnZVkgLSB0aGlzLl90b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWCA9IHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWSA9IHRoaXMuX3RvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZU1vdmVJbnRlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoKGV2ZW50LmRlbHRhWCA9PT0gMCAmJiBldmVudC5kZWx0YVkgPT09IDApXG4gICAgICAgICAgICB8fCB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgJiYgZXZlbnQuZGVsdGFZID09PSAwXG4gICAgICAgICAgICB8fCB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtaW5pbXVtIHRyYW5zbGF0aW9uIHNob3VsZCBiZSBvbmUgcm93IGhlaWdodFxuICAgICAgICB0aGlzLl9kZWx0YVggPSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgLy8gZGVsdGFNb2RlIDAgPT09IHBpeGVscywgMSA9PT0gbGluZXNcbiAgICAgICAgdGhpcy5fZGVsdGFZID0gZXZlbnQuZGVsdGFNb2RlID09PSAxID8gcGFyc2VJbnQoZXZlbnQuZGVsdGFZLCAxMCkgKiB0aGlzLl9jZWxsX2ggOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID8gMCA6IHRoaXMuX3ggLSB0aGlzLl9kZWx0YVg7XG5cbiAgICAgICAgaWYgKHRoaXMuX25leHRYID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dFggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25leHRYIDwgdGhpcy5feE1heGltdW0pIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5feE1heGltdW07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uZXh0WSA9IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCA/IDAgOiB0aGlzLl95IC0gdGhpcy5fZGVsdGFZO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25leHRZIDwgdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsRG93bigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZXh0WSA+IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbFVwKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0WSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0WSA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25leHRZIDwgdGhpcy5feUxvd2VyQm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0WSA9IHRoaXMuX3lMb3dlckJvdW5kO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbmV4dFggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAgIChNYXRoLmFicyh0aGlzLl9uZXh0WCkgLyAodGhpcy5fcm93X3cgLSB0aGlzLl9jb250YWluZXJfdykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAodGhpcy5feFNjcm9sbFRyYWNrX3cgLSB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uICsgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPiB0aGlzLl94U2Nyb2xsVHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSB0aGlzLl94U2Nyb2xsVHJhY2tfdyAtIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubmV4dFkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAgIChNYXRoLmFicyh0aGlzLl9uZXh0WSkgLyAoKHRoaXMucHJvcHMudG90YWxSb3dzICogdGhpcy5fY2VsbF9oKSAtIHRoaXMuX2NvbnRhaW5lcl9oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICh0aGlzLl95U2Nyb2xsVHJhY2tfaCAtIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gKyB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA+IHRoaXMuX3lTY3JvbGxUcmFja19oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IHRoaXMuX3lTY3JvbGxUcmFja19oIC0gdGhpcy5feVNjcm9sbEhhbmRsZVNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMoKTsgLy8gRG8gYWxsIHRyYW5zZm9ybXMgZ3JvdXBlZCB0b2dldGhlclxuXG4gICAgICAgICAgICB0aGlzLl94ID0gdGhpcy5fbmV4dFg7XG4gICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fbmV4dFk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBlcmZvcm1UcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlcl9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QodGhpcy5fbmV4dFgpO1xuICAgICAgICB0aGlzLl9ib2R5X3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh0aGlzLl9uZXh0WCwgdGhpcy5fbmV4dFkpO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24pO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24pO1xuICAgIH1cblxuICAgIGhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteC1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSBldmVudC5sYXllclggLSB0aGlzLl9sYXN0WFNjcm9sbDtcbiAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2ZhdXhFdmVudCk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFhTY3JvbGwgPSBldmVudC5sYXllclg7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgIT09ICd1aS10YWJsZS15LXNjcm9sbC10cmFjaycpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IDA7XG4gICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVkgPSAoKGV2ZW50LmxheWVyWSAtIHRoaXMuX2xhc3RZU2Nyb2xsKSAvIHRoaXMuX2NvbnRhaW5lcl9oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2ZhdXhFdmVudCk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5sYXllclk7XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2xlZnRCdXR0b25QcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFhTY3JvbGwgPSBldmVudC5jbGllbnRYO1xuICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2xlZnRCdXR0b25QcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWZ0QnV0dG9uUHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5fZHJhZ1RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fZHJhZ1RpbWVyKTsgfVxuXG4gICAgICAgIHRoaXMuX2RyYWdUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdUaW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdy5kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5kYXRhID0gdGhpcy5wcm9wcy5nZXRSb3cocm93LnNldEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcy5wcm9wcy50aHJvdHRsZUludGVydmFsKTtcblxuICAgICAgICBpZiAodGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZKSB7XG4gICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVkgPSAoKGV2ZW50LmNsaWVudFkgLSB0aGlzLl9sYXN0WVNjcm9sbCkgLyB0aGlzLl9jb250YWluZXJfaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHRoaXMucHJvcHMudG90YWxSb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0WVNjcm9sbCA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYW51YWxseVNjcm9sbGluZ1gpIHtcblxuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IGV2ZW50LmNsaWVudFggLSB0aGlzLl9sYXN0WFNjcm9sbDtcbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdFhTY3JvbGwgPSBldmVudC5jbGllbnRYO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbikge1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbHVtblJlc2l6ZShldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdENvbHVtblgpO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW5kKCkge1xuICAgICAgICB0aGlzLl9sZWZ0QnV0dG9uUHJlc3NlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5fbGVmdEJ1dHRvblByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG5cbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSBmaW5kV2hlcmUodGhpcy5fY29sdW1ucywgJ21hcHBpbmcnLCBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHdpZHRoKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaChyb3cgPT4gcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHdpZHRoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbHVtbnMuaW5kZXhPZih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uKTtcbiAgICAgICAgbGV0IGFkanVzdGVkRGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWREZWx0YSA8IDBcbiAgICAgICAgICAgICYmICFpc05hTih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1pbldpZHRoKVxuICAgICAgICAgICAgJiYgdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPCB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWluV2lkdGggLSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGggKyBhZGp1c3RlZERlbHRhID4gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWF4V2lkdGggLSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoICsgYWRqdXN0ZWREZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWREZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSBhZGp1c3RlZERlbHRhO1xuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uQXV0b0V4cGFuZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZpbmRXaGVyZSh0aGlzLl9jb2x1bW5zLCAnbWFwcGluZycsIG1hcHBpbmcpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLl9jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEocm93LmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSAmJiByb3cuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdLnRydWVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoIDwgY2VsbFdpZHRoID8gY2VsbFdpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8qIGZpbmQgdGhlIHJlbmRlcmVkIHJvdyB3aXRoIHRoZSBsb25nZXN0IGNvbnRlbnQgZW50cnkgKi9cblxuICAgICAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRLZXlGcm9tS2V5Q29kZShjb2RlKSB7XG4gICAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd0Rvd24nO1xuXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93VXAnO1xuXG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICByZXR1cm4gJ0VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldEFyaWFUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFyaWEuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVSb3coc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlUm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaChyb3cgPT4gcm93LmFjdGl2ZSA9IHJvdy5zZXRJbmRleCA9PT0gc2V0SW5kZXgpO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdzZXRJbmRleCcsIHRoaXMuX2FjdGl2ZVJvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5fbmV4dEFjdGl2ZVJvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3codGhpcy5fbmV4dEFjdGl2ZVJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuX25leHRBY3RpdmVSb3cuZGF0YVt0aGlzLl9jb2x1bW5zWzBdLm1hcHBpbmddKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5fbmV4dEFjdGl2ZVJvdy55ICogLTEgPiB0aGlzLl95KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLl9uZXh0QWN0aXZlUm93LnkgKiAtMSAtIHRoaXMuX2NlbGxfaCA8IHRoaXMuX3kgLSB0aGlzLl9jb250YWluZXJfaCArIHRoaXMuX2NlbGxfaCkgLy8gMSB1bml0IG9mIGNlbGxIZWlnaHQgaXMgcmVtb3ZlZCB0byBjb21wZW5zYXRlIGZvciB0aGUgaGVhZGVyIHJvd1xuICAgICAgICAgICAgKSB7IC8vIERlc3RpbmF0aW9uIHJvdyBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgc28gc2ltdWxhdGUgYSBzY3JvbGxcbiAgICAgICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gdGhpcy5fY2VsbF9oICogZGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPT09IC0xICYmIHRoaXMuX2FjdGl2ZVJvdyA+IDApXG4gICAgICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuX2FjdGl2ZVJvdyA8IHRoaXMucHJvcHMudG90YWxSb3dzKSkge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBUaGUgZGVzdGluYXRpb24gcm93IGlzbid0IHJlbmRlcmVkLCBzbyB3ZSBuZWVkIHRvIHRyYW5zbGF0ZSBlbm91Z2ggcm93cyBmb3IgaXQgdG8gZmVhc2libHkgYmUgc2hvd25cbiAgICAgICAgICAgICAgICBpbiB0aGUgdmlld3BvcnQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9ICggICAoICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPiB0aGlzLl9hY3RpdmVSb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX2FjdGl2ZVJvdyAtIHRoaXMuX3Jvd1N0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCAgICB0aGlzLl9yb3dTdGFydEluZGV4IDwgdGhpcy5fYWN0aXZlUm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9hY3RpdmVSb3cgLSB0aGlzLl9yb3dTdGFydEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZGVsdGEpICogdGhpcy5fY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuY2hhbmdlQWN0aXZlUm93KGRlbHRhKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleSB8fCB0aGlzLmdldEtleUZyb21LZXlDb2RlKGV2ZW50LmtleUNvZGUpO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlUm93ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLl9yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLl9hY3RpdmVSb3cpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuX2NvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvd1tjb2x1bW4ubWFwcGluZ119YDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKHRhcmdldCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRhcmdldDtcbiAgICAgICAgY29uc3Qgbm9kZU1hcCA9IHt9O1xuXG4gICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtyb3c6IG5vZGV9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCghbm9kZU1hcC5jZWxsIHx8ICFub2RlTWFwLnJvdykgJiYgbm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKGNlbGxDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAuY2VsbCA9IG5vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5yb3cgPSBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVNYXA7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5fcm93cywgJ25vZGUnLCBtYXAucm93KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3cocm93LnNldEluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG1hcC5jZWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdChldmVudCwgcm93LnNldEluZGV4LCBtYXAuY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QoZXZlbnQsIHJvdy5zZXRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3VpLXRhYmxlLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICBkYXRhLXNldC1pZGVudGlmaWVyPXt0aGlzLnByb3BzLmlkZW50aWZpZXJ9XG4gICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0ndGFibGUnIGNsYXNzTmFtZT0ndWktdGFibGUnPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0naGVhZGVyJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcicgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlLnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIG1hcHBpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICByZXNpemFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGdldFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGhyb3R0bGVJbnRlcnZhbDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB0b3RhbFJvd3M6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5VSVRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIGNvbHVtbnM6IFtdLFxuICAgIGdldFJvdzogbm9vcCxcbiAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgb25DZWxsSW50ZXJhY3Q6IG5vb3AsXG4gICAgb25Sb3dJbnRlcmFjdDogbm9vcCxcbiAgICB0aHJvdHRsZUludGVydmFsOiAzMDAsXG4gICAgdG90YWxSb3dzOiAwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZTtcbiJdfQ==