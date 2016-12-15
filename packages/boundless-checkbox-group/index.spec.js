/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import CheckboxGroup from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

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

    it('accepts an array of properly structured items', () => {
        const element = render(<CheckboxGroup items={items} />);
        const node = element.refs.group;

        expect(node).not.toBe(null);
    });

    it('accepts arbitrary React-supported HTML attributes via prop.selectAllProps', () => {
        const element = render(<CheckboxGroup selectAll={true} selectAllProps={{'data-id': 'foo'}} />);
        const node = ReactDOM.findDOMNode(element.refs.select_all);

        expect(node.getAttribute('data-id')).toBe('foo');
    });

    it('accepts additional classes as a string without replacing the core hook', () => {
        const element = render(<CheckboxGroup className='foo bar' />);
        const node = element.refs.group;

        ['b-checkbox-group', 'foo', 'bar'].forEach((cname) => expect(node.classList.contains(cname)).toBe(true));
    });

    it('renders .b-checkbox-group', () => {
        const element = render(<CheckboxGroup items={items} />);
        const node = element.refs.group;

        expect(node.classList.contains('b-checkbox-group')).toBe(true);
    });

    it('renders .b-checkbox-group-selectall', () => {
        const element = render(<CheckboxGroup items={items} selectAll={true} />);

        expect(ReactDOM.findDOMNode(element.refs.select_all).classList.contains('b-checkbox-group-selectall')).toBe(true);
    });

    describe('select all', () => {
        it('will not render if `selectAll` is falsy', () => {
            const element = render(<CheckboxGroup items={items} />);

            expect(element.refs.select_all).toBe(undefined);
        });

        it('renders if `selectAll` is truthy', () => {
            const element = render(<CheckboxGroup items={items} selectAll={true} />);
            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node).not.toBe(null);
        });

        it('renders in the first position by default', () => {
            const element = render(<CheckboxGroup items={items} selectAll={true} />);
            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node.parentNode.children[0]).toBe(node);
        });

        it('renders in the last position if passed the appropriate `selectAllPosition`', () => {
            const element = render(
                <CheckboxGroup items={items}
                                 selectAll={true}
                                 selectAllPosition={CheckboxGroup.Constants.SELECT_ALL_AFTER} />
            );

            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node.parentNode.children[3]).toBe(node);
        });

        it('accepts a name passed by `selectAllProps.className`', () => {
            const element = render(<CheckboxGroup items={items} selectAll={true} selectAllProps={{className: 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.select_all);

            expect(node.className).toContain('foo');
        });

        it('accepts a name passed by `selectAllProps.inputProps.name`', () => {
            const element = render(
                <CheckboxGroup
                    items={items}
                    selectAll={true}
                    selectAllProps={{inputProps: {name: 'foo'}}} />
            );

            const node = ReactDOM.findDOMNode(element.refs.select_all.refs.input);

            expect(node.getAttribute('name')).toBe('foo');
        });

        it('checks all children', () => {
            const stub = sandbox.stub();
            const element = render(
                <CheckboxGroup items={items}
                                 selectAll={true}
                                 onAllChecked={stub} />
            );

            element.refs.select_all.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('unchecks all children', () => {
            const stub = sandbox.stub();
            const element = render(
                <CheckboxGroup items={checkedItems}
                                 selectAll={true}
                                 onAllUnchecked={stub} />
            );

            element.refs.select_all.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('is indeterminate if children are in different checked states', () => {
            const element = render(
                <CheckboxGroup items={mixedItems}
                                 selectAll={true} />
            );

            expect(element.refs.select_all.props.inputProps.indeterminate).toBe(true);
        });

        it('makes all children checked if clicked in indeterminate state', () => {
            const stub = sandbox.stub();
            const element = render(
                <CheckboxGroup items={mixedItems}
                                 selectAll={true}
                                 onAllChecked={stub} />
            );

            element.refs.select_all.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('renders a custom label if given', () => {
            const element = render(
                <CheckboxGroup
                    items={mixedItems}
                    selectAll={true}
                    selectAllProps={{label: 'foo'}} />
            );

            expect(element.refs.select_all.refs.label.textContent).toBe('foo');
        });
    });
});
