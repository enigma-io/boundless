/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UIPaginatedView from '../../UIPaginatedView';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

const sandbox = sinon.sandbox.create();
const stub = sandbox.stub();

const items = [{"id":1,"first_name":"Louise","last_name":"Francisco","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":2,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":3,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":4,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":5,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":6,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":7,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":8,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":9,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":10,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"},{"id":11,"first_name":"Lorna","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":12,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":13,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":14,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":15,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":16,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":17,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":18,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":19,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":20,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"}];
const altItems = [{"id":1,"first_name":"Lorraine","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":2,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":3,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":4,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":5,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":6,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":7,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":8,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":9,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":10,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"},{"id":11,"first_name":"Laura","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":12,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":13,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":14,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":15,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":16,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":17,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":18,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":19,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":20,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"}];

const itemToJsx = data => {
    return (
        <div key={data.id} className={'test-class'} onClick={stub}>
            {data.first_name} {data.last_name}
        </div>
    )
};

// index 3 is for the ui-pagination-view-content-item-loading css hook test
const itemGetter = index => index === 3 ? new Promise(noop) : itemToJsx(items[index]);
const altItemGetter = index => index === 3 ? new Promise(noop) : itemToJsx(altItems[index]);


const baseProps = {
    getItem: itemGetter,
    identifier: 'testId',
    totalItems: items.length
};

