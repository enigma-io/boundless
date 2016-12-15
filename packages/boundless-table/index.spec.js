import T, {
    HEADER_CELL,
    HEADER_CELL_HANDLE,
    CELL,
    CELL_EVEN,
    CELL_ODD,
    ROW,
    ROW_EVEN,
    ROW_ODD,
    ROW_ACTIVE,
} from './index';

import sinon from 'sinon';
import {noop, times} from 'lodash';

// make it synchronous for testing
window.requestAnimationFrame = (callback) => callback();

// stubbing this so it doesn't blow up in JSDOM
document.execCommand = document.execCommand || noop;

describe('Table', () => {
    const sandbox = sinon.sandbox.create();

    const rows = require('./__fixtures__/fixture-rows.json');
    const columns = require('./__fixtures__/fixture-columns.json');

    columns[0].cellChangeFunc = sandbox.stub();

    // index 3 is for the `.b-table-row-loading` css hook test
    const getRow = (index) => index === 3 ? new Promise(noop) : rows[index];

    document.body.innerHTML = `
        <div class="b-table-wrapper" tabindex="0">
            <div class="b-table-header"></div>
            <div class="b-table-body"></div>
            <div class="b-table-x-scroll-track">
                <div class="b-table-x-scroll-handle"></div>
            </div>
            <div class="b-table-y-scroll-track">
                <div class="b-table-y-scroll-handle"></div>
            </div>
            <div class="b-offscreen" aria-live="polite" />
        </div>
    `;

    const base = {
        rowChangeFunc: sandbox.stub(),
        getRow: getRow,
        columns: columns,
        totalRows: rows.length,

        wrapper: document.querySelector('.b-table-wrapper'),
        header: document.querySelector('.b-table-header'),
        body: document.querySelector('.b-table-body'),
        aria: document.querySelector('.b-offscreen'),
        'x-scroll-track': document.querySelector('.b-table-x-scroll-track'),
        'y-scroll-track': document.querySelector('.b-table-y-scroll-track'),
        'x-scroll-handle': document.querySelector('.b-table-x-scroll-handle'),
        'y-scroll-handle': document.querySelector('.b-table-y-scroll-handle'),
    };

    const create = (modification) => (new T({...base, ...modification}));
    let t;

    afterEach(() => sandbox.restore());

    it('throws if wrapper is not a DOM node', () => {
        expect(() => create({wrapper: null})).toThrow();
    });

    it('throws if header is not a DOM node', () => {
        expect(() => create({header: null})).toThrow();
    });

    it('throws if body is not a DOM node', () => {
        expect(() => create({body: null})).toThrow();
    });

    it('throws if x-scroll-track is not a DOM node', () => {
        expect(() => create({'x-scroll-track': null})).toThrow();
    });

    it('throws if y-scroll-track is not a DOM node', () => {
        expect(() => create({'y-scroll-track': null})).toThrow();
    });

    it('throws if x-scroll-handle is not a DOM node', () => {
        expect(() => create({'x-scroll-handle': null})).toThrow();
    });

    it('throws if y-scroll-handle is not a DOM node', () => {
        expect(() => create({'y-scroll-handle': null})).toThrow();
    });

    it('throws if aria is not a DOM node', () => {
        expect(() => create({aria: null})).toThrow();
    });

    it('throws if columns is not an array', () => {
        expect(() => create({columns: 'x'})).toThrow();
        expect(() => create({columns() {}})).toThrow();
        expect(() => create({columns: {}})).toThrow();
        expect(() => create({columns: 3})).toThrow();
        expect(() => create({columns: true})).toThrow();
    });

    it('throws if columns has no array items', () => {
        expect(() => create({columns: []})).toThrow();
    });

    it('throws if columns array items have an improper shape', () => {
        expect(() => create({columns: [{}]})).toThrow();
    });

    it('throws if throttleInterval is not a number', () => {
        expect(() => create({throttleInterval: 'x'})).toThrow();
        expect(() => create({throttleInterval() {}})).toThrow();
        expect(() => create({throttleInterval: {}})).toThrow();
        expect(() => create({throttleInterval: []})).toThrow();
        expect(() => create({throttleInterval: true})).toThrow();
    });

    it('defaults throttleInterval to 300ms', () => {
        t = new T({...base, throttleInterval: undefined});

        expect(t.c.throttleInterval).toEqual(300);
    });

    it('throws if totalRows is not a number', () => {
        expect(() => create({totalRows: 'x'})).toThrow();
        expect(() => create({totalRows() {}})).toThrow();
        expect(() => create({totalRows: {}})).toThrow();
        expect(() => create({totalRows: []})).toThrow();
        expect(() => create({totalRows: true})).toThrow();
    });

    it('defaults totalRows to zero', () => {
        t = new T({...base, totalRows: undefined});

        expect(t.c.totalRows).toEqual(0);
    });

    it('throws if getRow is not a function', () => {
        expect(() => create({getRow: 'x'})).toThrow();
        expect(() => create({getRow: {}})).toThrow();
        expect(() => create({getRow: []})).toThrow();
        expect(() => create({getRow: true})).toThrow();
        expect(() => create({getRow: 3})).toThrow();
    });

    it('throws if headerColumnClickFunc is not a function', () => {
        expect(() => create({headerColumnClickFunc: 'x'})).toThrow();
        expect(() => create({headerColumnClickFunc: {}})).toThrow();
        expect(() => create({headerColumnClickFunc: []})).toThrow();
        expect(() => create({headerColumnClickFunc: true})).toThrow();
        expect(() => create({headerColumnClickFunc: 3})).toThrow();
    });

    it('throws if rowChangeFunc is not a function', () => {
        expect(() => create({rowChangeFunc: 'x'})).toThrow();
        expect(() => create({rowChangeFunc: {}})).toThrow();
        expect(() => create({rowChangeFunc: []})).toThrow();
        expect(() => create({rowChangeFunc: true})).toThrow();
        expect(() => create({rowChangeFunc: 3})).toThrow();
    });

    it('throws if rowClickFunc is not a function', () => {
        expect(() => create({rowClickFunc: 'x'})).toThrow();
        expect(() => create({rowClickFunc: {}})).toThrow();
        expect(() => create({rowClickFunc: []})).toThrow();
        expect(() => create({rowClickFunc: true})).toThrow();
        expect(() => create({rowClickFunc: 3})).toThrow();
    });

    it('throws if cellChangeFunc is not a function', () => {
        expect(() => create({cellChangeFunc: 'x'})).toThrow();
        expect(() => create({cellChangeFunc: {}})).toThrow();
        expect(() => create({cellChangeFunc: []})).toThrow();
        expect(() => create({cellChangeFunc: true})).toThrow();
        expect(() => create({cellChangeFunc: 3})).toThrow();
    });

    it('throws if cellClickFunc is not a function', () => {
        expect(() => create({cellClickFunc: 'x'})).toThrow();
        expect(() => create({cellClickFunc: {}})).toThrow();
        expect(() => create({cellClickFunc: []})).toThrow();
        expect(() => create({cellClickFunc: true})).toThrow();
        expect(() => create({cellClickFunc: 3})).toThrow();
    });

    it('throws if columnResizeFunc is not a function', () => {
        expect(() => create({columnResizeFunc: 'x'})).toThrow();
        expect(() => create({columnResizeFunc: {}})).toThrow();
        expect(() => create({columnResizeFunc: []})).toThrow();
        expect(() => create({columnResizeFunc: true})).toThrow();
        expect(() => create({columnResizeFunc: 3})).toThrow();
    });

    it('throws if allowScrollPropagation is not a boolean', () => {
        expect(() => create({allowScrollPropagation: 'x'})).toThrow();
        expect(() => create({allowScrollPropagation: {}})).toThrow();
        expect(() => create({allowScrollPropagation: []})).toThrow();
        expect(() => create({allowScrollPropagation() {}})).toThrow();
        expect(() => create({allowScrollPropagation: 3})).toThrow();
    });

    it('throws if preserveScrollState is not a boolean', () => {
        expect(() => create({preserveScrollState: 'x'})).toThrow();
        expect(() => create({preserveScrollState: {}})).toThrow();
        expect(() => create({preserveScrollState: []})).toThrow();
        expect(() => create({preserveScrollState() {}})).toThrow();
        expect(() => create({preserveScrollState: 3})).toThrow();
    });

    it('hides the table body element if totalRows is set to zero', () => {
        create({totalRows: 0});
        expect(base.body.style.display).toBe('none');
    });

    it('unhides the table body element if totalRows changes from zero to a positive integer', () => {
        create({totalRows: 0});
        expect(base.body.style.display).toBe('none');

        create({totalRows: 1});
        expect(base.body.style.display).toBe('');
    });

    describe('click functionality', () => {
        it('makes a row active', () => {
            t = new T(base);

            expect(t.c.body.querySelector(`.${ROW_ACTIVE}`)).toBe(null);

            const row = t.c.body.querySelector(`.${ROW}`);
                  row.click();

            expect(row.classList.contains(ROW_ACTIVE)).toBe(true);

            const row2 = t.c.body.querySelector(`.${ROW}:nth-child(2)`);
                  row2.click();

            expect(row.classList.contains(ROW_ACTIVE)).toBe(false);
            expect(row2.classList.contains(ROW_ACTIVE)).toBe(true);
        });

        it('calls `headerColumnClickFunc` with the event and column mapping', () => {
            const stub = sandbox.stub();

            t = new T({...base, headerColumnClickFunc: stub});
            t.c.header.querySelector(`.${HEADER_CELL}`).click();

            expect(stub.calledWith(sinon.match.object, sinon.match.string)).toBe(true);
        });

        it('calls `rowClickFunc` with the event and row index', () => {
            const stub = sandbox.stub();

            t = new T({...base, rowClickFunc: stub});
            t.c.body.querySelector(`.${ROW}`).click();

            expect(stub.calledWith(sinon.match.object, 0)).toBe(true);
        });

        it('calls `cellClickFunc` with the event, row index and row field', () => {
            const stub = sandbox.stub();

            t = new T({...base, cellClickFunc: stub});
            t.c.body.querySelector(`.${CELL}`).click();

            expect(stub.calledWith(sinon.match.object, 0, columns[0].mapping)).toBe(true);
        });
    });

    describe('keyboard events', () => {
        beforeEach(() => (t = new T({...base, rowClickFunc: jest.fn()})));

        describe('ArrowDown', () => {
            it('increments the active row', () => {
                expect(t.c.body.querySelector(`.${ROW_ACTIVE}`)).toBe(null);

                t._handleKeyDown({
                    key: 'ArrowDown',
                    preventDefault: noop,
                });

                expect(t.c.body.querySelector(`.${ROW_ACTIVE}`)).not.toBe(null);
                expect(t.c.body.querySelector(`.${ROW_ACTIVE} .${CELL}`).textContent).toBe('Louise');
            });

            it('jumps to the topmost visible row in the viewport if the table has been scrolled and there is no current active row', () => {
                base.wrapper.setAttribute('style', 'height: 150px');

                t = new T(base);

                t._handleMoveIntent({
                    deltaX: 0,
                    deltaY: 10000,
                    preventDefault: noop,
                });

                t._handleKeyDown({
                    key: 'ArrowDown',
                    preventDefault: noop,
                });

                expect(
                    t.rows[t.rowsOrderedByY[t.nPaddingRows]].active).toBe(true);
            });
        });

        it('ArrowUp decrements the active row', () => {
            expect(t.c.body.querySelector(`.${ROW_ACTIVE}`)).toBe(null);

            t._handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop,
            });

            t._handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE} .${CELL}`).textContent).toBe('Dennis');

            t._handleKeyDown({
                key: 'ArrowUp',
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE} .${CELL}`).textContent).toBe('Louise');
        });

        it('Escape clears the active row', () => {
            t._handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE}`)).not.toBe(null);

            t._handleKeyDown({
                key: 'Escape',
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE}`)).toBe(null);
        });

        it('Ctrl/CMD + C copies the active row and column headers to the clipboard', () => {
            sandbox.stub(document, 'execCommand');

            t._handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE} .${CELL}`).textContent).toBe('Louise');

            t._handleKeyDown({
                ctrlKey: true,
                key: 'c',
                preventDefault: noop,
            });

            expect(document.execCommand.calledOnce);
            expect(t.copyNode.value).toContain(columns[0].title);
            expect(t.copyNode.value).toContain(rows[0].first_name);

            t._handleKeyDown({
                metaKey: true,
                key: 'c',
                preventDefault: noop,
            });

            expect(document.execCommand.calledTwice);
        });
    });

    describe('for screen readers', () => {
        beforeEach(() => (t = new T(base)));

        it('speaks the first column content aloud on arrow down', () => {
            t._handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop,
            });

            expect(t.c.aria.innerText).toBe('Louise');
        });

        it('speaks the whole row content aloud on enter', () => {
            times(9, () => {
                t._handleKeyDown({
                    key: 'ArrowDown',
                    preventDefault: noop,
                });
            });

            t._handleKeyDown({
                key: 'Enter',
                preventDefault: noop,
            });

            const row = getRow(8); // index starts at -1 for "active" row

            columns.forEach(({title, mapping}) => {
                expect(t.c.aria.innerText).toContain(`${title}: ${row[mapping]}`);
            });
        });
    });

    describe('rows', () => {
        it('row.active returns `true` if the row is selected', () => {
            t = new T(base);

            expect(t.getActiveRowIndex()).toBeUndefined();

            t._changeActiveRow(1);
            expect(t.rows[0].active).toBe(true);
        });

        it('are labeled by their index', () => {
            t = new T(base);

            expect(t.rows[0].node.getAttribute('data-index')).toBe('0');
            expect(t.rows[1].node.getAttribute('data-index')).toBe('1');
        });

        it('retains their active status through a regeneration', () => {
            t = new T(base);

            expect(t.getActiveRowIndex()).toBeUndefined();

            t._changeActiveRow(1);
            expect(t.getActiveRowIndex()).toEqual(0);

            t.regenerate();
            expect(t.getActiveRowIndex()).toEqual(0);
        });

        it('lose their active status through a regeneration if the new row count is less than the previous active index', () => {
            t = new T(base);

            expect(t.getActiveRowIndex()).toBeUndefined();

            t._changeActiveRow(3);
            expect(t.getActiveRowIndex()).toEqual(2);

            t.regenerate({...base, totalRows: 1});
            expect(t.getActiveRowIndex()).toBeUndefined();
        });

        it('are tagged with .b-table-row-(even|odd) based on index', () => {
            t = new T(base);

            expect(t.rows[0].node.classList.contains(ROW_EVEN)).toBe(true);
            expect(t.rows[1].node.classList.contains(ROW_ODD)).toBe(true);
            expect(t.rows[2].node.classList.contains(ROW_EVEN)).toBe(true);
        });

        it('call rowChangeFunc if provided when the data is set', () => {
            t = new T(base);

            expect(base.rowChangeFunc.calledWithMatch(t.rows[0].node, getRow(0))).toBe(true);
        });
    });

    describe('row cells (row data in object form)', () => {
        it('cell.content retrieves the text of the cell', () => {
            t = new T(base);

            expect(t.rows[0].cells[0].content).toBe(rows[0][columns[0].mapping]);
        });

        it('does not render a literal `null` value as text', () => {
            t = new T({
                ...base,
                getRow: (index) => {
                    const keys = Object.keys(rows[index]);
                    const nulledObject = {};

                    keys.forEach((key) => (nulledObject[key] = null));

                    return nulledObject;
                },
            });

            expect(t.rows[0].cells[0].node.textContent).toBe('');
        });

        it('cell.content = `string` updates the cell text', () => {
            t = new T(base);

            expect(t.rows[0].cells[0].content).not.toBe('abc');

            t.rows[0].cells[0].content = 'abc';
            expect(t.rows[0].cells[0].content).toBe('abc');
        });


        it('cell.content = `string` triggers cellChangeFunc if provided', () => {
            t = new T(base);

            t.rows[0].cells[0].content = 'abc';
            expect(columns[0].cellChangeFunc.calledWithMatch(t.rows[0].cells[0].node, 'abc')).toBe(true);
        });

        it('cell.width retrieves the calculated width', () => {
            t = new T(base);

            expect(t.rows[0].cells[0].width).toEqual(jasmine.any(Number));
        });

        it('cell.width = `number` updates the cell width', () => {
            t = new T(base);

            expect(t.rows[0].cells[0].width).not.toBe(400);

            t.rows[0].cells[0].width = 400;
            expect(t.rows[0].cells[0].width).toBe(400);
        });

        it('are tagged with their respective column via [data-column]', () => {
            t = new T(base);

            expect(t.rows[0].cells[0].node.getAttribute('data-column')).toBe('first_name');
        });

        it('are tagged with .b-table-cell-(even|odd) based on index', () => {
            t = new T(base);

            expect(t.rows[0].cells[0].node.className).toContain(CELL_EVEN);
            expect(t.rows[0].cells[1].node.className).toContain(CELL_ODD);
            expect(t.rows[0].cells[2].node.className).toContain(CELL_EVEN);
        });
    });

    describe('row cells (row data in array form)', () => {
        const arrayStyleRows = [
            [
                1,
                'Lana',
                'Fernandez',
                'Database Administrator I',
                '6-(697)972-8601',
                'lfernandez1@opera.com',
                '5049 Barnett Road',
                'Nglengkir',
                'Indonesia',
                'ID',
            ],
        ];

        const arrayStyleGetRow = (index) => arrayStyleRows[index];

        it('does not render a literal `null` value as text', () => {
            t = new T({
                ...base,
                getRow: (index) => arrayStyleRows[index].map(() => (null)),
                totalRows: arrayStyleRows.length,
            });

            expect(t.rows[0].cells[0].node.textContent).toBe('');
        });

        it('cell.content retrieves the text of the cell', () => {
            t = new T({...base, getRow: arrayStyleGetRow, totalRows: arrayStyleRows.length});

            expect(t.rows[0].cells[0].content).toBe(arrayStyleRows[0][0]);
        });

        it('cell.content = `string` updates the cell text', () => {
            t = new T({...base, getRow: arrayStyleGetRow, totalRows: arrayStyleRows.length});

            expect(t.rows[0].cells[0].content).not.toBe('abc');

            t.rows[0].cells[0].content = 'abc';
            expect(t.rows[0].cells[0].content).toBe('abc');
        });

        it('cell.width retrieves the calculated width', () => {
            t = new T({...base, getRow: arrayStyleGetRow, totalRows: arrayStyleRows.length});

            expect(t.rows[0].cells[0].width).toEqual(jasmine.any(Number));
        });

        it('cell.width = `number` updates the cell width', () => {
            t = new T({...base, getRow: arrayStyleGetRow, totalRows: arrayStyleRows.length});

            expect(t.rows[0].cells[0].width).not.toBe(400);

            t.rows[0].cells[0].width = 400;
            expect(t.rows[0].cells[0].width).toBe(400);
        });

        it('are tagged with their respective column via [data-column]', () => {
            t = new T({...base, getRow: arrayStyleGetRow, totalRows: arrayStyleRows.length});

            expect(t.rows[0].cells[0].node.getAttribute('data-column')).toBe('first_name');
        });

        it('are tagged with .b-table-cell-(even|odd) based on index', () => {
            t = new T({...base, getRow: arrayStyleGetRow, totalRows: arrayStyleRows.length});

            expect(t.rows[0].cells[0].node.className).toContain(CELL_EVEN);
            expect(t.rows[0].cells[1].node.className).toContain(CELL_ODD);
            expect(t.rows[0].cells[2].node.className).toContain(CELL_EVEN);
        });
    });

    describe('row rotation', () => {
        afterEach(() => base.wrapper.setAttribute('style', ''));

        it('occurs when scrolled down', () => {
            base.wrapper.setAttribute('style', 'height: 150px');

            t = new T(base);

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).toBe('Louise');

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).not.toBe('Louise');
        });

        it('preserves the active row', () => {
            base.wrapper.setAttribute('style', 'height: 150px');

            t = new T(base);

            t._handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE} .${CELL}`).textContent).toBe('Louise');

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 10000,
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE}`)).toBe(null);

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: -10000,
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW_ACTIVE} .${CELL}`).textContent).toBe('Louise');
        });

        it('occurs when scrolled up', () => {
            base.wrapper.setAttribute('style', 'height: 150px');

            t = new T(base);

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).toBe('Louise');

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).not.toBe('Louise');

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: -200,
                preventDefault: noop,
            });

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).toBe('Louise');
        });

        it('occurs on left-click drag of the y scroll nub', () => {
            sandbox.useFakeTimers();

            base.wrapper.setAttribute('style', 'height: 150px');

            t = new T(base);

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).toBe('Louise');

            // simulate drag cascade
            t._handleYScrollHandleDragStart({button: 0, pageY: 0, offsetY: 0, preventDefault: noop});
            t._handleDragMove({pageY: 200});
            t._handleDragEnd();

            sandbox.clock.tick(301);

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).not.toBe('Louise');
        });

        it('does not occur on left-click drag of the y scroll nub before the throttle interval is reached', () => {
            sandbox.useFakeTimers();

            base.wrapper.setAttribute('style', 'height: 150px');

            t = new T(base);

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).toBe('Louise');

            // simulate drag cascade
            t._handleYScrollHandleDragStart({button: 0, pageY: 0, offsetY: 0, preventDefault: noop});
            t._handleDragMove({pageY: 200});
            t._handleDragEnd();

            sandbox.clock.tick(100);

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).toBe('');

            sandbox.clock.tick(301);

            expect(t.c.body.querySelector(`.${ROW} .${CELL}`).textContent).not.toBe('Louise');
        });
    });

    describe('scroll event handling', () => {
        it('scrolls literal amounts of pixels for deltaMode 0 (pixel mode)', () => {
            t = new T(base);

            sandbox.stub(t, '_translateBody');

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 5,
                deltaMode: 0,
                preventDefault: noop,
            });

            expect(t._translateBody.calledWithMatch(0, -5)).toBe(true);
        });

        it('scrolls n * cellheight pixels at a time for deltaMode 1 (line mode)', () => {
            t = new T(base);

            sandbox.stub(t, '_translateBody');

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 1,
                deltaMode: 1,
                preventDefault: noop,
            });

            expect(t._translateBody.calledWithMatch(0, -40)).toBe(true);
        });
    });

    describe('x-axis scroll track', () => {
        it('hides itself if the calculated handle size is equal to the container width', () => {
            t = new T(base);

            t.xMaximum = 0;

            t._initializeScrollBars();

            expect(t.c['x-scroll-track'].style.display).toBe('none');
        });
    });

    describe('x-axis scroll handle', () => {
        it('calculates width correctly', () => {
            t = new T(base);

            const x = t.c['x-scroll-handle'];

            // rendering 4 rows, 500px container width, all the columns fit inside, so it are max width
            // it's hardcoded to 500px width in the component as a fallback since JSDOM doesn't have a layout engine
            expect(x.style.width).toBe('500px');
        });

        it('defaults to 12px width if would become too small', () => {
            t = new T(base);

            expect(t._calculateXScrollHandleSize()).not.toBe(12);

            t.rowWidth = 500;
            t.xScrollTrackWidth = 1;

            expect(t._calculateXScrollHandleSize()).toBe(12);
        });

        it('does not translate beyond the bounds of the x-axis scroll track', () => {
            t = new T(base);

            const x = t.c['x-scroll-handle'];
            const width = window.getComputedStyle(t.c.wrapper).width || 500;

            sandbox.stub(t, '_translateXScrollHandle');

            t._handleMoveIntent({
                deltaX: 10000,
                deltaY: 0,
                preventDefault: noop,
            });

            expect(t._translateXScrollHandle.calledWithMatch(
                parseInt(width, 10) - parseInt(x.style.width, 10)
            )).toBe(true);
        });
    });

    describe('y-axis scroll track', () => {
        it('hides itself if the calculated handle size is equal to the container height', () => {
            t = new T({...base, totalRows: 1});

            expect(t.c['y-scroll-track'].style.display).toBe('none');
        });
    });

    describe('y-axis scroll handle', () => {
        it('calculates height correctly', () => {
            t = new T(base);

            const y = t.c['y-scroll-handle'];
            const expectedHeight = t.containerHeight * (t.nRowsVisible / t.c.totalRows);

            expect(y.style.height).toBe(expectedHeight + 'px');
        });

        it('defaults to 12px height if would become too small', () => {
            t = new T(base);

            expect(t._calculateYScrollHandleSize()).not.toBe(12);

            t.nRowsVisible = 0;

            expect(t._calculateYScrollHandleSize()).toBe(12);
        });

        it('does not translate beyond the bounds of the y-axis scroll track', () => {
            t = new T(base);

            sandbox.stub(t, '_translateYScrollHandle');

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 10000,
                preventDefault: noop,
            });

            expect(t._translateYScrollHandle.calledWithMatch(
                t.containerHeight - t.yScrollHandleSize
            )).toBe(true);
        });
    });

    describe('column cells', () => {
        it('accepts injection of custom content', () => {
            const stub = sandbox.stub();
            const revisedBase = {
                ...base,
                columns: [
                    {
                        ...base.columns[0],
                        children: [{
                            tag: 'span',
                            className: 'asdf',
                            onclick: stub,
                            children: [{
                                tag: 'div',
                                className: 'asdf-child',
                                children: 'bar',
                            }],
                        }],
                    },
                    ...base.columns.slice(1),
                ],
            };

            t = new T(revisedBase);

            const childNode = document.body.querySelector(`.${HEADER_CELL} .asdf`);

            expect(childNode).not.toBeNull();
            expect(childNode.querySelector('.asdf-child')).not.toBeNull();
            expect(childNode.querySelector('.asdf-child').textContent).toBe('bar');

            childNode.click();
            expect(stub.calledOnce).toBe(true);
        });

        it('column.title retrieves the title property of the column', () => {
            t = new T(base);

            expect(t.columns[0].title).toBe(t.c.columns[0].title);
        });

        it('column.title = `string` updates the text', () => {
            t = new T(base);

            expect(t.columns[0].title).not.toBe('abc');

            t.columns[0].title = 'abc';
            expect(t.columns[0].title).toBe('abc');
        });

        it('are tagged with .b-table-cell-(even|odd) based on index', () => {
            t = new T(base);

            expect(t.columns[0].node.classList.contains(CELL_EVEN)).toBe(true);
            expect(t.columns[1].node.classList.contains(CELL_ODD)).toBe(true);
            expect(t.columns[2].node.classList.contains(CELL_EVEN)).toBe(true);
        });
    });

    describe('column resizing', () => {
        it('adjusts the width of the appropriate column', () => {
            t = new T(base);

            const cell = t.c.header.querySelector(`.${HEADER_CELL}`);
            const previousWidth = 40;
            const delta = 20;
            const resizer = cell.querySelector(`.${HEADER_CELL_HANDLE}`);

            sandbox.stub(t, '_applyNewColumnWidth');

            t._handleColumnDragStart({
                button: 0, // left mouse button
                target: resizer,
                pageX: previousWidth,
                preventDefault: noop,
            });

            t._handleColumnResize(delta);

            expect(t._applyNewColumnWidth.calledWithMatch(0, previousWidth + delta));
        });

        it('should call columnResizeFunc (if provided) with the new width', () => {
            t = new T({...base, columnResizeFunc: sandbox.stub()});

            const cell = t.c.header.querySelector(`.${HEADER_CELL}`);
            const previousWidth = 40;
            const delta = 20;
            const resizer = cell.querySelector(`.${HEADER_CELL_HANDLE}`);

            t._handleColumnDragStart({
                button: 0, // left mouse button
                target: resizer,
                pageX: previousWidth,
                preventDefault: noop,
            });

            t._handleColumnResize(delta);

            expect(t.c.columnResizeFunc.calledWithMatch(columns[0].mapping, previousWidth + delta));
        });
    });

    describe('window resize', () => {
        it('rebuilds the table if the new container height differs from the previous cached height', () => {
            t = new T(base);

            sandbox.stub(t, 'regenerate');

            t._containerHeight -= 1;

            t._handleWindowResize();
            expect(t.regenerate.calledOnce).toBe(true);

        });

        // most of these need a layout engine to verify, so they're pretty dumb just to see if the function is called

        it('causes a recompute of the container dimensions', () => {
            t = new T(base);

            sandbox.stub(t, '_calculateContainerDimensions');

            t._handleWindowResize();
            expect(t._calculateContainerDimensions.calledOnce).toBe(true);

        });

        it('causes a recompute of the column widths and will scale up the columns to fill the space if appropriate', () => {
            t = new T(base);

            sandbox.stub(t, '_calculateColumnWidths');

            t._handleWindowResize();
            expect(t._calculateColumnWidths.calledOnce).toBe(true);
        });

        it('causes a recompute of the scrollbars if the wrapper width changed', () => {
            t = new T(base);

            sandbox.stub(t, '_initializeScrollBars');

            t._handleWindowResize();
            expect(t._initializeScrollBars.calledOnce).toBe(true);

        });
    });

    describe('automatic column scaling', () => {
        it('tries to fill the available container space on first render', () => {
            t = new T({
                ...base,
                columns: columns.slice(0, 3).map((column) => ({...column, width: 100})),
            });

            // default fallback is 500 overall width

            expect(t.columns[0].width).toBe(166);
            expect(t.columns[1].width).toBe(166);
            expect(t.columns[2].width).toBe(168); // the remainder is given to the last column
        });

        it('should call columnResizeFunc with the updated values', () => {
            t = new T({
                ...base,
                columns: columns.slice(0, 3).map((column) => ({...column, width: 100})),
                columnResizeFunc: sandbox.stub(),
            });

            // default fallback is 500 overall width

            expect(t.columns[0].width).toBe(166);
            expect(t.columns[1].width).toBe(166);
            expect(t.columns[2].width).toBe(168); // the remainder is given to the last column

            expect(t.c.columnResizeFunc.calledWithMatch(columns[0].mapping, 166)).toBe(true);
            expect(t.c.columnResizeFunc.calledWithMatch(columns[1].mapping, 166)).toBe(true);
            expect(t.c.columnResizeFunc.calledWithMatch(columns[2].mapping, 168)).toBe(true);
        });
    });

    describe('allowScrollPropagation', () => {
        it('defaults to `false`', () => {
            t = new T({...base});
            expect(t.c.allowScrollPropagation).toBe(false);
        });

        it('will not cancel wheel events when `true`', () => {
            const stub = sandbox.stub();

            t = new T({...base, allowScrollPropagation: true});

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 100,
                preventDefault: stub,
            });

            expect(stub.called).toBe(false);
        });

        it('will cancel wheel events when `false`', () => {
            const stub = sandbox.stub();

            t = new T({...base, allowScrollPropagation: false});

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 100,
                preventDefault: stub,
            });

            expect(stub.called).toBe(true);
        });
    });

    describe('fitColumnsToTable', () => {
        it('shrinks columns to fit the available container space', () => {
            t = new T({
                ...base,
                columns: columns.slice(0, 3).map((column) => ({...column, width: 999})),
                fitColumnsToTable: true,
            });

            // default fallback is 500 overall width

            expect(t.columns[0].width).toBe(167);
            expect(t.columns[1].width).toBe(167);
            expect(t.columns[2].width).toBe(166); // the remainder is given to the last column
        });

        it('should call columnResizeFunc with the updated values', () => {
            t = new T({
                ...base,
                columns: columns.slice(0, 3).map((column) => ({...column, width: 999})),
                columnResizeFunc: sandbox.stub(),
                fitColumnsToTable: true,
            });

            // default fallback is 500 overall width

            expect(t.columns[0].width).toBe(167);
            expect(t.columns[1].width).toBe(167);
            expect(t.columns[2].width).toBe(166); // the remainder is given to the last column

            expect(t.c.columnResizeFunc.calledWithMatch(columns[0].mapping, 167)).toBe(true);
            expect(t.c.columnResizeFunc.calledWithMatch(columns[1].mapping, 167)).toBe(true);
            expect(t.c.columnResizeFunc.calledWithMatch(columns[2].mapping, 166)).toBe(true);
        });
    });

    describe('preserveScrollState', () => {
        it('reapplies scroll values after regeneration', () => {
            base.wrapper.setAttribute('style', 'height: 100px');

            t = new T({...base, preserveScrollState: true});

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 100,
                preventDefault: noop,
            });

            expect(t.getYAmountScrolled()).toBe(-100);

            t.regenerate();
            expect(t.getYAmountScrolled()).toBe(-100);
        });

        it('does not reapply scroll values after regeneration if false', () => {
            base.wrapper.setAttribute('style', 'height: 100px');

            t = new T({...base, preserveScrollState: false});

            t._handleMoveIntent({
                deltaX: 0,
                deltaY: 100,
                preventDefault: noop,
            });

            expect(t.getYAmountScrolled()).toBe(-100);

            t.regenerate();
            expect(t.getYAmountScrolled()).toBe(0);
        });
    });

    describe('jumpToRowIndex()', () => {
        it('advances the table to the specified index', () => {
            t = new T(base);
            expect(document.querySelector(`.${ROW}[data-index="9"]`)).toBeNull();

            t.jumpToRowIndex(9);

            expect(t.getActiveRowIndex()).toBe(9);
            expect(document.querySelector(`.${ROW}[data-index="9"]`)).not.toBeNull();
        });

        it('ignores non-numeric input', () => {
            t = new T(base);

            sandbox.stub(t, 'setActiveRowIndex');
            t.jumpToRowIndex('foo');

            expect(t.setActiveRowIndex.called).toBe(false);
        });

        it('prevents underflows', () => {
            t = new T(base);

            sandbox.stub(t, 'setActiveRowIndex');
            t.jumpToRowIndex(-100);

            expect(t.setActiveRowIndex.calledWithMatch(0)).toBe(true);
        });

        it('prevents overflows', () => {
            t = new T(base);

            sandbox.stub(t, 'setActiveRowIndex');
            t.jumpToRowIndex(Number.MAX_VALUE);

            expect(t.setActiveRowIndex.calledWithMatch(rows.length - 1)).toBe(true);
        });
    });

    describe('setActiveRowIndex(number)', () => {
        it('sets active status on the given row index', () => {
            t = new T(base);

            t.setActiveRowIndex(1);
            expect(t.rows[1].active).toBe(true);
        });

        it('calls props.activeRowChangedFunc if given', () => {
            const stub = sinon.stub();

            t = new T({...base, activeRowChangedFunc: stub});

            t.setActiveRowIndex(1);
            expect(stub.calledWithMatch(1)).toBe(true);
        });
    });

    describe('resetActiveRowIndex()', () => {
        it('unsets active status on all rows', () => {
            t = new T(base);

            t.setActiveRowIndex(1);
            expect(t.rows[1].active).toBe(true);

            t.resetActiveRowIndex();
            expect(t.rows[1].active).toBe(false);
        });

        it('calls props.activeRowChangedFunc if given', () => {
            const stub = sinon.stub();

            t = new T({...base, activeRowChangedFunc: stub});
            t.setActiveRowIndex(1);
            t.resetActiveRowIndex();

            expect(stub.calledTwice).toBe(true);
            expect(stub.calledWithMatch(1)).toBe(true);
            expect(stub.calledWithMatch()).toBe(true);
        });
    });
});
