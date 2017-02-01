/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';
import sinon from 'sinon';
import {noop} from 'lodash';

import Pagination from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

const dom = ReactDOM.findDOMNode;
const sandbox = sinon.sandbox.create();
const stub = sandbox.stub();

const items = [{'id': 1, 'first_name': 'Louise', 'last_name': 'Francisco', 'job_title': 'Database Administrator I', 'phone': '6-(697)972-8601', 'email': 'lfernandez1@opera.com', 'address1': '5049 Barnett Road', 'city': 'Nglengkir', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 2, 'first_name': 'Dennis', 'last_name': 'Nichols', 'job_title': 'Nurse', 'phone': '9-(896)552-6623', 'email': 'dnichols0@ycombinator.com', 'address1': '0 Drewry Drive', 'city': 'Canggetelo', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 3, 'first_name': 'Stephen', 'last_name': 'Hamilton', 'job_title': 'Dental Hygienist', 'phone': '1-(274)517-4270', 'email': 'shamilton2@amazon.co.jp', 'address1': '11 David Crossing', 'city': 'Kotabaru', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 4, 'first_name': 'Shawn', 'last_name': 'Richards', 'job_title': 'Librarian', 'phone': '1-(173)205-8062', 'email': 'srichards3@4shared.com', 'address1': '47533 Sherman Street', 'city': 'Viengxay', 'country': 'Laos', 'country_code': 'LA'}, {'id': 5, 'first_name': 'John', 'last_name': 'Hansen', 'job_title': 'Staff Scientist', 'phone': '5-(650)401-5661', 'email': 'jhansen4@sfgate.com', 'address1': '955 Jackson Park', 'city': 'South Tangerang', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 6, 'first_name': 'Ronald', 'last_name': 'Alexander', 'job_title': 'Structural Engineer', 'phone': '7-(675)732-2723', 'email': 'ralexander5@usgs.gov', 'address1': '0858 Hooker Court', 'city': 'Kardítsa', 'country': 'Greece', 'country_code': 'GR'}, {'id': 7, 'first_name': 'Shawn', 'last_name': 'Myers', 'job_title': 'Executive Secretary', 'phone': '0-(903)830-7054', 'email': 'smyers6@addtoany.com', 'address1': '69605 Rusk Junction', 'city': 'Erpeldange', 'country': 'Luxembourg', 'country_code': 'LU'}, {'id': 8, 'first_name': 'Andrew', 'last_name': 'Hill', 'job_title': 'Research Nurse', 'phone': '9-(825)250-8207', 'email': 'ahill7@sohu.com', 'address1': '4 Lunder Junction', 'city': 'Naji', 'country': 'China', 'country_code': 'CN'}, {'id': 9, 'first_name': 'Susan', 'last_name': 'Fowler', 'job_title': 'Product Engineer', 'phone': '2-(891)897-3096', 'email': 'sfowler8@addtoany.com', 'address1': '17 Artisan Pass', 'city': 'Oslomej', 'country': 'Macedonia', 'country_code': 'MK'}, {'id': 10, 'first_name': 'Denise', 'last_name': 'Gonzalez', 'job_title': 'Associate Professor', 'phone': '7-(665)859-5877', 'email': 'dgonzalez9@answers.com', 'address1': '8538 Sage Hill', 'city': 'Baiima', 'country': 'Sierra Leone', 'country_code': 'SL'}, {'id': 11, 'first_name': 'Lorna', 'last_name': 'Fernandez', 'job_title': 'Database Administrator I', 'phone': '6-(697)972-8601', 'email': 'lfernandez1@opera.com', 'address1': '5049 Barnett Road', 'city': 'Nglengkir', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 12, 'first_name': 'Dennis', 'last_name': 'Nichols', 'job_title': 'Nurse', 'phone': '9-(896)552-6623', 'email': 'dnichols0@ycombinator.com', 'address1': '0 Drewry Drive', 'city': 'Canggetelo', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 13, 'first_name': 'Stephen', 'last_name': 'Hamilton', 'job_title': 'Dental Hygienist', 'phone': '1-(274)517-4270', 'email': 'shamilton2@amazon.co.jp', 'address1': '11 David Crossing', 'city': 'Kotabaru', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 14, 'first_name': 'Shawn', 'last_name': 'Richards', 'job_title': 'Librarian', 'phone': '1-(173)205-8062', 'email': 'srichards3@4shared.com', 'address1': '47533 Sherman Street', 'city': 'Viengxay', 'country': 'Laos', 'country_code': 'LA'}, {'id': 15, 'first_name': 'John', 'last_name': 'Hansen', 'job_title': 'Staff Scientist', 'phone': '5-(650)401-5661', 'email': 'jhansen4@sfgate.com', 'address1': '955 Jackson Park', 'city': 'South Tangerang', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 16, 'first_name': 'Ronald', 'last_name': 'Alexander', 'job_title': 'Structural Engineer', 'phone': '7-(675)732-2723', 'email': 'ralexander5@usgs.gov', 'address1': '0858 Hooker Court', 'city': 'Kardítsa', 'country': 'Greece', 'country_code': 'GR'}, {'id': 17, 'first_name': 'Shawn', 'last_name': 'Myers', 'job_title': 'Executive Secretary', 'phone': '0-(903)830-7054', 'email': 'smyers6@addtoany.com', 'address1': '69605 Rusk Junction', 'city': 'Erpeldange', 'country': 'Luxembourg', 'country_code': 'LU'}, {'id': 18, 'first_name': 'Andrew', 'last_name': 'Hill', 'job_title': 'Research Nurse', 'phone': '9-(825)250-8207', 'email': 'ahill7@sohu.com', 'address1': '4 Lunder Junction', 'city': 'Naji', 'country': 'China', 'country_code': 'CN'}, {'id': 19, 'first_name': 'Susan', 'last_name': 'Fowler', 'job_title': 'Product Engineer', 'phone': '2-(891)897-3096', 'email': 'sfowler8@addtoany.com', 'address1': '17 Artisan Pass', 'city': 'Oslomej', 'country': 'Macedonia', 'country_code': 'MK'}, {'id': 20, 'first_name': 'Denise', 'last_name': 'Gonzalez', 'job_title': 'Associate Professor', 'phone': '7-(665)859-5877', 'email': 'dgonzalez9@answers.com', 'address1': '8538 Sage Hill', 'city': 'Baiima', 'country': 'Sierra Leone', 'country_code': 'SL'}];
const altItems = [{'id': 1, 'first_name': 'Lorraine', 'last_name': 'Fernandez', 'job_title': 'Database Administrator I', 'phone': '6-(697)972-8601', 'email': 'lfernandez1@opera.com', 'address1': '5049 Barnett Road', 'city': 'Nglengkir', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 2, 'first_name': 'Dennis', 'last_name': 'Nichols', 'job_title': 'Nurse', 'phone': '9-(896)552-6623', 'email': 'dnichols0@ycombinator.com', 'address1': '0 Drewry Drive', 'city': 'Canggetelo', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 3, 'first_name': 'Stephen', 'last_name': 'Hamilton', 'job_title': 'Dental Hygienist', 'phone': '1-(274)517-4270', 'email': 'shamilton2@amazon.co.jp', 'address1': '11 David Crossing', 'city': 'Kotabaru', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 4, 'first_name': 'Shawn', 'last_name': 'Richards', 'job_title': 'Librarian', 'phone': '1-(173)205-8062', 'email': 'srichards3@4shared.com', 'address1': '47533 Sherman Street', 'city': 'Viengxay', 'country': 'Laos', 'country_code': 'LA'}, {'id': 5, 'first_name': 'John', 'last_name': 'Hansen', 'job_title': 'Staff Scientist', 'phone': '5-(650)401-5661', 'email': 'jhansen4@sfgate.com', 'address1': '955 Jackson Park', 'city': 'South Tangerang', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 6, 'first_name': 'Ronald', 'last_name': 'Alexander', 'job_title': 'Structural Engineer', 'phone': '7-(675)732-2723', 'email': 'ralexander5@usgs.gov', 'address1': '0858 Hooker Court', 'city': 'Kardítsa', 'country': 'Greece', 'country_code': 'GR'}, {'id': 7, 'first_name': 'Shawn', 'last_name': 'Myers', 'job_title': 'Executive Secretary', 'phone': '0-(903)830-7054', 'email': 'smyers6@addtoany.com', 'address1': '69605 Rusk Junction', 'city': 'Erpeldange', 'country': 'Luxembourg', 'country_code': 'LU'}, {'id': 8, 'first_name': 'Andrew', 'last_name': 'Hill', 'job_title': 'Research Nurse', 'phone': '9-(825)250-8207', 'email': 'ahill7@sohu.com', 'address1': '4 Lunder Junction', 'city': 'Naji', 'country': 'China', 'country_code': 'CN'}, {'id': 9, 'first_name': 'Susan', 'last_name': 'Fowler', 'job_title': 'Product Engineer', 'phone': '2-(891)897-3096', 'email': 'sfowler8@addtoany.com', 'address1': '17 Artisan Pass', 'city': 'Oslomej', 'country': 'Macedonia', 'country_code': 'MK'}, {'id': 10, 'first_name': 'Denise', 'last_name': 'Gonzalez', 'job_title': 'Associate Professor', 'phone': '7-(665)859-5877', 'email': 'dgonzalez9@answers.com', 'address1': '8538 Sage Hill', 'city': 'Baiima', 'country': 'Sierra Leone', 'country_code': 'SL'}, {'id': 11, 'first_name': 'Laura', 'last_name': 'Fernandez', 'job_title': 'Database Administrator I', 'phone': '6-(697)972-8601', 'email': 'lfernandez1@opera.com', 'address1': '5049 Barnett Road', 'city': 'Nglengkir', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 12, 'first_name': 'Dennis', 'last_name': 'Nichols', 'job_title': 'Nurse', 'phone': '9-(896)552-6623', 'email': 'dnichols0@ycombinator.com', 'address1': '0 Drewry Drive', 'city': 'Canggetelo', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 13, 'first_name': 'Stephen', 'last_name': 'Hamilton', 'job_title': 'Dental Hygienist', 'phone': '1-(274)517-4270', 'email': 'shamilton2@amazon.co.jp', 'address1': '11 David Crossing', 'city': 'Kotabaru', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 14, 'first_name': 'Shawn', 'last_name': 'Richards', 'job_title': 'Librarian', 'phone': '1-(173)205-8062', 'email': 'srichards3@4shared.com', 'address1': '47533 Sherman Street', 'city': 'Viengxay', 'country': 'Laos', 'country_code': 'LA'}, {'id': 15, 'first_name': 'John', 'last_name': 'Hansen', 'job_title': 'Staff Scientist', 'phone': '5-(650)401-5661', 'email': 'jhansen4@sfgate.com', 'address1': '955 Jackson Park', 'city': 'South Tangerang', 'country': 'Indonesia', 'country_code': 'ID'}, {'id': 16, 'first_name': 'Ronald', 'last_name': 'Alexander', 'job_title': 'Structural Engineer', 'phone': '7-(675)732-2723', 'email': 'ralexander5@usgs.gov', 'address1': '0858 Hooker Court', 'city': 'Kardítsa', 'country': 'Greece', 'country_code': 'GR'}, {'id': 17, 'first_name': 'Shawn', 'last_name': 'Myers', 'job_title': 'Executive Secretary', 'phone': '0-(903)830-7054', 'email': 'smyers6@addtoany.com', 'address1': '69605 Rusk Junction', 'city': 'Erpeldange', 'country': 'Luxembourg', 'country_code': 'LU'}, {'id': 18, 'first_name': 'Andrew', 'last_name': 'Hill', 'job_title': 'Research Nurse', 'phone': '9-(825)250-8207', 'email': 'ahill7@sohu.com', 'address1': '4 Lunder Junction', 'city': 'Naji', 'country': 'China', 'country_code': 'CN'}, {'id': 19, 'first_name': 'Susan', 'last_name': 'Fowler', 'job_title': 'Product Engineer', 'phone': '2-(891)897-3096', 'email': 'sfowler8@addtoany.com', 'address1': '17 Artisan Pass', 'city': 'Oslomej', 'country': 'Macedonia', 'country_code': 'MK'}, {'id': 20, 'first_name': 'Denise', 'last_name': 'Gonzalez', 'job_title': 'Associate Professor', 'phone': '7-(665)859-5877', 'email': 'dgonzalez9@answers.com', 'address1': '8538 Sage Hill', 'city': 'Baiima', 'country': 'Sierra Leone', 'country_code': 'SL'}];

