/* eslint no-unused-expressions:0 */

// blame it on the phantom
window.Promise = window.Promise || require('es6-promise').Promise;

import UITable from '../UITable';
import React from 'react';
import {noop} from 'lodash';

const rows = [{"id":1,"first_name":"Louise","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":2,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":3,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":4,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":5,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":6,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":7,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":8,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":9,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":10,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"}];

// index 3 is for the ui-row-loading css hook test
const rowGetter = index => index === 3 ? new Promise(noop) : rows[index];

const columns = [{title:'FirstName',mapping:'first_name',resizable:true},{title:'LastName',mapping:'last_name',resizable:true},{defaultWidth:100,title:'JobTitle',mapping:'job_title',resizable:true},{title:'Phone',mapping:'phone',resizable:true},{title:'EmailAddress',mapping:'email',resizable:true},{title:'StreetAddress',mapping:'address1',resizable:true},{title:'City',mapping:'city',resizable:true},{title:'Country',mapping:'country',resizable:true},{title:'CountryCode',mapping:'country_code',resizable:true}];

describe('UITable', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes', () => {
            const table = React.render(
                <UITable data-id='foo'
                         getRow={rowGetter}
                         columns={columns}
                         totalRows={rows.length} />, document.body
            );

            const node = React.findDOMNode(table);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });
    });

    describe('CSS hooks', () => {
        let table;

        beforeEach(() => {
            table = React.render(
                <UITable getRow={rowGetter}
                         columns={columns}
                         totalRows={rows.length} />, document.body
            );
        });

        it('ui-table-wrapper should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.className).to.contain('ui-table-wrapper');
        });

        it('ui-table should be rendered', () => {
            const node = React.findDOMNode(table.refs.table);

            expect(node.className).to.contain('ui-table');
        });

        it('ui-table-body should be rendered', () => {
            const node = React.findDOMNode(table.refs.body);

            expect(node.className).to.contain('ui-table-body');
        });

        it('ui-table-row should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-row:not(.ui-table-header-row)')).to.not.be.null;
        });

        it('ui-table-row-even should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-row-even')).to.not.be.null;
        });

        it('ui-table-row-odd should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-row-odd')).to.not.be.null;
        });

        it('ui-table-row-loading should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-row-loading')).to.not.be.null;
        });

        it('ui-table-cell should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-cell')).to.not.be.null;
        });

        it('ui-table-header-row should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-header-row')).to.not.be.null;
        });

        it('ui-table-header-cell should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-header-cell')).to.not.be.null;
        });

        it('ui-table-header-cell-resize-handle should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-header-cell-resize-handle')).to.not.be.null;
        });

        it('ui-table-x-scroller should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-x-scroller')).to.not.be.null;
        });

        it('ui-table-x-scroller-nub should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-x-scroller-nub')).to.not.be.null;
        });

        it('ui-table-y-scroller should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-y-scroller')).to.not.be.null;
        });

        it('ui-table-y-scroller-nub should be rendered', () => {
            const node = React.findDOMNode(table);

            expect(node.querySelector('.ui-table-y-scroller-nub')).to.not.be.null;
        });
    });

    describe('click functionality', () => {
        it('should make a row active', () => {
            const table = React.render(
                <UITable getRow={rowGetter}
                         columns={columns}
                         totalRows={rows.length} />, document.body
            );

            expect(table.state.currentActiveRowIndex).to.not.equal(0);

            table.handleRowClick(null, rowGetter(0));
            expect(table.state.currentActiveRowIndex).to.equal(0);

            table.handleRowClick(null, rowGetter(4));
            expect(table.state.currentActiveRowIndex).to.equal(4);
        });

        it('should call `onRowInteract` with the event and row data', () => {
            const stub = sandbox.stub();
            const table = React.render(
                <UITable getRow={rowGetter}
                         columns={columns}
                         totalRows={rows.length}
                         onRowInteract={stub} />, document.body
            );
            const node = React.findDOMNode(table.refs.body);

            node.querySelector('.ui-table-row').click();

            expect(stub).to.have.been.calledWith(sinon.match.object, rowGetter(0));
        });

        it('should call `onCellInteract` with the event, row data and cell content', () => {
            const stub = sandbox.stub();
            const table = React.render(
                <UITable getRow={rowGetter}
                         columns={columns}
                         totalRows={rows.length}
                         onCellInteract={stub} />, document.body
            );
            const node = React.findDOMNode(table.refs.body);

            node.querySelector('.ui-table-cell').click();

            expect(stub).to.have.been.calledWith(sinon.match.object, rowGetter(0), rowGetter(0)[columns[0].mapping]);
        });
    });

    describe('arrow key functionality', () => {
        let table;

        beforeEach(() => {
            table = React.render(
                <UITable getRow={rowGetter}
                         columns={columns}
                         totalRows={rows.length} />, document.body
            );
        });

        it('should move the active row on down arrow', () => {
            expect(table.state.currentActiveRowIndex).to.not.equal(0);

            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(table.state.currentActiveRowIndex).to.equal(0);
        });

        it('should move the active row on up arrow', () => {
            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(table.state.currentActiveRowIndex).to.equal(1);

            table.handleKeyDown({
                key: 'ArrowUp',
                preventDefault: noop
            });

            expect(table.state.currentActiveRowIndex).to.equal(0);
        });
    });

    describe('for screen readers', () => {
        let table;

        beforeEach(() => {
            table = React.render(
                <UITable getRow={rowGetter}
                         columns={columns}
                         totalRows={rows.length} />, document.body
            );
        });

        it('the first column content should be spoken aloud on arrow down', () => {
            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(table.state.ariaSpokenOutput).to.equal(rowGetter(0)[columns[0].mapping]);
        });

        it('the whole row content should be spoken aloud on enter', () => {
            table.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            table.handleKeyDown({
                key: 'Enter',
                preventDefault: noop
            });

            const rowData = rowGetter(0);

            columns.forEach(({title, mapping}) => {
                expect(table.state.ariaSpokenOutput).to.contain(`${title}: ${rowData[mapping]}`);
            });
        });
    });

    // styles are needed to test rotation, simulated drag, etc.
    let styles = '.ui-table-wrapper,.ui-table-wrapper *{box-sizing:border-box}.ui-table-wrapper{overflow:hidden;position:relative;height:500px;width:100%;transform:translateZ(0)}.ui-table{border-spacing:0;text-align:left;white-space:nowrap}.ui-table-header{position:relative;z-index:1}.ui-table-body,.ui-table-row{position:absolute;backface-visibility:hidden}.ui-table-body{top:40px}.ui-table-row{top:0;left:0}.ui-table-row-even{background:#fff}.ui-table-row-odd{background:rgba(0,0,0,.075)}.ui-table-row-loading{opacity:.5}.ui-table-row-active{background:rgba(0,0,0,.25)}.ui-table-cell{display:inline-block;vertical-align:top;height:40px;line-height:40px;min-width:75px;padding:0 .75em;position:relative;user-select:none}.ui-table-cell-inner{position:absolute;top:0;left:.75em;right:.75em;overflow:hidden;text-overflow:ellipsis}.ui-table-header-cell{background:#333;color:#FFF}.ui-table-header-cell .ui-table-cell-inner{right:.75em + .5em}.ui-table-header-cell:hover .ui-table-header-cell-resize-handle{opacity:1}.ui-table-header-cell-resize-handle{border-right:2px dotted #FFF;cursor:col-resize;opacity:0;position:absolute;top:5px;bottom:5px;right:5px;width:5px;transition:opacity 200ms ease}.ui-table-x-scroller,.ui-table-y-scroller{background:#CCC;cursor:move;position:absolute;top:0;left:0;right:0;bottom:0;z-index:2}.ui-table-x-scroller{height:8px;top:auto;transition-property:height}.ui-table-x-scroller:hover{height:12px}.ui-table-y-scroller{width:8px;left:auto;transition-property:width}.ui-table-y-scroller:hover{width:12px}.ui-table-x-scroller-nub,.ui-table-y-scroller-nub{background-color:#000;position:absolute}.ui-table-x-scroller-nub{top:0;bottom:0}.ui-table-y-scroller-nub{left:0;right:0}';

    class ComposedTestView extends React.Component {
        render() {
            return (
                <div>
                    <style>{styles}</style>
                    <UITable ref='table'
                             getRow={rowGetter}
                             columns={columns}
                             totalRows={rows.length}
                             style={{height: '90px'}} />
                </div>
            );
        }
    }

    describe('row rotation', () => {
        it('should occur when scrolled down', () => {
            const base = React.render(<ComposedTestView />, document.body);
            const table = base.refs.table;
            const firstRowData = table.state.rows[0].data;

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            expect(table.state.rows[0].data).to.not.equal(firstRowData);
        });

        it('should occur when scrolled up', () => {
            const base = React.render(<ComposedTestView />, document.body);
            const table = base.refs.table;

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            const firstRowData = table.state.rows[0].data;

            table.handleMoveIntent({
                deltaX: 0,
                deltaY: -200,
                preventDefault: noop
            });

            expect(table.state.rows[0].data).to.not.equal(firstRowData);
        });

        it('should occur on left-click drag of the y scroll nub', () => {
            const base = React.render(<ComposedTestView />, document.body);
            const table = base.refs.table;
            const firstRowData = table.state.rows[0].data;

            // simulate drag cascade
            table.handleYScrollerDragStart({button: 0, clientY: 0});
            table.handleDragMove({button: 0, clientY: 200});
            table.handleDragEnd();

            expect(table.state.rows[0].data).to.not.equal(firstRowData);
        });
    });
});