describe('UIPaginatedView', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIPaginatedView, baseProps));

    describe('CSS hooks', () => {
        let element;

        beforeEach(() => element = render(<UIPaginatedView {...baseProps} />));

        it('ui-paginated-view should be rendered', () => {
            expect(element.refs.paginatedView.className).toContain('ui-paginated-view');
        });

        it('ui-paginated-view-item-list should be rendered', () => {
            expect(ReactDOM.findDOMNode(element.refs.itemList).className).toContain('ui-paginated-view-item-list');
        });

        it('ui-paginated-view-item should be rendered', () => {
            expect(ReactDOM.findDOMNode(element.refs.item_0).className).toContain('ui-paginated-view-item');
        });

        it('ui-paginated-view-item-even should be rendered', () => {
            expect(ReactDOM.findDOMNode(element.refs.item_0).className).toContain('ui-paginated-view-item-even');
        });

        it('ui-paginated-view-item-loading should be rendered', () => {
            expect(ReactDOM.findDOMNode(element.refs.item_3).className).toContain('ui-paginated-view-item-loading');
        });

        it('ui-paginated-view-item-odd should be rendered', () => {
            expect(ReactDOM.findDOMNode(element.refs.item_1).className).toContain('ui-paginated-view-item-odd');
        });

        it('ui-paginated-view-controls should be rendered', () => {
            expect(element.refs.segmentedControlAbove.props.className).toContain('ui-paginated-view-controls');
        });

        it('ui-paginated-view-controls-above should be rendered', () => {
            expect(element.refs.segmentedControlAbove.props.className).toContain('ui-paginated-view-controls-above');
        });

        it('ui-paginated-view-controls-below should be rendered', () => {
            let element = render(<UIPaginatedView {...baseProps} position={UIPaginatedView.position.BELOW} />);

            expect(element.refs.segmentedControlBelow.props.className).toContain('ui-paginated-view-controls-below');
        });

        it('ui-paginated-view-controls-above and ui-paginated-view-controls-below should be rendered', () => {
            let element = render(<UIPaginatedView {...baseProps} position={UIPaginatedView.position.BOTH} />);

            expect(element.refs.segmentedControlAbove.props.className).toContain('ui-paginated-view-controls-above');
            expect(element.refs.segmentedControlBelow.props.className).toContain('ui-paginated-view-controls-below');
        });

        it('ui-paginated-view-controls-first should be rendered', () => {
            expect(element.refs.segmentedControlAbove.refs['option_$0'].props.className).toContain('ui-paginated-view-controls-first');
        });

        it('ui-paginated-view-controls-previous should be rendered', () => {
            expect(element.refs.segmentedControlAbove.refs['option_$1'].props.className).toContain('ui-paginated-view-controls-previous');
        });

        it('ui-paginated-view-controls-next should be rendered', () => {
            expect(element.refs.segmentedControlAbove.refs['option_$4'].props.className).toContain('ui-paginated-view-controls-next');
        });

        it('ui-paginated-view-controls-last should be rendered', () => {
            expect(element.refs.segmentedControlAbove.refs['option_$5'].props.className).toContain('ui-paginated-view-controls-last');
        });

        it('ui-paginated-view-wrapper should be rendered', () => {
            expect(element.refs.wrapper.className).toContain('ui-paginated-view-wrapper');
        });
    });

    describe('items', () => {
        let element;

        beforeEach(() => element = render(
                <UIPaginatedView {...baseProps}
                                 toggleWrapperProps={{className:'test-wrapper-class'}}
                                 listWrapperProps={{className:'test-list-class'}} />
            )
        );

        it('items should be rendered properly with the correct text', () => {
            let name = ReactDOM.findDOMNode(element.refs.item_0).textContent;

            expect(name).toBe('Louise Francisco');
        });

        it('items should not lose original props', () => {
            let className = ReactDOM.findDOMNode(element.refs.item_0).className;

            expect(className).toContain('test-class');
        });

        it('toggleWrapperProps should be passed to toggle', () => {
            let className = element.refs.segmentedControlAbove.props.className;

           expect(className).toContain('test-wrapper-class');
        });

        it('listWrapperProps should be passed to list', () => {
            let className = element.refs.itemList.props.className;

            expect(className).toContain('test-list-class');
        });

        it('items should not lose original event handlers', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.item_0));

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('currentPage', () => {
        it('should return the number of the currently visible page', () => {
            const element = render(<UIPaginatedView {...baseProps} numItemsPerPage={2} pagerPosition={2} />);

            element.handleClick(3);

            expect(element.currentPage()).toEqual(3);
        });
    });

    describe('click functionality', () => {
        let element;

        beforeEach(() => element = render(<UIPaginatedView {...baseProps} numItemsPerPage={2} pagerPosition={3} />));

        it('clicking First button should display first page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$0']));

            expect(element.currentPage()).toEqual(1);
        });

        it('clicking Previous button should display previous page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$1']));

            expect(element.currentPage()).toEqual(2);
        });

        it('clicking Next button should display next page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$7']));

            expect(element.currentPage()).toEqual(4);
        });

        it('clicking Last button should display last page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$8']));

            expect(element.currentPage()).toEqual(10);
        });

        it('clicking a page number button should display that page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$3']));

            expect(element.currentPage()).toEqual(2);
        });

        it('First button should do nothing when on first page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$0']));
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$0']));

            expect(element.currentPage()).toEqual(1);
        });

        it('Previous button should do nothing when on first page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$0']));
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$1']));

            expect(element.currentPage()).toEqual(1);
        });

        it('Next button should do nothing when on last page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$8']));
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$7']));

            expect(element.currentPage()).toEqual(10);
        });

        it('Last button should do nothing when on last page', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$8']));
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$8']));

            expect(element.currentPage()).toEqual(10);
        });

        it('clicking a toggle should focus the first item in the resulting content list', () => {
            Simulate.click(ReactDOM.findDOMNode(element.refs.segmentedControlAbove.refs['option_$3']));

            expect(document.activeElement).toEqual(ReactDOM.findDOMNode(element.refs.item_0));
        });
    });

    describe('identifier', () => {
        it('passing new identifier and backing data should reset component to page 1 with new data', () => {
            let element = render(<UIPaginatedView {...baseProps} pagerPosition={2} />);

            expect(ReactDOM.findDOMNode(element.refs.item_0).textContent).toBe('Lorna Fernandez');

            element = render(<UIPaginatedView identifier='newId' getItem={altItemGetter} totalItems={altItems.length} />);

            expect(element.currentPage()).toEqual(1);
            expect(ReactDOM.findDOMNode(element.refs.item_0).textContent).toBe('Lorraine Fernandez');
        });
    });

    describe('pagerPosition', () => {
        let element;

        beforeEach(() => element = render(<UIPaginatedView {...baseProps} pagerPosition={2} />));

        it('start page number should equal pagerPosition', () => {
            expect(element.currentPage()).toEqual(2);
        });
    });

    describe('showJumpToFirst', () => {
        let element;

        beforeEach(() => element = render(<UIPaginatedView {...baseProps} showJumpToFirst={false} />));

        it('showJumpToFirst should control display of First button', () => {
            expect(element.refs.controlFirst).toBe(undefined);
        });
    });

    describe('showJumpToLast', () => {
        let element;

        beforeEach(() => element = render(<UIPaginatedView {...baseProps} showJumpToLast={false} />));

        it('showJumpToLast should control display of Last button', () => {
            expect(element.refs.controlLast).toBe(undefined);
        });
    });

    describe('numItemsPerPage', () => {
        let element;

        beforeEach(() => element = render(<UIPaginatedView {...baseProps} numItemsPerPage={2} />));

        it('number of items displayed per page should equal numItemsPerPage', () => {
            expect(ReactDOM.findDOMNode(element.refs.itemList).children.length).toEqual(2);
        });
    });

    describe('numPageToggles', () => {
        let element;

        beforeEach(() => element = render(<UIPaginatedView {...baseProps} numItemsPerPage={2} numPageToggles={3} />));

        it('number of page toggles should equal numPageToggles', () => {
            expect(element.refs.segmentedControlAbove.props.options.length - 4).toEqual(3);
        });
    });
});
