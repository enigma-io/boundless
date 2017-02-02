/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import CheckboxGroup from './index';
import {$, $$, conformanceChecker} from '../boundless-utils-test-helpers/index';

import sinon from 'sinon';

describe('CheckboxGroup component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const items = [{
        inputProps: {
            name: 'gender-male',
            checked: false,
        },
        label: 'Male',
    }, {
        inputProps: {
            name: 'gender-female',
            checked: false,
        },
        label: 'Female',
    }, {
        inputProps: {
            name: 'gender-other',
            checked: false,
        },
        label: 'Other',
    }];

    const checkedItems = items.map((item) => {
        return {...item, inputProps: {...item.inputProps, checked: true}};
    });

    const mixedItems = items.map((item, index) => {
        return {...item, inputProps: {...item.inputProps, checked: !!(index % 2)}};
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, CheckboxGroup));

    it('accepts an alternate wrapper HTML element type', () => {
        render(<CheckboxGroup component='section' items={items} />);
        expect($('section.b-checkbox-group')).not.toBeNull();
    });

    it('accepts an array of properly structured items', () => {
        render(<CheckboxGroup items={items} />);
        expect($$('.b-checkbox-wrapper:not(.b-checkbox-group-all) .b-checkbox').length).toBe(items.length);
    });

    it('accepts arbitrary React-supported HTML attributes via prop.selectAllProps', () => {
        render(<CheckboxGroup selectAllProps={{'data-id': 'foo'}} />);
        expect($('.b-checkbox-group-all[data-id="foo"]')).not.toBeNull();
    });

    describe('"select all" checkbox', () => {
        it('will not render if `selectAll` is `CheckboxGroup.selectAll.NONE`', () => {
            render(<CheckboxGroup items={items} selectAll={CheckboxGroup.selectAll.NONE} />);
            expect($('.b-checkbox-group-all')).toBeNull();
        });

        it('renders as the first child if `selectAll` is `CheckboxGroup.selectAll.BEFORE`', () => {
            render(<CheckboxGroup items={items} selectAll={CheckboxGroup.selectAll.BEFORE} />);
            expect($('.b-checkbox-group > *:first-child')).toBe($('.b-checkbox-group-all'));
        });

        it('renders in the last position if `selectAll` is `CheckboxGroup.selectAll.AFTER`', () => {
            render(<CheckboxGroup items={items} selectAll={CheckboxGroup.selectAll.AFTER} />);
            expect($('.b-checkbox-group > *:last-child')).toBe($('.b-checkbox-group-all'));
        });

        it('accepts a name passed by `selectAllProps.className`', () => {
            render(<CheckboxGroup items={items} selectAllProps={{className: 'foo'}} />);
            expect($('.b-checkbox-group-all.foo')).not.toBeNull();
        });

        it('accepts a name passed by `selectAllProps.inputProps.name`', () => {
            render(<CheckboxGroup items={items} selectAllProps={{inputProps: {name: 'foo'}}} />);
            expect($('.b-checkbox-group-all .b-checkbox[name="foo"]')).not.toBeNull();
        });

        it('checks all children', () => {
            const stub = sandbox.stub();

            render(<CheckboxGroup items={items} onAllChecked={stub} />);

            $('.b-checkbox-group-all .b-checkbox-unchecked').click();
            expect(stub.calledOnce).toBe(true);
        });

        it('unchecks all children', () => {
            const stub = sandbox.stub();

            render(<CheckboxGroup items={checkedItems} onAllUnchecked={stub} />);

            $('.b-checkbox-group-all .b-checkbox-checked').click();
            expect(stub.calledOnce).toBe(true);
        });

        it('is indeterminate if children are in different checked states', () => {
            render(<CheckboxGroup items={mixedItems} />);
            expect($('.b-checkbox-group-all .b-checkbox-mixed')).not.toBeNull();
        });

        it('makes all children checked if clicked in indeterminate state', () => {
            const stub = sandbox.stub();

            render(<CheckboxGroup items={mixedItems} onAllChecked={stub} />);

            $('.b-checkbox-group-all .b-checkbox-mixed').click();
            expect(stub.calledOnce).toBe(true);
        });

        it('renders a custom label if given', () => {
            render(<CheckboxGroup items={mixedItems} selectAllProps={{label: 'foo'}} />);
            expect($('.b-checkbox-group-all .b-checkbox-label')).not.toBeNull();
            expect($('.b-checkbox-group-all .b-checkbox-label').textContent).toBe('foo');
        });
    });
});
