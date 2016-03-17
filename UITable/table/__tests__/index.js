/* eslint no-unused-expressions:0 */

window.requestAnimationFrame = callback => callback();  // make it synchronous for testing

import TableView from '../index';

import sinon from 'sinon';
import {noop, times} from 'lodash';

describe('UITable/TableView', () => {
    const sandbox = sinon.sandbox.create();

    const rows = [{"id":1,"first_name":"Louise","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":2,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":3,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":4,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":5,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":6,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":7,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":8,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":9,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":10,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"}];

    // index 3 is for the ui-table-row-loading css hook test
    const rowGetter = index => index === 3 ? new Promise(noop) : rows[index];

    const rowsAlt = [{"id":1,"first_name":"Lana","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"}];

    const altRowGetter = index => rowsAlt[index];

    const columns = [{title:'FirstName',mapping:'first_name',resizable:true},{title:'LastName',mapping:'last_name',resizable:true},{width:100,title:'JobTitle',mapping:'job_title',resizable:true},{title:'Phone',mapping:'phone',resizable:true},{title:'EmailAddress',mapping:'email',resizable:true},{title:'StreetAddress',mapping:'address1',resizable:true},{title:'City',mapping:'city',resizable:true},{title:'Country',mapping:'country',resizable:true},{title:'CountryCode',mapping:'country_code', resizable: true}];

    document.body.innerHTML = `<div class='ui-table-wrapper' tabindex='0'>
        <div class='ui-table'>
            <div class='ui-table-header'></div>
            <div class='ui-table-body'></div>
        </div>
        <div>
            <div class='ui-table-x-scroll-track'>
                <div class='ui-table-x-scroll-handle'></div>
            </div>
            <div class='ui-table-y-scroll-track'>
                <div class='ui-table-y-scroll-handle'></div>
            </div>
        </div>
        <div class='ui-offscreen' aria-live='polite' />
    </div>`;

    const baseConfig = {
        getRow: rowGetter,
        columns: columns,
        totalRows: rows.length,

        wrapper: document.querySelector('.ui-table-wrapper'),
        header: document.querySelector('.ui-table-header'),
        body: document.querySelector('.ui-table-body'),
        aria: document.querySelector('.ui-offscreen'),
        'x-scroll-track': document.querySelector('.ui-table-x-scroll-track'),
        'y-scroll-track': document.querySelector('.ui-table-y-scroll-track'),
        'x-scroll-handle': document.querySelector('.ui-table-x-scroll-handle'),
        'y-scroll-handle': document.querySelector('.ui-table-y-scroll-handle'),
    };

    let table;

    afterEach(() => {
        sandbox.restore();
        table.destroy();
    });

    describe('configuration validation', () => {
        beforeEach(() => table = {destroy: noop});

        it('should throw if wrapper is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, wrapper: null}); }).toThrow();
        });

        it('should throw if header is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, header: null}); }).toThrow();
        });

        it('should throw if body is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, body: null}); }).toThrow();
        });

        it('should throw if x-scroll-track is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, 'x-scroll-track': null}); }).toThrow();
        });

        it('should throw if y-scroll-track is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, 'y-scroll-track': null}); }).toThrow();
        });

        it('should throw if x-scroll-handle is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, 'x-scroll-handle': null}); }).toThrow();
        });

        it('should throw if y-scroll-handle is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, 'y-scroll-handle': null}); }).toThrow();
        });

        it('should throw if aria is not a DOM node', () => {
            expect(function() { return new TableView({...baseConfig, aria: null}); }).toThrow();
        });

        it('should throw if columns is not an array', () => {
            expect(function() { return new TableView({...baseConfig, columns: 'x'}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, columns: function(){}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, columns: {}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, columns: 3}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, columns: true}); }).toThrow();
        });

        it('should throw if columns has no array items', () => {
            expect(function() { return new TableView({...baseConfig, columns: []}); }).toThrow();
        });

        it('should throw if columns array items have an improper shape', () => {
            expect(function() { return new TableView({...baseConfig, columns: [{}]}); }).toThrow();
        });

        it('should throw if throttleInterval is not a number', () => {
            expect(function() { return new TableView({...baseConfig, throttleInterval: 'x'}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, throttleInterval: function(){}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, throttleInterval: {}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, throttleInterval: []}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, throttleInterval: true}); }).toThrow();
        });

        it('should default throttleInterval to 300ms', () => {
            table = new TableView({...baseConfig, throttleInterval: undefined});

            expect(table.c.throttleInterval).toEqual(300);
        });

        it('should throw if totalRows is not a number', () => {
            expect(function() { return new TableView({...baseConfig, totalRows: 'x'}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, totalRows: function(){}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, totalRows: {}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, totalRows: []}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, totalRows: true}); }).toThrow();
        });

        it('should default totalRows to zero', () => {
            table = new TableView({...baseConfig, totalRows: undefined});

            expect(table.c.totalRows).toEqual(0);
        });

        it('should throw if getRow is not a function', () => {
            expect(function() { return new TableView({...baseConfig, getRow: 'x'}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, getRow: {}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, getRow: []}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, getRow: true}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, getRow: 3}); }).toThrow();
        });

        it('should throw if rowClickFunc is not a function', () => {
            expect(function() { return new TableView({...baseConfig, rowClickFunc: 'x'}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, rowClickFunc: {}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, rowClickFunc: []}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, rowClickFunc: true}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, rowClickFunc: 3}); }).toThrow();
        });

        it('should default rowClickFunc to a noop function', () => {
            table = new TableView({...baseConfig, rowClickFunc: undefined});

            expect(table.c.rowClickFunc).toEqual(jasmine.any(Function));
        });

        it('should throw if cellClickFunc is not a function', () => {
            expect(function() { return new TableView({...baseConfig, cellClickFunc: 'x'}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, cellClickFunc: {}}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, cellClickFunc: []}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, cellClickFunc: true}); }).toThrow();
            expect(function() { return new TableView({...baseConfig, cellClickFunc: 3}); }).toThrow();
        });

        it('should default cellClickFunc to a noop function', () => {
            table = new TableView({...baseConfig, cellClickFunc: undefined});

            expect(table.c.cellClickFunc).toEqual(jasmine.any(Function));
        });
    });

    describe('click functionality', () => {
        it('should make a row active', () => {
            table = new TableView(baseConfig);

            expect(table.c.body.querySelector('.ui-table-row-active')).toBe(null);

            const row = table.c.body.querySelector('.ui-table-row');
                  row.click();

            expect(row.classList.contains('ui-table-row-active')).toBe(true);

            const row2 = table.c.body.querySelector('.ui-table-row:nth-child(2)');
                  row2.click();

            expect(row.classList.contains('ui-table-row-active')).toBe(false);
            expect(row2.classList.contains('ui-table-row-active')).toBe(true);
        });

        it('should call `onRowInteract` with the event and row index', () => {
            const stub = sandbox.stub();

            table = new TableView({...baseConfig, rowClickFunc: stub});
            table.c.body.querySelector('.ui-table-row').click();

            expect(stub.calledWith(sinon.match.object, 0)).toBe(true);
        });

        it('should call `onCellInteract` with the event, row index and row field', () => {
            const stub = sandbox.stub();

            table = new TableView({...baseConfig, cellClickFunc: stub});
            table.c.body.querySelector('.ui-table-cell').click();

            expect(stub.calledWith(sinon.match.object, 0, columns[0].mapping)).toBe(true);
        });
    });

    describe('arrow key functionality', () => {
        beforeEach(() => table = new TableView(baseConfig));

        it('should move the active row on down arrow', () => {
            expect(table.c.body.querySelector('.ui-table-row-active')).toBe(null);

            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row-active')).not.toBe(null);
            expect(table.c.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');
        });

        it('should move the active row on up arrow', () => {
            expect(table.c.body.querySelector('.ui-table-row-active')).toBe(null);

            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Dennis');

            table.handleKeyDown({
                key: 'ArrowUp',
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');
        });
    });

    describe('for screen readers', () => {
        beforeEach(() => table = new TableView(baseConfig));

        it('the first column content should be spoken aloud on arrow down', () => {
            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(table.c.aria.innerText).toBe('Louise');
        });

        it('the whole row content should be spoken aloud on enter', () => {
            times(9, () => {
                table.handleKeyDown({
                    key: 'ArrowDown',
                    preventDefault: noop
                });
            });

            table.handleKeyDown({
                key: 'Enter',
                preventDefault: noop
            });

            const rowData = rowGetter(8); // index starts at -1 for "active" row

            columns.forEach(({title, mapping}) => {
                expect(table.c.aria.innerText).toContain(`${title}: ${rowData[mapping]}`);
            });
        });
    });

    describe('rows', () => {
        it('row.active should return `true` if the row is selected', () => {
            table = new TableView(baseConfig);

            expect(table.rows[0].active).toBe(false);

            table.changeActiveRow(1);
            expect(table.rows[0].active).toBe(true);
        });
    });

    describe('row cells', () => {
        it('cell.content should retrieve the text of the cell', () => {
            table = new TableView(baseConfig);

            expect(table.rows[0].cells[0].content).toBe(rows[0][columns[0].mapping]);
        });

        it('cell.content = `string` should update the cell text', () => {
            table = new TableView(baseConfig);

            expect(table.rows[0].cells[0].content).not.toBe('abc');

            table.rows[0].cells[0].content = 'abc';
            expect(table.rows[0].cells[0].content).toBe('abc');
        });

        it('cell.width should retrieve the calculated width', () => {
            table = new TableView(baseConfig);

            expect(table.rows[0].cells[0].width).toEqual(jasmine.any(Number));
        });

        it('cell.width = `number` should update the cell width', () => {
            table = new TableView(baseConfig);

            expect(table.rows[0].cells[0].width).not.toBe(400);

            table.rows[0].cells[0].width = 400;
            expect(table.rows[0].cells[0].width).toBe(400);
        });

        it('should be tagged with their respective column via [data-column]', () => {
            table = new TableView(baseConfig);

            expect(table.rows[0].cells[0].node.getAttribute('data-column')).toBe('first_name');
        });
    });

    describe('row rotation', () => {
        afterEach(() => baseConfig.wrapper.setAttribute('style', ''));

        it('should occur when scrolled down', () => {
            baseConfig.wrapper.setAttribute('style', 'height: 150px');

            table = new TableView(baseConfig);

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).not.toBe('Louise');
        });

        it('should preserve the active row', () => {
            baseConfig.wrapper.setAttribute('style', 'height: 150px');

            table = new TableView(baseConfig);

            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 10000,
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row-active')).toBe(null);

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: -10000,
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');
        });

        it('should occur when scrolled up', () => {
            baseConfig.wrapper.setAttribute('style', 'height: 150px');

            table = new TableView(baseConfig);

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).not.toBe('Louise');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: -200,
                preventDefault: noop
            });

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');
        });

        it('should occur on left-click drag of the y scroll nub', () => {
            sandbox.useFakeTimers();

            baseConfig.wrapper.setAttribute('style', 'height: 150px');

            table = new TableView(baseConfig);

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');

            // simulate drag cascade
            table.handleYScrollHandleDragStart({button: 0, pageY: 0, offsetY: 0, preventDefault: noop});
            table.handleDragMove({pageY: 200});
            table.handleDragEnd();

            sandbox.clock.tick(301);

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).not.toBe('Louise');
        });

        it('should not occur on left-click drag of the y scroll nub before the throttle interval is reached', () => {
            sandbox.useFakeTimers();

            baseConfig.wrapper.setAttribute('style', 'height: 150px');

            table = new TableView(baseConfig);

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');

            // simulate drag cascade
            table.handleYScrollHandleDragStart({button: 0, pageY: 0, offsetY: 0, preventDefault: noop});
            table.handleDragMove({pageY: 200});
            table.handleDragEnd();

            sandbox.clock.tick(100);

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('');

            sandbox.clock.tick(301);

            expect(table.c.body.querySelector('.ui-table-row .ui-table-cell').textContent).not.toBe('Louise');
        });
    });

    describe('scroll event handling', () => {
        it('should scroll literal amounts of pixels for deltaMode 0 (pixel mode)', () => {
            table = new TableView(baseConfig);

            sandbox.stub(table, 'translateBody');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 5,
                deltaMode: 0,
                preventDefault: noop
            });

            expect(table.translateBody.calledWithMatch(0, -5)).toBe(true);
        });

        it('should scroll n * cellheight pixels at a time for deltaMode 1 (line mode)', () => {
            table = new TableView(baseConfig);

            sandbox.stub(table, 'translateBody');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 1,
                deltaMode: 1,
                preventDefault: noop
            });

            expect(table.translateBody.calledWithMatch(0, -40)).toBe(true);
        });
    });

    describe('x-axis scroll track', () => {
        it('should hide itself if the calculated handle size is equal to the container width', () => {
            table = new TableView(baseConfig);

            table.x_max = 0;

            table.initializeScrollBars();

            expect(table.c['x-scroll-track'].style.display).toBe('none');
        });
    });

    describe('x-axis scroll handle', () => {
        it('should calculate width correctly', () => {
            table = new TableView(baseConfig);

            const x = table.c['x-scroll-handle'];

            // rendering 4 rows, 500px container width, all the columns fit inside, so it should be max width
            // it's hardcoded to 500px width in the component as a fallback since JSDOM doesn't have a layout engine
            expect(x.style.width).toBe('500px');
        });

        it('should default to 12px width if would become too small', () => {
            table = new TableView(baseConfig);

            expect(table.calculateXScrollHandleSize()).not.toBe(12);

            table.container_w = 500;
            table.x_max = 500;

            expect(table.calculateXScrollHandleSize()).toBe(12);
        });

        it('should not translate beyond the bounds of the x-axis scroll track', () => {
            table = new TableView(baseConfig);

            const x = table.c['x-scroll-handle'];
            const width = window.getComputedStyle(table.c.wrapper)['width'] || 500;

            sandbox.stub(table, 'translateXScrollHandle');

            table.handleMoveIntent({
                deltaX: 10000,
                deltaY: 0,
                preventDefault: noop
            });

            expect(table.translateXScrollHandle.calledWithMatch(
                parseInt(width, 10) - parseInt(x.style.width, 10)
            )).toBe(true);
        });

        /* Can be uncommented when JSDOM implements a layout engine. */
        // it('should change if a column is resized', () => {
        //     table = new TableView(baseConfig);
        //
        //     const cell = table.c.header.querySelector('.ui-table-header-cell');
        //     const previousWidth = cell.style.width;
        //     const resizer = cell.querySelector('.ui-table-header-cell-resize-handle');
        //     const x = table.c['x-scroll-handle'];
        //     const previousXWidth = x.style.width;

        //     table.handleColumnDragStart({
        //         button: 0, // left mouse button
        //         target: resizer,
        //         clientX: parseInt(previousWidth, 10),
        //         preventDefault: noop,
        //     });

        //     table.handleColumnResize(300);
        //     table.handleDragEnd();

        //     expect(x.style.width).not.toBe(previousXWidth);
        // });
    });

    describe('y-axis scroll track', () => {
        it('should hide itself if the calculated handle size is equal to the container height', () => {
            table = new TableView({...baseConfig, totalRows: 1});

            expect(table.c['y-scroll-track'].style.display).toBe('none');
        });
    });

    describe('y-axis scroll handle', () => {
        it('should calculate height correctly', () => {
            table = new TableView(baseConfig);

            const y = table.c['y-scroll-handle'];
            const expectedHeight = table.container_h * (table.n_rows_visible / table.c.totalRows);

            expect(y.style.height).toBe(expectedHeight + 'px');
        });

        it('should default to 12px height if would become too small', () => {
            table = new TableView(baseConfig);

            expect(table.calculateYScrollHandleSize()).not.toBe(12);

            table.n_rows_visible = 0;

            expect(table.calculateYScrollHandleSize()).toBe(12);
        });

        it('should not translate beyond the bounds of the y-axis scroll track', () => {
            table = new TableView(baseConfig);

            sandbox.stub(table, 'translateYScrollHandle');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 10000,
                preventDefault: noop
            });

            expect(table.translateYScrollHandle.calledWithMatch(
                table.container_h - table.y_scroll_handle_size
            )).toBe(true);
        });
    });

    describe('column cells', () => {
        it('column.title should retrieve the title property of the column', () => {
            table = new TableView(baseConfig);

            expect(table.columns[0].title).toBe(table.c.columns[0].title);
        });

        it('column.title = `string` should update the text', () => {
            table = new TableView(baseConfig);

            expect(table.columns[0].title).not.toBe('abc');

            table.columns[0].title = 'abc';
            expect(table.columns[0].title).toBe('abc');
        });
    });

    describe('column resizing', () => {
        it('should adjust the width of the appropriate column cell', () => {
            table = new TableView(baseConfig);

            const cell = table.c.header.querySelector('.ui-table-header-cell');
            const previousWidth = cell.style.width;
            const resizer = cell.querySelector('.ui-table-header-cell-resize-handle');

            table.handleColumnDragStart({
                button: 0, // left mouse button
                target: resizer,
                clientX: parseInt(previousWidth, 10),
                preventDefault: noop,
            });

            table.handleColumnResize(20);
            table.handleDragEnd();

            expect(cell.style.width).toBe(`${parseInt(previousWidth, 10) + 20}px`);
        });

        it('should adjust the width of the appropriate row cells', () => {
            table = new TableView(baseConfig);

            const headerCell = table.c.header.querySelector('.ui-table-header-cell:nth-child(2)');
            const previousWidth = headerCell.style.width;
            const resizer = headerCell.querySelector('.ui-table-header-cell-resize-handle');

            table.handleColumnDragStart({
                button: 0, // left mouse button
                target: resizer,
                clientX: parseInt(previousWidth, 10),
                preventDefault: noop,
            });

            table.handleColumnResize(20);
            table.handleDragEnd();

            const newWidth = `${parseInt(previousWidth, 10) + 20}px`;

            expect(headerCell.style.width).toBe(newWidth);

            const rowCells = Array.prototype.slice.call(
                table.c.body.querySelectorAll('.ui-table-cell:nth-child(2)')
            );

            rowCells.forEach(node => expect(node.style.width).toBe(newWidth));
        });
    });

    describe('window resize', () => {
        it('should rebuild the table if the new container height differs from the previous cached height', () => {
            table = new TableView(baseConfig);

            sandbox.stub(table, 'regenerate');

            table._container_h -= 1;

            table.handleWindowResize();
            expect(table.regenerate.calledOnce).toBe(true);

        });

        it('should cause a recompute of the container dimensions', () => {
            table = new TableView(baseConfig);

            sandbox.stub(table, 'calculateContainerDimensions');

            table.handleWindowResize();
            expect(table.calculateContainerDimensions.calledOnce).toBe(true);

        });

        it('should cause a recompute of the scrollbars', () => {
            table = new TableView(baseConfig);

            sandbox.stub(table, 'initializeScrollBars');

            table.handleWindowResize();
            expect(table.initializeScrollBars.calledOnce).toBe(true);

        });
    });
});
