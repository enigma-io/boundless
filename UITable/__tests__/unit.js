/* eslint no-unused-expressions:0 */

window.requestAnimationFrame = callback => callback();  // make it synchronous for testing

import React from 'react';
import ReactDOM from 'react-dom';

import UITable from '../../UITable';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';
import {times} from 'lodash';

const rows = [{"id":1,"first_name":"Louise","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":2,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":3,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":4,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":5,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":6,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":7,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":8,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":9,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":10,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"}];

// index 3 is for the ui-table-row-loading css hook test
const rowGetter = index => index === 3 ? new Promise(noop) : rows[index];

const rowsAlt = [{"id":1,"first_name":"Lana","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"}];

const altRowGetter = index => rowsAlt[index];

const columns = [{title:'FirstName',mapping:'first_name',resizable:true},{title:'LastName',mapping:'last_name',resizable:true},{width:100,title:'JobTitle',mapping:'job_title',resizable:true},{title:'Phone',mapping:'phone',resizable:true},{title:'EmailAddress',mapping:'email',resizable:true},{title:'StreetAddress',mapping:'address1',resizable:true},{title:'City',mapping:'city',resizable:true},{title:'Country',mapping:'country',resizable:true},{title:'CountryCode',mapping:'country_code',resizable:true}];

const baseProps = {
    identifier: 'foo',
    getRow: rowGetter,
    columns: columns,
    totalRows: rows.length,
};

describe('UITable', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITable, baseProps));

    describe('CSS hooks', () => {
        let element;

        beforeEach(() => element = render(<UITable {...baseProps} />));

        it('ui-table-wrapper should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.className).toContain('ui-table-wrapper');
        });

        it('ui-table should be rendered', () => {
            expect(element.refs.table.className).toContain('ui-table');
        });

        it('ui-table-body should be rendered', () => {
            expect(element.refs.body.className).toContain('ui-table-body');
        });

        it('ui-table-row should be rendered', () => {
            const node = element.refs.body;

            expect(node.querySelector('.ui-table-row')).not.toBe(null);
        });

        it('ui-table-row-even should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-row-even')).not.toBe(null);
        });

        it('ui-table-row-odd should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-row-odd')).not.toBe(null);
        });

        it('ui-table-row-loading should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-row-loading')).not.toBe(null);
        });

        it('ui-table-cell should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-cell')).not.toBe(null);
        });

        it('ui-table-header-cell should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-header-cell')).not.toBe(null);
        });

        it('ui-table-header-cell-resize-handle should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-header-cell-resize-handle')).not.toBe(null);
        });

        it('ui-table-x-scroll-track should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-x-scroll-track')).not.toBe(null);
        });

        it('ui-table-x-scroll-handle should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-x-scroll-handle')).not.toBe(null);
        });

        it('ui-table-y-scroll-track should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-y-scroll-track')).not.toBe(null);
        });

        it('ui-table-y-scroll-handle should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-y-scroll-handle')).not.toBe(null);
        });
    });

    describe('click functionality', () => {
        it('should make a row active', () => {
            const element = render(<UITable {...baseProps} />);

            expect(element.refs.body.querySelector('.ui-table-row-active')).toBe(null);

            let row = element.refs.body.querySelector('.ui-table-row');
                row.click();

            expect(row.classList.contains('ui-table-row-active')).toBe(true);

            let row2 = element.refs.body.querySelector('.ui-table-row:nth-child(2)');
                row2.click();

            expect(row.classList.contains('ui-table-row-active')).toBe(false);
            expect(row2.classList.contains('ui-table-row-active')).toBe(true);
        });

        it('should call `onRowInteract` with the event and row index', () => {
            const stub = sandbox.stub();
            const element = render(<UITable {...baseProps} onRowInteract={stub} />);

            element.refs.body.querySelector('.ui-table-row').click();

            expect(stub.calledWith(sinon.match.object, 0)).toBe(true);
        });

        it('should call `onCellInteract` with the event, row index and row field', () => {
            const stub = sandbox.stub();
            const element = render(<UITable {...baseProps} onCellInteract={stub} />);

            element.refs.body.querySelector('.ui-table-cell').click();

            expect(stub.calledWith(sinon.match.object, 0, columns[0].mapping)).toBe(true);
        });
    });

    describe('arrow key functionality', () => {
        let element;

        beforeEach(() => element = render(<UITable {...baseProps} />));

        it('should move the active row on down arrow', () => {
            expect(element.refs.body.querySelector('.ui-table-row-active')).toBe(null);

            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row-active')).not.toBe(null);
            expect(element.refs.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');
        });

        it('should move the active row on up arrow', () => {
            expect(element.refs.body.querySelector('.ui-table-row-active')).toBe(null);

            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Dennis');

            element.handleKeyDown({
                key: 'ArrowUp',
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');
        });
    });

    describe('for screen readers', () => {
        let element;

        beforeEach(() => element = render(<UITable {...baseProps} />));

        it('the first column content should be spoken aloud on arrow down', () => {
            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(element.refs.aria.innerText).toBe('Louise');
        });

        it('the whole row content should be spoken aloud on enter', () => {
            times(9, () => {
                element.handleKeyDown({
                    key: 'ArrowDown',
                    preventDefault: noop
                });
            });

            element.handleKeyDown({
                key: 'Enter',
                preventDefault: noop
            });

            const rowData = rowGetter(8); // index starts at -1 for "active" row

            columns.forEach(({title, mapping}) => {
                expect(element.refs.aria.innerText).toContain(`${title}: ${rowData[mapping]}`);
            });
        });
    });

    describe('row rotation', () => {
        it('should occur when scrolled down', () => {
            const element = render(<UITable {...baseProps} style={{height: '150px'}} />);

            expect(element.refs.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row .ui-table-cell').textContent).not.toBe('Louise');
        });

        it('should preserve the active row', () => {
            const element = render(<UITable {...baseProps} style={{height: '150px'}} />);

            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: 10000,
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row-active')).toBe(null);

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: -10000,
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row-active .ui-table-cell').textContent).toBe('Louise');
        });

        it('should occur when scrolled up', () => {
            const element = render(<UITable {...baseProps} style={{height: '150px'}} />);

            expect(element.refs.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row .ui-table-cell').textContent).not.toBe('Louise');

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: -200,
                preventDefault: noop
            });

            expect(element.refs.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');
        });

        it('should occur on left-click drag of the y scroll nub', () => {
            const element = render(<UITable {...baseProps} style={{height: '150px'}} />);

            expect(element.refs.body.querySelector('.ui-table-row .ui-table-cell').textContent).toBe('Louise');

            // simulate drag cascade
            element.handleYScrollHandleDragStart({button: 0, clientY: 0, preventDefault: noop});
            element.handleDragMove({button: 0, clientY: 200});
            element.handleDragEnd();

            expect(element.refs.body.querySelector('.ui-table-row .ui-table-cell').textContent).not.toBe('Louise');
        });
    });

    describe('scroll event handling', () => {
        it('should scroll literal amounts of pixels for deltaMode 0 (pixel mode)', () => {
            const element = render(<UITable {...baseProps} />);

            expect(element.refs.body.style.WebkitTransform).toBe('translate3d(0px,0px,0px)');

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: 5,
                deltaMode: 0,
                preventDefault: noop
            });

            expect(element.refs.body.style.WebkitTransform).toBe('translate3d(0px,-5px,0px)');
        });

        it('should scroll n * cellheight pixels at a time for deltaMode 1 (line mode)', () => {
            const element = render(<UITable {...baseProps} />);

            expect(element.refs.body.style.WebkitTransform).toBe('translate3d(0px,0px,0px)');

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: 1,
                deltaMode: 1,
                preventDefault: noop
            });

            expect(element.refs.body.style.WebkitTransform).toBe('translate3d(0px,-40px,0px)');
        });
    });

    describe('x-axis scroll handle', () => {
        it('should calculate width correctly', () => {
            const element = render(<UITable {...baseProps} />);
            const x = element.refs['x-scroll-handle'];

            // rendering 4 rows, 500px container width, all the columns fit inside, so it should be max width
            // it's hardcoded to 500px width in the component as a fallback since JSDOM doesn't have a layout engine
            expect(x.style.width).toBe('500px');
        });

        it('should not translate beyond the bounds of the x-axis scroll track', () => {
            const element = render(<UITable {...baseProps} />);
            const x = element.refs['x-scroll-handle'];
            const width = window.getComputedStyle(element.refs.wrapper)['width'] || 500;

            element.handleMoveIntent({
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
        //     const element = render(<UITable {...baseProps} />);
        //     const cell = element.refs.header.querySelector('.ui-table-header-cell');
        //     const previousWidth = cell.style.width;
        //     const resizer = cell.querySelector('.ui-table-header-cell-resize-handle');
        //     const x = element.refs['x-scroll-handle'];
        //     const previousXWidth = x.style.width;

        //     element.handleColumnDragStart({
        //         button: 0, // left mouse button
        //         target: resizer,
        //         clientX: parseInt(previousWidth, 10),
        //         preventDefault: noop,
        //     });

        //     element.handleColumnResize(300);
        //     element.handleDragEnd();

        //     expect(x.style.width).not.toBe(previousXWidth);
        // });
    });

    describe('y-axis scroll handle', () => {
        it('should calculate height correctly', () => {
            const element = render(<UITable {...baseProps} />);
            const y = element.refs['y-scroll-handle'];

            // rendering 4 rows, 150px container height, so 150 * (5 rendered rows / 10 total rows)
            // it's hardcoded to 150px height in the component as a fallback since JSDOM doesn't have a layout engine
            expect(y.style.height).toBe('75px');
        });

        it('should not translate beyond the bounds of the y-axis scroll track', () => {
            const element = render(<UITable {...baseProps} />);
            const y = element.refs['y-scroll-handle'];
            const height = window.getComputedStyle(element.refs.wrapper)['height'] || 150;

            element.handleMoveIntent({
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
            const element = render(<UITable {...baseProps} />);
            const cell = element.refs.header.querySelector('.ui-table-header-cell');
            const previousWidth = cell.style.width;
            const resizer = cell.querySelector('.ui-table-header-cell-resize-handle');

            element.handleColumnDragStart({
                button: 0, // left mouse button
                target: resizer,
                clientX: parseInt(previousWidth, 10),
                preventDefault: noop,
            });

            element.handleColumnResize(20);
            element.handleDragEnd();

            expect(cell.style.width).toBe(`${parseInt(previousWidth, 10) + 20}px`);
        });

        it('should adjust the width of the appropriate row cells', () => {
            const element = render(<UITable {...baseProps} />);
            const headerCell = element.refs.header.querySelector('.ui-table-header-cell:nth-child(2)');
            const previousWidth = headerCell.style.width;
            const resizer = headerCell.querySelector('.ui-table-header-cell-resize-handle');

            element.handleColumnDragStart({
                button: 0, // left mouse button
                target: resizer,
                clientX: parseInt(previousWidth, 10),
                preventDefault: noop,
            });

            element.handleColumnResize(20);
            element.handleDragEnd();

            const newWidth = `${parseInt(previousWidth, 10) + 20}px`;

            expect(headerCell.style.width).toBe(newWidth);

            const rowCells = Array.prototype.slice.call(
                element.refs.body.querySelectorAll('.ui-table-cell:nth-child(2)')
            );

            rowCells.forEach(node => expect(node.style.width).toBe(newWidth));
        });
    });

    describe('props.identifier', () => {
        it('should fully reset the table when changed', () => {
            let element = render(<UITable {...baseProps} />);

            expect(element.refs.body.querySelector('.ui-table-cell').textContent).toBe('Louise');

            element = render(
                <UITable {...baseProps} identifier='alternate' totalRows={rowsAlt.length} getRow={altRowGetter} />
            );

            expect(element.refs.body.querySelector('.ui-table-cell').textContent).toBe('Lana');
        });
    });

    describe('window resize', () => {
        it('should rebuild the table if the new container height differs from the previous cached height', () => {
            const element = render(<UITable {...baseProps} />);

            sandbox.stub(element, 'regenerate');

            element._container_h -= 1;

            element.handleWindowResize();
            expect(element.regenerate.calledOnce).toBe(true);

        });

        it('should cause a recompute of the container dimensions', () => {
            const element = render(<UITable {...baseProps} />);

            sandbox.stub(element, 'calculateContainerDimensions');

            element.handleWindowResize();
            expect(element.calculateContainerDimensions.calledOnce).toBe(true);

        });

        it('should cause a recompute of the scrollbars', () => {
            const element = render(<UITable {...baseProps} />);

            sandbox.stub(element, 'initializeScrollBars');

            element.handleWindowResize();
            expect(element.initializeScrollBars.calledOnce).toBe(true);

        });
    });
});