const itemToJSX = (data) => {
    return (
        <div key={data.id} className='test-class' onClick={stub}>
            {data.first_name} {data.last_name}
        </div>
    );
};

// index 3 is for the b-pagination-view-content-item-loading css hook test
const itemGetter = (index) => index === 3 ? new Promise(noop) : itemToJSX(items[index]);
const altItemGetter = (index) => index === 3 ? new Promise(noop) : itemToJSX(altItems[index]);
const nonJSXItemGetter = (index) => index === 3 ? new Promise(noop) : items[index];

const baseProps = {
    customControlContent: 'foo',
    getItem: itemGetter,
    identifier: 'testId',
    showPaginationState: true,
    totalItems: items.length,
};

describe('Pagination component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => {
        conformanceChecker(render, Pagination, baseProps);
    });

    describe('CSS hooks', () => {
        beforeEach(() => render(<Pagination {...baseProps} />));

        it('b-pagination is rendered', () => {
            expect(document.querySelector('.b-pagination')).not.toBe(null);
        });

        it('b-pagination-items is rendered', () => {
            expect(document.querySelector('.b-pagination-items')).not.toBe(null);
        });

        it('b-pagination-item is rendered', () => {
            expect(document.querySelector('.b-pagination-item')).not.toBe(null);
        });

        it('b-pagination-item-even is rendered', () => {
            expect(document.querySelector('.b-pagination-item-even')).not.toBe(null);
        });

        it('b-pagination-item-odd is rendered', () => {
            expect(document.querySelector('.b-pagination-item-odd')).not.toBe(null);
        });

        it('b-pagination-controls is rendered', () => {
            expect(document.querySelector('.b-pagination-controls')).not.toBe(null);
        });

        it('b-pagination-controls-above is rendered', () => {
            expect(document.querySelector('.b-pagination-controls-above')).not.toBe(null);
        });

        it('b-pagination-controls-below is rendered', () => {
            render(<Pagination {...baseProps} position={Pagination.positions.BELOW} />);
            expect(document.querySelector('.b-pagination-controls-below')).not.toBe(null);
        });

        it('b-pagination-controls-above and b-pagination-controls-below is rendered if `props.position` is set to BOTH', () => {
            render(<Pagination {...baseProps} position={Pagination.positions.BOTH} />);
            expect(document.querySelector('.b-pagination-controls-above')).not.toBe(null);
            expect(document.querySelector('.b-pagination-controls-below')).not.toBe(null);
        });

        it('b-pagination-control-state is rendered', () => {
            expect(document.querySelector('.b-pagination-control-state')).not.toBe(null);
        });

        it('b-pagination-control-first is rendered', () => {
            expect(document.querySelector('.b-pagination-control-first')).not.toBe(null);
        });

        it('b-pagination-control-previous is rendered', () => {
            expect(document.querySelector('.b-pagination-control-previous')).not.toBe(null);
        });

        it('b-pagination-control-next is rendered', () => {
            expect(document.querySelector('.b-pagination-control-next')).not.toBe(null);
        });

        it('b-pagination-control-last is rendered', () => {
            expect(document.querySelector('.b-pagination-control-last')).not.toBe(null);
        });

        it('b-pagination-control is rendered', () => {
            expect(document.querySelector('.b-pagination-control')).not.toBe(null);
        });

        it('b-pagination-control-custom is rendered', () => {
            expect(document.querySelector('.b-pagination-control-custom')).not.toBe(null);
        });

        it('b-pagination-wrapper is rendered', () => {
            expect(document.querySelector('.b-pagination-wrapper')).not.toBe(null);
        });
    });

    describe('itemLoadingContent', () => {
        it('injects custom content into loading pagination items', () => {
            render(
                <Pagination
                    getItem={() => new Promise(() => {})}
                    identifier='newId'
                    itemLoadingContent={<div className='foo-loading' />}
                    totalItems={1} />
            );

            expect(document.querySelector('.foo-loading')).not.toBe(null);
        });
    });

    describe('itemToJSXConverterFunc', () => {
        const newItemToJSX = (data) => {
            return (
                <div key={data.id} className='test-class' onClick={sandbox.stub()}>
                    {data.first_name} {data.last_name}
                </div>
            );
        };

        it('receives the object data as the first argument', () => {
            const spy = sandbox.spy(newItemToJSX);

            render(
                <Pagination
                    getItem={nonJSXItemGetter}
                    identifier='newId'
                    itemToJSXConverterFunc={spy}
                    totalItems={items.length} />
            );

            expect(spy.calledWithMatch(nonJSXItemGetter(0))).toBe(true);
        });
    });

    describe('JSX items', () => {
        let element;

        beforeEach(() => {
            element = render(
                <Pagination
                    {...baseProps}
                    toggleWrapperProps={{className: 'test-wrapper-class'}}
                    listWrapperProps={{className: 'test-list-class'}} />
            );
        });

        it('renders properly, with the correct text', () => {
            expect(dom(element.refs.item_0).textContent).toBe('Louise Francisco');
        });

        it('retains original props', () => {
            expect(dom(element.refs.item_0).className).toContain('test-class');
        });

        it('toggleWrapperProps is passed to toggle', () => {
            let className = element.refs.segmentedControlAbove.props.className;
            expect(className).toContain('test-wrapper-class');
        });

        it('listWrapperProps is passed to list', () => {
            let className = element.refs.itemList.props.className;
            expect(className).toContain('test-list-class');
        });

        it('does not lose original event handlers', () => {
            Simulate.click(dom(element.refs.item_0));
            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('non-JSX items', () => {
        const clickStub = sandbox.stub();
        const focusStub = sandbox.stub();
        const keyDownStub = sandbox.stub();
        let element;

        const newItemToJSX = (data) => {
            return (
                <div key={data.id} className='test-class' onClick={clickStub} onFocus={focusStub} onKeyDown={keyDownStub}>
                    {data.first_name} {data.last_name}
                </div>
            );
        };

        beforeEach(() => {
            element = render(
                <Pagination
                    getItem={nonJSXItemGetter}
                    identifier='newId'
                    itemToJSXConverterFunc={newItemToJSX}
                    totalItems={items.length} />
            );
        });

        it('renders properly, with the correct text', () => {
            expect(dom(element.refs.item_0).textContent).toBe('Louise Francisco');
        });

        it('retains original props', () => {
            expect(dom(element.refs.item_0).className).toContain('test-class');
        });

        it('does not lose original event handlers', () => {
            Simulate.click(dom(element.refs.item_0));
            Simulate.focus(dom(element.refs.item_0));
            Simulate.keyDown(dom(element.refs.item_0));
            expect(clickStub.calledOnce).toBe(true);
            expect(focusStub.calledOnce).toBe(true);
            expect(keyDownStub.calledOnce).toBe(true);
        });

        it('does not call itemToJSXConverterFunc on the original promise resolved value if the given promise has changed', () => {
            ReactDOM.unmountComponentAtNode(mountNode);

            const promise1ResolveValue = 'foo';
            const promise2ResolveValue = 'bar';

            let firstResolver;
            let secondResolver;

            const converter = sandbox.spy((x) => <div>{x}</div>);
            const getter = sandbox.spy(() => {
                return new Promise((resolve) => {
                    if (!firstResolver) {
                        firstResolver = resolve;
                    } else {
                        secondResolver = resolve;
                    }
                });
            });  // each call of getter() creates a new promise

            element = render(
                <Pagination
                    getItem={getter}
                    identifier='newId'
                    itemToJSXConverterFunc={converter}
                    totalItems={1} />
            );

            expect(converter.called).toBe(false);

            element = render(
                <Pagination
                    getItem={getter}
                    identifier='newId2'
                    itemToJSXConverterFunc={converter}
                    totalItems={1} />
            );

            expect(converter.called).toBe(false);
            expect(getter.calledTwice).toBe(true);

            firstResolver(promise1ResolveValue);    // should not work
            secondResolver(promise2ResolveValue);   // should work

            return Promise.resolve().then(() => {
                // expect(converter.calledOnce).toBe(true);
                expect(converter.calledWithMatch(promise2ResolveValue)).toBe(true);
            });
        });

        it('does not call itemToJSXConverterFunc if the component has been unmounted when the promise resolves', () => {
            ReactDOM.unmountComponentAtNode(mountNode);

            let resolver;

            const converter = sandbox.stub().returns((x) => <div>{x}</div>);
            const getter = () => new Promise((resolve) => (resolver = resolve));

            element = render(
                <Pagination
                    getItem={getter}
                    identifier='newId'
                    itemToJSXConverterFunc={converter}
                    totalItems={1} />
            );

            expect(converter.called).toBe(false);

            ReactDOM.unmountComponentAtNode(mountNode);
            resolver('foo');

            // needs to be async to occur after the first promise has resolved
            return Promise.resolve().then(() => expect(converter.called).toBe(false));
        });
    });

    describe('currentPage', () => {
        it('returns the (1-indexed) number of the currently visible page', () => {
            const element = render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    initialPage={2} />
            );

            element.handleClick(3);
            expect(element.currentPage()).toEqual(3);
        });
    });

    describe('pageToIndex', () => {
        it('loads the page that contains the (0-indexed) item', () => {
            const element = render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    initialPage={2} />
            );

            element.pageToIndex(0);
            expect(element.currentPage()).toEqual(1);
        });

        it('noop if called with invalid item index', () => {
            const element = render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    initialPage={2} />
            );

            element.pageToIndex(-1);
            expect(element.currentPage()).toEqual(2);

            element.pageToIndex(items.length);
            expect(element.currentPage()).toEqual(2);
        });
    });

    describe('click functionality', () => {
        let element;

        beforeEach(() => {
            element = render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    initialPage={3} />
            );
        });

        describe('"first" control', () => {
            it('displays the first page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-first'));
                expect(element.currentPage()).toEqual(1);
            });

            it('does nothing when on first page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-first'));
                expect(element.currentPage()).toEqual(1);

                Simulate.click(document.querySelector('.b-pagination-control-first'));
                expect(element.currentPage()).toEqual(1);
            });
        });

        describe('"last" control', () => {
            it('displays the last page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-last'));
                expect(element.currentPage()).toEqual(10);
            });

            it('does nothing when on the last page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-last'));
                expect(element.currentPage()).toEqual(10);

                Simulate.click(document.querySelector('.b-pagination-control-last'));
                expect(element.currentPage()).toEqual(10);
            });
        });

        describe('"previous" control', () => {
            it('displays the previous page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-previous'));
                expect(element.currentPage()).toEqual(2);
            });

            it('does nothing when on the first page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-first'));
                expect(element.currentPage()).toEqual(1);

                Simulate.click(document.querySelector('.b-pagination-control-previous'));
                expect(element.currentPage()).toEqual(1);
            });
        });

        describe('"next" control', () => {
            it('displays the next page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-next'));
                expect(element.currentPage()).toEqual(4);
            });

            it('does nothing when on the last page', () => {
                expect(element.currentPage()).toEqual(3);

                Simulate.click(document.querySelector('.b-pagination-control-last'));
                expect(element.currentPage()).toEqual(10);

                Simulate.click(document.querySelector('.b-pagination-control-next'));
                expect(element.currentPage()).toEqual(10);
            });
        });

        describe('numerical controls', () => {
            it('displays that page', () => {
                Simulate.click(document.querySelector('.b-pagination-control[data-page-number="4"]'));
                expect(element.currentPage()).toEqual(4);
            });
        });

        it('focuses the first item in the resulting content list', () => {
            Simulate.click(document.querySelector('.b-pagination-control[data-page-number="4"]'));
            expect(document.activeElement).toEqual(dom(element.refs.item_0));
        });
    });

    describe('identifier', () => {
        it('resets the view when changed', () => {
            let element;

            element = render(<Pagination {...baseProps} />);
            expect(dom(element.refs.item_0).textContent).toBe('Louise Francisco');

            element = render(
                <Pagination
                    {...baseProps}
                    getItem={altItemGetter}
                    identifier='someOtherId'
                    totalItems={altItems.length} />
            );

            expect(element.currentPage()).toEqual(1);
            expect(dom(element.refs.item_0).textContent).toBe('Lorraine Fernandez');
        });

        it('resets back to the first page when changed', () => {
            let element = render(<Pagination {...baseProps} initialPage={2} />);
            const currentContent = dom(element.refs.item_0).textContent;

            element = render(<Pagination {...baseProps} identifier='someOtherId' />);

            expect(element.currentPage()).toEqual(1);
            expect(dom(element.refs.item_0).textContent).not.toBe(currentContent);
        });
    });

    describe('customControlContent', () => {
        it('injects arbitrary content into a disabled control inside the wrapper', () => {
            render(
                <Pagination
                    {...baseProps}
                    customControlContent={<div className='foo' />} />
            );

            expect(document.querySelector('.b-pagination-control-custom .foo')).not.toBe(null);
        });
    });

    describe('initialPage', () => {
        it('controls the starting page of the rendered view', () => {
            const element = render(<Pagination {...baseProps} initialPage={2} />);
            expect(element.currentPage()).toEqual(2);
        });
    });

    describe('showJumpToFirst', () => {
        it('set as `true` renders the "first" control button', () => {
            render(<Pagination {...baseProps} showJumpToFirst={true} />);
            expect(document.querySelector('.b-pagination-control-first')).not.toBe(null);
        });

        it('set as `false` will not render the "first" control button', () => {
            render(<Pagination {...baseProps} showJumpToFirst={false} />);
            expect(document.querySelector('.b-pagination-control-fist')).toBe(null);
        });
    });

    describe('showJumpToLast', () => {
        it('set as `true` renders the "last" control button', () => {
            render(<Pagination {...baseProps} showJumpToLast={true} />);
            expect(document.querySelector('.b-pagination-control-last')).not.toBe(null);
        });

        it('set as `false` will not render the "last" control button', () => {
            render(<Pagination {...baseProps} showJumpToLast={false} />);
            expect(document.querySelector('.b-pagination-control-last')).toBe(null);
        });
    });

    describe('showPaginationState', () => {
        it('set as `true` renders the current page index and total number of pages', () => {
            render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    showPaginationState={true} />
            );

            expect(document.querySelector('.b-pagination-control-state').textContent).toEqual(`1 of ${Math.ceil(items.length / 2)}`);
        });

        it('set as `false` does not render the current page index and total number of pages', () => {
            render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    showPaginationState={false} />
            );

            expect(document.querySelector('.b-pagination-control-state')).toBe(null);
        });

        it('set as a function calls the given function with the current and total pages and renders returned JSX', () => {
            render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    showPaginationState={(currentPage, totalPages) => <span>foo {currentPage} bar {totalPages}</span>} />
            );

            expect(document.querySelector('.b-pagination-control-state').textContent).toEqual(`foo 1 bar ${Math.ceil(items.length / 2)}`);
        });
    });

    describe('numItemsPerPage', () => {
        it('controls the number of items rendered per page', () => {
            const element = render(<Pagination {...baseProps} numItemsPerPage={2} />);
            expect(dom(element.refs.itemList).children.length).toEqual(2);
        });

        it('keeps the first visible index in view if changed and the identifier remains the same', () => {
            // starting on page 2 with 2 items per page, so the significant index is index 2 (0, 1)
            let element = render(<Pagination {...baseProps} numItemsPerPage={2} initialPage={2} />);
            expect(dom(element).querySelector('[data-pagination-index="2"]')).not.toBe(null);

            element = render(<Pagination {...baseProps} numItemsPerPage={1} />);
            expect(dom(element).querySelector('[data-pagination-index="2"]')).not.toBe(null);
        });

        it('keeps the last paged-to index in view if the user has not paged backward or forward yet', () => {
            // starting on page 2 with 2 items per page, so the significant index is index 2 (0, 1)
            let element = render(<Pagination {...baseProps} numItemsPerPage={2} initialPage={2} />);
            expect(dom(element).querySelector('[data-pagination-index="2"]')).not.toBe(null);

            element.pageToIndex(4);
            expect(dom(element).querySelector('[data-pagination-index="4"]')).not.toBe(null);

            element = render(<Pagination {...baseProps} numItemsPerPage={1} />);
            expect(dom(element).querySelector('[data-pagination-index="4"]')).not.toBe(null);
        });

        it('keeps the first visible index in view if the user pages back/forward after programmatic pageToIndex()', () => {
            // starting on page 2 with 2 items per page, so the significant index is index 2 (0, 1)
            let element = render(<Pagination {...baseProps} numItemsPerPage={2} initialPage={2} />);
            expect(dom(element).querySelector('[data-pagination-index="2"]')).not.toBe(null);

            element.pageToIndex(4);
            expect(dom(element).querySelector('[data-pagination-index="4"]')).not.toBe(null);

            element.handleClick(Pagination.controls.NEXT);
            expect(dom(element).querySelector('[data-pagination-index="6"]')).not.toBe(null);

            element = render(<Pagination {...baseProps} numItemsPerPage={1} />);
            expect(dom(element).querySelector('[data-pagination-index="6"]')).not.toBe(null);

            element.handleClick(Pagination.controls.PREVIOUS);
            expect(dom(element).querySelector('[data-pagination-index="5"]')).not.toBe(null);
        });
    });

    describe('numPageToggles', () => {
        it('controls the amount of individual page controls rendered', () => {
            render(
                <Pagination
                    {...baseProps}
                    numItemsPerPage={2}
                    numPageToggles={3} />
            );

            const nodes = document.querySelectorAll('.b-pagination-control[data-page-number]');

            expect(nodes.length).toEqual(3);
        });
    });

    describe('hidePagerIfNotNeeded', () => {
        it('does not render the pager if total items are less than or equal to the requested number of items per page when set to `true`', () => {
            render(
                <Pagination
                    {...baseProps}
                    hidePagerIfNotNeeded={true}
                    numItemsPerPage={baseProps.totalItems}
                    numPageToggles={3} />
            );

            expect(document.querySelector('.b-pagination-controls')).toBe(null);
        });

        it('renders the pager if total items are less than or equal to the requested number of items per page when set to `false`', () => {
            render(
                <Pagination
                    {...baseProps}
                    hidePagerIfNotNeeded={false}
                    numItemsPerPage={baseProps.totalItems}
                    numPageToggles={3} />
            );

            expect(document.querySelector('.b-pagination-controls')).not.toBe(null);
        });
    });

    describe('"outside" elements', () => {
        it('allows rendering of arbitrary content before the items', () => {
            const element = render(
                <Pagination
                    {...baseProps}
                    before={<span className='foo' />}
                />
            );

            expect(dom(element).querySelector('.foo')).not.toBe(null);
        });

        it('allows rendering of arbitrary content after the items', () => {
            const element = render(
                <Pagination
                    {...baseProps}
                    after={<span className='foo' />}
                />
            );

            expect(dom(element).querySelector('.foo')).not.toBe(null);
        });
    });
});
