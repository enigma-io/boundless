/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UICheckbox from '../../UICheckbox';
import conformanceChecker from '../../UIUtils/conform';

import sinon from 'sinon';

describe('UICheckbox', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const baseProps = {
        name: 'foo',
        value: 'bar'
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UICheckbox, baseProps));

    it('defaults to being unchecked', () => {
        const element = render(<UICheckbox {...baseProps} />);
        const node = element.refs.input;

        expect(node.getAttribute('aria-checked')).toBe('false');
        expect(node.hasAttribute('checked')).toBe(false);
    });

    describe('passes through', () => {
        it('props.name to the input node', () => {
            const element = render(<UICheckbox {...baseProps} />);
            const node = element.refs.input;

            expect(node.getAttribute('name')).toBe('foo');
        });

        it('props.value to the input node', () => {
            const element = render(<UICheckbox {...baseProps} />);
            const node = element.refs.input;

            expect(node.value).toBe('bar');
        });
    });

    describe('accepts', () => {
        it('arbitrary React-supported HTML attributes via the `inputProps` prop', () => {
            const element = render(<UICheckbox {...baseProps} inputProps={{'data-id': 'foo'}} />);
            const node = element.refs.input;

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('arbitrary React-supported HTML attributes via the `labelProps` prop', () => {
            const element = render(<UICheckbox {...baseProps} labelProps={{'data-id': 'foo'}} label='foo' />);
            const node = element.refs.label;

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('a truthy value', () => {
            const element = render(<UICheckbox {...baseProps} checked={true} />);
            const node = element.refs.input;

            expect(node.getAttribute('aria-checked')).toBe('true');
            expect(node.hasAttribute('checked')).toBe(true);
        });

        it('a falsy value', () => {
            const element = render(<UICheckbox {...baseProps} checked={false} />);
            const node = element.refs.input;

            expect(node.getAttribute('aria-checked')).toBe('false');
            expect(node.hasAttribute('checked')).toBe(false);
        });

        it('a string label', () => {
            const element = render(<UICheckbox {...baseProps} label='foo' />);

            expect(element.refs.label.textContent).toBe('foo');
        });

        it('an element label', () => {
            const element = render(<UICheckbox {...baseProps} label={<p>foo</p>} />);

            expect(element.refs.label.textContent).toBe('foo');
        });
    });

    describe('prop', () => {
        it('`checked` should be applied to the input node', () => {
             const element = render(<UICheckbox {...baseProps} checked={true} />);

             expect(element.refs.input.checked).toBe(true);
        });

        it('`name` should be applied to the input node', () => {
             const element = render(<UICheckbox {...baseProps} />);

             expect(element.refs.input.hasAttribute('name')).toBe(true);
             expect(element.refs.input.getAttribute('name')).toBe('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-checkbox-wrapper should be rendered', () => {
            const element = render(<UICheckbox {...baseProps} />);

            expect(element.refs.wrapper.classList.contains('ui-checkbox-wrapper')).toBe(true);
        });

        it('ui-checkbox-label should be rendered', () => {
            const element = render(<UICheckbox {...baseProps} label='foo' />);

            expect(element.refs.label.classList.contains('ui-checkbox-label')).toBe(true);
        });

        it('ui-checkbox should be rendered', () => {
            const element = render(<UICheckbox {...baseProps} />);

            expect(element.refs.input.classList.contains('ui-checkbox')).toBe(true);
        });

        it('ui-checkbox-checked should be rendered when the checkbox value is truthy', () => {
            const element = render(<UICheckbox {...baseProps} checked={true} />);

            expect(element.refs.input.classList.contains('ui-checkbox-checked')).toBe(true);
        });

        it('ui-checkbox-unchecked should be rendered when the checkbox value is falsy', () => {
            const element = render(<UICheckbox {...baseProps} />);

            expect(element.refs.input.classList.contains('ui-checkbox-unchecked')).toBe(true);
        });

        it('ui-checkbox-mixed should be rendered when the checkbox is indeterminate', () => {
            const element = render(<UICheckbox {...baseProps} checked={true} indeterminate={true} />);

            expect(element.refs.input.classList.contains('ui-checkbox-mixed')).toBe(true);
        });
    });

    describe('calls the appropriate handler', () => {
        it('when the checkbox value becomes truthy', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...baseProps} onChecked={stub} />);

            element.handleChange();

            expect(stub.calledOnce).toBe(true);
        });

        it('when the checkbox value becomes falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...baseProps} checked={true} onUnchecked={stub} />);

            element.handleChange();

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('click event', () => {
        it('should be proxied if `props.onClick` is provided', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...baseProps} onClick={stub} />);

            element.refs.input.click();

            expect(stub.calledOnce).toBe(true);
        });

        it('should move focus to the input', () => {
            const element = render(<UICheckbox {...baseProps} />);

            expect(document.activeElement).not.toBe(element.refs.input);

            element.refs.input.click();

            expect(document.activeElement).toBe(element.refs.input);
        }); // patching a browser inconsistency between webkit & gecko
    });

    /*
        Needs this issue to be resolved in JSDOM to work:
        https://github.com/tmpvar/jsdom/issues/1079#issuecomment-159754855
     */
    xdescribe('clicking on the label', () => {
        it('should toggle the checkbox state', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...baseProps} label='test' onChecked={stub} />);

            element.refs.label.click();

            expect(stub.calledOnce).toBe(true);
        });
    });
});
