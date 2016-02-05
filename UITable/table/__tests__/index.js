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

    const columns = [{title:'FirstName',mapping:'first_name',resizable:true},{title:'LastName',mapping:'last_name',resizable:true},{width:100,title:'JobTitle',mapping:'job_title',resizable:true},{title:'Phone',mapping:'phone',resizable:true},{title:'EmailAddress',mapping:'email',resizable:true},{title:'StreetAddress',mapping:'address1',resizable:true},{title:'City',mapping:'city',resizable:true},{title:'Country',mapping:'country',resizable:true},{title:'CountryCode',mapping:'country_code',resizable:true}];

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
            table.handleYScrollHandleDragStart({button: 0, clientY: 0, preventDefault: noop});
            table.handleDragMove({clientY: 200});
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
            table.handleYScrollHandleDragStart({button: 0, clientY: 0, preventDefault: noop});
            table.handleDragMove({clientY: 200});
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

            expect(table.c.body.style.WebkitTransform).toBe('translate3d(0px,0px,0px)');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 5,
                deltaMode: 0,
                preventDefault: noop
            });

            expect(table.c.body.style.WebkitTransform).toBe('translate3d(0px,-5px,0px)');
        });

        it('should scroll n * cellheight pixels at a time for deltaMode 1 (line mode)', () => {
            table = new TableView(baseConfig);

            expect(table.c.body.style.WebkitTransform).toBe('translate3d(0px,0px,0px)');

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 1,
                deltaMode: 1,
                preventDefault: noop
            });

            expect(table.c.body.style.WebkitTransform).toBe('translate3d(0px,-40px,0px)');
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

        it('should not translate beyond the bounds of the x-axis scroll track', () => {
            table = new TableView(baseConfig);

            const x = table.c['x-scroll-handle'];
            const width = window.getComputedStyle(table.c.wrapper)['width'] || 500;

            table.handleMoveIntent({
                deltaX: 10000,
                deltaY: 0,
                preventDefault: noop
            });

            expect(x.style.WebkitTransform).toBe(
                `translate3d(${parseInt(width, 10) - parseInt(x.style.width, 10)}px,0px,0px)`
            );
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

    describe('y-axis scroll handle', () => {
        it('should calculate height correctly', () => {
            table = new TableView(baseConfig);

            const y = table.c['y-scroll-handle'];

            // rendering 4 rows, 150px container height, so 150 * (5 rendered rows / 10 total rows)
            // it's hardcoded to 150px height in the component as a fallback since JSDOM doesn't have a layout engine
            expect(y.style.height).toBe('75px');
        });

        it('should not translate beyond the bounds of the y-axis scroll track', () => {
            table = new TableView(baseConfig);

            const y = table.c['y-scroll-handle'];
            const height = window.getComputedStyle(table.c.wrapper)['height'] || 150;

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 10000,
                preventDefault: noop
            });

            expect(y.style.WebkitTransform).toBe(
                `translate3d(0px,${parseInt(height, 10) - parseInt(y.style.height, 10)}px,0px)`
            );
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
