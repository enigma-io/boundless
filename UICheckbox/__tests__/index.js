/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UICheckbox from '../../UICheckbox';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

describe('UICheckbox', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const props = {
        inputProps: {
            checked: false,
            name: 'foo',
            value: 'bar',
        }
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UICheckbox, props));

    it('defaults to being unchecked', () => {
        const element = render(<UICheckbox {...props} />);
        const node = element.refs.input;

        expect(node.getAttribute('aria-checked')).toBe('false');
        expect(node.hasAttribute('checked')).toBe(false);
    });

    it('accepts arbitrary React-supported HTML attributes via the `inputProps` prop', () => {
        const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, 'data-id': 'foo'}} />);
        const node = element.refs.input;

        expect(node.getAttribute('data-id')).toBe('foo');
    });

    it('accepts arbitrary React-supported HTML attributes via the `labelProps` prop', () => {
        const element = render(<UICheckbox {...props} labelProps={{'data-id': 'foo'}} label='foo' />);
        const node = element.refs.label;

        expect(node.getAttribute('data-id')).toBe('foo');
    });

    it('accepts a string label', () => {
        const element = render(<UICheckbox {...props} label='foo' />);

        expect(element.refs.label.textContent).toBe('foo');
    });

    it('accepts an element label', () => {
        const element = render(<UICheckbox {...props} label={<p>foo</p>} />);

        expect(element.refs.label.textContent).toBe('foo');
    });

    it('renders .ui-checkbox-wrapper', () => {
        const element = render(<UICheckbox {...props} />);

        expect(element.refs.wrapper.classList.contains('ui-checkbox-wrapper')).toBe(true);
    });

    it('renders .ui-checkbox-label', () => {
        const element = render(<UICheckbox {...props} label='foo' />);

        expect(element.refs.label.classList.contains('ui-checkbox-label')).toBe(true);
    });

    it('renders .ui-checkbox', () => {
        const element = render(<UICheckbox {...props} />);

        expect(element.refs.input.classList.contains('ui-checkbox')).toBe(true);
    });

    it('renders .ui-checkbox-checked when the checkbox value is truthy', () => {
        const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, checked: true}} />);

        expect(element.refs.input.classList.contains('ui-checkbox-checked')).toBe(true);
    });

    it('renders .ui-checkbox-unchecked when the checkbox value is falsy', () => {
        const element = render(<UICheckbox {...props} />);

        expect(element.refs.input.classList.contains('ui-checkbox-unchecked')).toBe(true);
    });

    it('renders .ui-checkbox-mixed when the checkbox is indeterminate', () => {
        const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, checked: true, indeterminate: true}} />);

        expect(element.refs.input.classList.contains('ui-checkbox-mixed')).toBe(true);
    });

    it('associates a provided label with the underlying input', () => {
        const element = render(<UICheckbox {...props} label='foo' />);

        expect(element.refs.label.htmlFor).not.toBe('');
        expect(element.refs.label.htmlFor).toEqual(element.refs.input.id);
    });

    describe('checkbox state change', () => {
        it('triggers onChecked when the checkbox value becomes truthy', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...props} onChecked={stub} />);

            element.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers onUnchecked when the checkbox value becomes falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, checked: true}} onUnchecked={stub} />);

            element.handleChange();

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('clicking on the wrapper', () => {
        it('moves focus to the input', () => {
            const element = render(<UICheckbox {...props} />);

            expect(document.activeElement).not.toBe(element.refs.input);

            element.handleClick({persist: noop});
            expect(document.activeElement).toBe(element.refs.input);
        }); // patching a browser inconsistency between webkit & gecko

        it('does nothing if the input is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, disabled: true}} onClick={stub} />);

            expect(stub.called).toBe(false);
        });
    });

    describe('indeterminate state', () => {
        it('is programmatically set on the underlying input', () => {
            const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, indeterminate: true}} />);

            expect(element.refs.input.indeterminate).toBe(true);
        });

        it('is kept in sync when the prop changes', () => {
            let element;

            element = render(<UICheckbox {...props} inputProps={{...props.inputProps, indeterminate: false}} />);
            expect(element.refs.input.indeterminate).toBeFalsy();

            element = render(<UICheckbox {...props} inputProps={{...props.inputProps, indeterminate: true}} />);
            expect(element.refs.input.indeterminate).toBeTruthy();
        });
    });

    describe('proxied events', () => {
        it('forwards input change events if `props.inputProps.onChange` is provided', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, onChange: stub}} />);

            element.handleChange({persist: noop, checked: true});

            expect(stub.calledOnce).toBe(true);
        });

        it('does not forward input change events if the input is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, onChange: stub, disabled: true}} />);

            element.handleChange({persist: noop, checked: true});

            expect(stub.called).toBe(false);
        });

        it('forwards input click events if `props.inputProps.onClick` is provided', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, onClick: stub}} />);

            element.handleClick({persist: noop});

            expect(stub.calledOnce).toBe(true);
        });

        it('does not forward input click events if the input is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...props} inputProps={{...props.inputProps, onClick: stub, disabled: true}} />);

            element.handleClick({persist: noop});

            expect(stub.called).toBe(false);
        });
    });
});
