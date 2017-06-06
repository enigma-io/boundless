/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Checkbox from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Checkbox component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const props = {
        inputProps: {
            checked: false,
            name: 'foo',
            value: 'bar',
        },
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Checkbox, props));

    it('allows the wrapper component to be overridden with an html tagname', () => {
        render(<Checkbox {...props} component='section' />);
        expect($('section.b-checkbox-wrapper')).not.toBeNull();
    });

    it('defaults to being unchecked', () => {
        const element = render(<Checkbox {...props} />);
        const node = element.refs.input;

        expect(node.getAttribute('aria-checked')).toBe('false');
        expect(node.hasAttribute('checked')).toBe(false);
    });

    it('accepts arbitrary React-supported HTML attributes via the `inputProps` prop', () => {
        const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, 'data-id': 'foo' }} />);
        const node = element.refs.input;

        expect(node.getAttribute('data-id')).toBe('foo');
    });

    it('accepts arbitrary React-supported HTML attributes via the `labelProps` prop', () => {
        const element = render(<Checkbox {...props} labelProps={{ 'data-id': 'foo' }} label='foo' />);
        const node = element.refs.label;

        expect(node.getAttribute('data-id')).toBe('foo');
    });

    it('accepts a string label', () => {
        const element = render(<Checkbox {...props} label='foo' />);

        expect(element.refs.label.textContent).toBe('foo');
    });

    it('accepts an element label', () => {
        const element = render(<Checkbox {...props} label={<p>foo</p>} />);

        expect(element.refs.label.textContent).toBe('foo');
    });

    it('renders .b-checkbox-wrapper', () => {
        const element = render(<Checkbox {...props} />);

        expect(element.refs.wrapper.classList.contains('b-checkbox-wrapper')).toBe(true);
    });

    it('renders .b-checkbox-label', () => {
        const element = render(<Checkbox {...props} label='foo' />);

        expect(element.refs.label.classList.contains('b-checkbox-label')).toBe(true);
    });

    it('renders .b-checkbox', () => {
        const element = render(<Checkbox {...props} />);

        expect(element.refs.input.classList.contains('b-checkbox')).toBe(true);
    });

    it('renders .b-checkbox-checked when the checkbox value is truthy', () => {
        const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, checked: true }} />);

        expect(element.refs.input.classList.contains('b-checkbox-checked')).toBe(true);
    });

    it('renders .b-checkbox-unchecked when the checkbox value is falsy', () => {
        const element = render(<Checkbox {...props} />);

        expect(element.refs.input.classList.contains('b-checkbox-unchecked')).toBe(true);
    });

    it('renders .b-checkbox-mixed when the checkbox is indeterminate', () => {
        const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, checked: true, indeterminate: true }} />);

        expect(element.refs.input.classList.contains('b-checkbox-mixed')).toBe(true);
    });

    it('associates a provided label with the underlying input', () => {
        const element = render(<Checkbox {...props} label='foo' />);

        expect(element.refs.label.htmlFor).not.toBe('');
        expect(element.refs.label.htmlFor).toEqual(element.refs.input.id);
    });

    describe('checkbox state change', () => {
        it('triggers onChecked when the checkbox value becomes truthy', () => {
            const stub = sandbox.stub();
            const element = render(<Checkbox {...props} onChecked={stub} />);

            element.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers onUnchecked when the checkbox value becomes falsy', () => {
            const stub = sandbox.stub();
            const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, checked: true }} onUnchecked={stub} />);

            element.handleChange();

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('clicking on the wrapper', () => {
        it('moves focus to the input', () => {
            const element = render(<Checkbox {...props} />);

            expect(document.activeElement).not.toBe(element.refs.input);

            element.handleClick({});
            expect(document.activeElement).toBe(element.refs.input);
        }); // patching a browser inconsistency between webkit & gecko

        it('does nothing if the input is disabled', () => {
            const stub = sandbox.stub();

            render(<Checkbox {...props} inputProps={{ ...props.inputProps, disabled: true }} onClick={stub} />);
            expect(stub.called).toBe(false);
        });
    });

    describe('indeterminate state', () => {
        it('is programmatically set on the underlying input', () => {
            const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, indeterminate: true }} />);

            expect(element.refs.input.indeterminate).toBe(true);
        });

        it('is kept in sync when the prop changes', () => {
            let element;

            element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, indeterminate: false }} />);
            expect(element.refs.input.indeterminate).toBeFalsy();

            element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, indeterminate: true }} />);
            expect(element.refs.input.indeterminate).toBeTruthy();
        });
    });

    describe('proxied events', () => {
        it('forwards input change events if `props.inputProps.onChange` is provided', () => {
            const stub = sandbox.stub();
            const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, onChange: stub }} />);

            element.handleChange({ checked: true });

            expect(stub.calledOnce).toBe(true);
        });

        it('does not forward input change events if the input is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, onChange: stub, disabled: true }} />);

            element.handleChange({ checked: true });

            expect(stub.called).toBe(false);
        });

        it('forwards input click events if `props.inputProps.onClick` is provided', () => {
            const stub = sandbox.stub();
            const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, onClick: stub }} />);

            element.handleClick({});

            expect(stub.calledOnce).toBe(true);
        });

        it('does not forward input click events if the input is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<Checkbox {...props} inputProps={{ ...props.inputProps, onClick: stub, disabled: true }} />);

            element.handleClick({});

            expect(stub.called).toBe(false);
        });
    });
});
