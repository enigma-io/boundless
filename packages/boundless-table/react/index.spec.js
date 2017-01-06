/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {noop} from 'lodash';

import ReactTable from './index';

window.requestAnimationFrame = (callback) => callback();  // make it synchronous for testing

const rows = [{'id': 1, 'first_name': 'Louise', 'last_name': 'Fernandez', 'job_title': 'Database Administrator I', 'phone': '6-(697)972-8601', 'email': 'lfernandez1@opera.com', 'address1': '5049 Barnett Road', 'city': 'Nglengkir', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 2, 'first_name': 'Dennis', 'last_name': 'Nichols', 'job_title': 'Nurse', 'phone': '9-(896)552-6623', 'email': 'dnichols0@ycombinator.com', 'address1': '0 Drewry Drive', 'city': 'Canggetelo', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 3, 'first_name': 'Stephen', 'last_name': 'Hamilton', 'job_title': 'Dental Hygienist', 'phone': '1-(274)517-4270', 'email': 'shamilton2@amazon.co.jp', 'address1': '11 David Crossing', 'city': 'Kotabaru', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 4, 'first_name': 'Shawn', 'last_name': 'Richards', 'job_title': 'Librarian', 'phone': '1-(173)205-8062', 'email': 'srichards3@4shared.com', 'address1': '47533 Sherman Street', 'city': 'Viengxay', 'country': 'Laos', 'country_code': 'LA'}, {'id': 5, 'first_name': 'John', 'last_name': 'Hansen', 'job_title': 'Staff Scientist', 'phone': '5-(650)401-5661', 'email': 'jhansen4@sfgate.com', 'address1': '955 Jackson Park', 'city': 'South Tangerang', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 6, 'first_name': 'Ronald', 'last_name': 'Alexander', 'job_title': 'Structural Engineer', 'phone': '7-(675)732-2723', 'email': 'ralexander5@usgs.gov', 'address1': '0858 Hooker Court', 'city': 'Kardítsa', 'country': 'Greece', 'country_code': 'GR'}, {'id': 7, 'first_name': 'Shawn', 'last_name': 'Myers', 'job_title': 'Executive Secretary', 'phone': '0-(903)830-7054', 'email': 'smyers6@addtoany.com', 'address1': '69605 Rusk Junction', 'city': 'Erpeldange', 'country': 'Luxembourg', 'country_code': 'LU'}, {'id': 8, 'first_name': 'Andrew', 'last_name': 'Hill', 'job_title': 'Research Nurse', 'phone': '9-(825)250-8207', 'email': 'ahill7@sohu.com', 'address1': '4 Lunder Junction', 'city': 'Naji', 'country': 'China', 'country_code': 'CN'}, {'id': 9, 'first_name': 'Susan', 'last_name': 'Fowler', 'job_title': 'Product Engineer', 'phone': '2-(891)897-3096', 'email': 'sfowler8@addtoany.com', 'address1': '17 Artisan Pass', 'city': 'Oslomej', 'country': 'Macedonia', 'country_code': 'MK'}, {'id': 10, 'first_name': 'Denise', 'last_name': 'Gonzalez', 'job_title': 'Associate Professor', 'phone': '7-(665)859-5877', 'email': 'dgonzalez9@answers.com', 'address1': '8538 Sage Hill', 'city': 'Baiima', 'country': 'Sierra Leone', 'country_code': 'SL'}];

// index 3 is for the b-table-row-loading css hook test
const rowGetter = (index) => index === 3 ? new Promise(noop) : rows[index];

const rowsAlt = [{'id': 1, 'first_name': 'Lana', 'last_name': 'Fernandez', 'job_title': 'Database Administrator I', 'phone': '6-(697)972-8601', 'email': 'lfernandez1@opera.com', 'address1': '5049 Barnett Road', 'city': 'Nglengkir', 'country': 'Indonesia', 'country_code': 'ID'}];

const altRowGetter = (index) => rowsAlt[index];

const columns = [{title: 'FirstName', mapping: 'first_name', resizable: true}, {title: 'LastName', mapping: 'last_name', resizable: true}, {width: 100, title: 'JobTitle', mapping: 'job_title', resizable: true}, {title: 'Phone', mapping: 'phone', resizable: true}, {title: 'EmailAddress', mapping: 'email', resizable: true}, {title: 'StreetAddress', mapping: 'address1', resizable: true}, {title: 'City', mapping: 'city', resizable: true}, {title: 'Country', mapping: 'country', resizable: true}, {title: 'CountryCode', mapping: 'country_code', resizable: true}];

