/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UICheckboxGroup from '../../UICheckboxGroup';
import conformanceChecker from '../../UIUtils/conform';

import sinon from 'sinon';

describe('UICheckboxGroup', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const items = [{
        label: 'Male',
        name: 'gender-male',
        checked: false
    }, {
        label: 'Female',
        name: 'gender-female',
        checked: false
    }, {
        label: 'Other',
        name: 'gender-other',
        checked: false
    }];

    const checkedItems = items.map(item => {
        return {...item, checked: true};
    });

    const mixedItems = items.map((item, index) => {
        return {...item, checked: !!(index % 2)};
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UICheckboxGroup));

    describe('accepts', () => {
        it('an array of properly structured items', () => {
            const element = render(<UICheckboxGroup items={items} />);
            const node = element.refs.group;

            expect(node).not.toBe(null);
        });

        it('arbitrary React-supported HTML attributes via prop.selectAllProps', () => {
            const element = render(<UICheckboxGroup selectAll={true} selectAllProps={{'data-id': 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes as a string without replacing the core hook', () => {
            const element = render(<UICheckboxGroup className='foo bar' />);
            const node = element.refs.group;

            ['ui-checkbox-group', 'foo', 'bar'].forEach(cname => expect(node.classList.contains(cname)).toBe(true));
        });
    });

    describe('CSS hook', () => {
        it('ui-checkbox-group should be rendered', () => {
            const element = render(<UICheckboxGroup items={items} />);
            const node = element.refs.group;

            expect(node.classList.contains('ui-checkbox-group')).toBe(true);
        });

        it('ui-checkbox-group-selectall should be rendered', () => {
            const element = render(<UICheckboxGroup items={items} selectAll={true} />);

            expect(ReactDOM.findDOMNode(element.refs.select_all).classList.contains('ui-checkbox-group-selectall')).toBe(true);
        });
    });

    describe('select all', () => {
        it('should not render if `selectAll` is falsy', () => {
            const element = render(<UICheckboxGroup items={items} />);

            expect(element.refs.select_all).toBe(undefined);
        });

        it('should render if `selectAll` is truthy', () => {
            const element = render(<UICheckboxGroup items={items} selectAll={true} />);
            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node).not.toBe(null);
        });

        it('should render in the first position by default', () => {
            const element = render(<UICheckboxGroup items={items} selectAll={true} />);
            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node.parentNode.children[0]).toBe(node);
        });

        it('should render in the last position if passed the appropriate `selectAllPosition`', () => {
            const element = render(
                <UICheckboxGroup items={items}
                                 selectAll={true}
                                 selectAllPosition={UICheckboxGroup.Constants.SELECT_ALL_AFTER} />
            );

            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node.parentNode.children[3]).toBe(node);
        });

        it('should check all children', () => {
            const stub = sandbox.stub();
            const element = render(
                <UICheckboxGroup items={items}
                                 selectAll={true}
                                 onAllChecked={stub} />
            );

            element.refs.select_all.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('should uncheck all children', () => {
            const stub = sandbox.stub();
            const element = render(
                <UICheckboxGroup items={checkedItems}
                                 selectAll={true}
                                 onAllUnchecked={stub} />
            );

            element.refs.select_all.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('should be indeterminate if children are in different checked states', () => {
            const element = render(
                <UICheckboxGroup items={mixedItems}
                                 selectAll={true} />
            );

            expect(element.refs.select_all.props.indeterminate).toBe(true);
        });

        it('should make all children checked if clicked in indeterminate state', () => {
            const stub = sandbox.stub();
            const element = render(
                <UICheckboxGroup items={mixedItems}
                                 selectAll={true}
                                 onAllChecked={stub} />
            );

            element.refs.select_all.handleChange();

            expect(stub.calledOnce).toBe(true);
        });
    });
});
