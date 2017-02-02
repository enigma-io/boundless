/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Radio from './index';
import {conformanceChecker} from '../boundless-utils-test-helpers/index';

describe('Radio component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const baseProps = {name: 'foo', value: 'bar'};
    const event = {preventDefault: () => {}};

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Radio, baseProps));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputProps', () => {
            const element = render(<Radio {...baseProps} inputProps={{'data-id': 'foo'}} />);
            const node = element.refs.input;

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.inputProps.className', () => {
            const element = render(<Radio {...baseProps} inputProps={{className: 'foo'}} />);
            const node = element.refs.input;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('arbitrary HTML attributes via props.labelProps', () => {
            const element = render(<Radio {...baseProps} label='foo' labelProps={{'data-id': 'foo'}} />);

            expect(element.refs.label.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.labelProps.className', () => {
            const element = render(<Radio {...baseProps} label='foo' labelProps={{className: 'foo'}} />);
            const node = element.refs.label;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('a string label', () => {
            const element = render(<Radio {...baseProps} label='foo' />);

            expect(element.refs.label.textContent).toBe('foo');
        });

        it('an element label', () => {
            const element = render(<Radio {...baseProps} label={<p>foo</p>} />);

            expect(element.refs.label.textContent).toBe('foo');
        });
    });

    describe('CSS hook', () => {
        const hasClass = (dom, name) => dom.classList.contains(name);

        it('renders .b-radio-wrapper', () => {
            const element = render(<Radio {...baseProps} />);
            const node = element.refs.wrapper;

            expect(hasClass(node, 'b-radio-wrapper')).toBe(true);
        });

        it('renders .b-radio-label', () => {
            const element = render(<Radio {...baseProps} label='foo' />);

            expect(hasClass(element.refs.label, 'b-radio-label')).toBe(true);
        });

        it('renders .b-radio', () => {
            const element = render(<Radio {...baseProps} />);

            expect(hasClass(element.refs.input, 'b-radio')).toBe(true);
        });

        it('renders .b-radio-selected when `props.selected` is `true`', () => {
            const element = render(<Radio {...baseProps} selected={true} />);

            expect(hasClass(element.refs.input, 'b-radio-selected')).toBe(true);
        });

        it('does not render .b-radio-selected when `props.selected` is falsy', () => {
            const element = render(<Radio {...baseProps} />);

            expect(hasClass(element.refs.input, 'b-radio-selected')).toBe(false);
        });
    });

    describe('change events', () => {
        it('calls `props.onSelected` with the target\'s value if the target is `checked`', () => {
            const stub = sandbox.stub();
            const element = render(<Radio {...baseProps} onSelected={stub} />);

            element.handleChange({...event, target: {checked: true, value: 'x'}});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch('x')).toBe(true);
        });

        it('proxies to `props.inputProps.onChange` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<Radio {...baseProps} inputProps={{onChange: stub}} />);

            element.handleChange({...event, target: element.refs.input});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(event)).toBe(true);
        });
    });

    /*
        Needs this issue to be resolved in JSDOM to work:
        https://github.com/tmpvar/jsdom/issues/1079#issuecomment-159754855
     */
    describe('onSelected', () => {
        it('is called with the proper value', () => {
            const stub = sandbox.stub();
            const element = render(<Radio {...baseProps} onSelected={stub} />);

            element.refs.input.click();

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWith('bar')).toBe(true);
        });
    });

    /*
        Needs this issue to be resolved in JSDOM to work:
        https://github.com/tmpvar/jsdom/issues/1079#issuecomment-159754855
     */
    describe('clicking on the label', () => {
        it('triggers `onSelected` if `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<Radio {...baseProps} label='test' onSelected={stub} />);

            element.refs.label.click();

            expect(stub.calledOnce).toBe(true);
        });
    });
});