const baseProps = {
    identifier: 'foo',
    getRow: rowGetter,
    columns: columns,
    totalRows: rows.length,
};

describe('ReactTable component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('CSS hooks', () => {
        let element;

        beforeEach(() => (element = render(<ReactTable {...baseProps} />)));

        it('b-table-wrapper is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.className).toContain('b-table-wrapper');
        });

        it('b-table-body is rendered', () => {
            expect(element.refs.body.className).toContain('b-table-body');
        });

        it('b-table-row is rendered', () => {
            const node = element.refs.body;

            expect(node.querySelector('.b-table-row')).not.toBe(null);
        });

        it('b-table-row-even is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-row-even')).not.toBe(null);
        });

        it('b-table-row-odd is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-row-odd')).not.toBe(null);
        });

        it('b-table-row-loading is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-row-loading')).not.toBe(null);
        });

        it('b-table-cell is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-cell')).not.toBe(null);
        });

        it('b-table-cell-even is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-cell-even')).not.toBe(null);
        });

        it('b-table-cell-odd is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-cell-odd')).not.toBe(null);
        });

        it('b-table-header-cell is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-header-cell')).not.toBe(null);
        });

        it('b-table-header-cell-resize-handle is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-header-cell-resize-handle')).not.toBe(null);
        });

        it('b-table-x-scroll-track is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-x-scroll-track')).not.toBe(null);
        });

        it('b-table-x-scroll-handle is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-x-scroll-handle')).not.toBe(null);
        });

        it('b-table-y-scroll-track is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-y-scroll-track')).not.toBe(null);
        });

        it('b-table-y-scroll-handle is rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.b-table-y-scroll-handle')).not.toBe(null);
        });
    });

    describe('props.jumpToRowIndex', () => {
        it('marks the first row as active if 0 (regression)', () => {
            const element = render(<ReactTable {...baseProps} jumpToRowIndex={0} />);
            expect(element.table.getActiveRowIndex()).toBe(0);
        });
    });

    describe('props.identifier', () => {
        it('fully resets the table when changed', () => {
            let element = render(<ReactTable {...baseProps} />);

            expect(element.refs.body.querySelector('.b-table-cell').textContent).toBe('Louise');

            element = render(
                <ReactTable {...baseProps} identifier='alternate' totalRows={rowsAlt.length} getRow={altRowGetter} />
            );

            expect(element.refs.body.querySelector('.b-table-cell').textContent).toBe('Lana');
        });
    });

    describe('regeneration', () => {
        it('does not occur if nothing changed', () => {
            let element;

            element = render(<ReactTable {...baseProps} />);

            sandbox.stub(element.table, 'regenerate');

            element = render(<ReactTable {...baseProps} />);
            expect(element.table.regenerate.called).toBe(false);
        });

        it('occurs if a column is changed', () => {
            let element;

            element = render(<ReactTable {...baseProps} />);

            sandbox.stub(element.table, 'regenerate');

            element.table.columns[0].width = 300;

            const modifiedColumns = [
                {...baseProps.columns[0], width: 299},
                ...baseProps.columns.slice(1),
            ];

            element = render(<ReactTable {...baseProps} columns={modifiedColumns} />);
            expect(element.table.regenerate.calledOnce).toBe(true);
        });

        it('does not occur if a column width is changed to match the internal column width', () => {
            const modifiedColumns = baseProps.columns.slice(0, 1).map((column) => ({...column, width: 100}));
            let element;

            element = render(<ReactTable {...baseProps} columns={modifiedColumns} />);

            spyOn(element.table, 'regenerate');

            element.table.columns[0].width = 300;

            const furtherModifiedColumns = [
                {...columns[0], width: 300},
            ];

            element = render(<ReactTable {...baseProps} columns={furtherModifiedColumns} />);

            expect(element.table.regenerate).not.toHaveBeenCalled();
        });

        it('only occurs once when given `props.jumpToRowIndex`', () => {
            let element;

            element = render(<ReactTable {...baseProps} />);

            sandbox.stub(element.table, 'regenerate');

            element = render(<ReactTable {...baseProps} jumpToRowIndex={9} />);
            expect(element.table.regenerate.calledOnce).toBe(true);
        });
    });
});