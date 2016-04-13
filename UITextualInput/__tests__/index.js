/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UITextualInput from '../../UITextualInput';
import conformance_checker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

describe('UITextualInput', () => {
    const mount_node = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mount_node);

    const base_props = {name: 'foo'};

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mount_node);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformance_checker(render, UITextualInput, base_props));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputProps', () => {
            const element = render(<UITextualInput {...base_props} inputProps={{'data-id': 'foo'}} />);

            expect(element.refs.field.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.inputProps.className', () => {
            const element = render(<UITextualInput {...base_props} inputProps={{className: 'foo'}} />);

            expect(element.refs.field.classList.contains('foo')).toBe(true);
        });
    });

    describe('CSS hook', () => {
        const has_class = (dom, name) => dom.classList.contains(name);

        it('ui-textual-input-wrapper should be rendered', () => {
            const element = render(<UITextualInput {...base_props} />);

            expect(has_class(element.refs.wrapper, 'ui-textual-input-wrapper')).toBe(true);
        });

        it('ui-textual-input should be rendered', () => {
            const element = render(<UITextualInput {...base_props} />);

            expect(has_class(element.refs.field, 'ui-textual-input')).toBe(true);
        });
    });

    it('should render the placeholder facsimile', () => {
        const element = render(<UITextualInput {...base_props} />);

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.classList.contains('ui-textual-input-placeholder')).toBe(true);
    });

    it('should use the proper placeholder text (via props.placeholder)', () => {
        const element = render(<UITextualInput {...base_props} placeholder='foo' />);

        expect(element.refs.placeholder.textContent).toBe('foo');
    });

    it('should use the proper placeholder text (via props.inputProps.placeholder)', () => {
        const element = render(<UITextualInput {...base_props} inputProps={{placeholder: 'foo'}} />);

        expect(element.refs.placeholder.textContent).toBe('foo');
    });

    it('should honor props.inputProps.placeholder over props.placeholder', () => {
        const element = render(<UITextualInput {...base_props} placeholder='foo' inputProps={{placeholder: 'bar'}} />);

        expect(element.refs.placeholder.textContent).toBe('bar');
    });

    it('should empty the placeholder on input focus if `props.hidePlaceholderOnFocus` is true', () => {
        const element = render(<UITextualInput {...base_props} hidePlaceholderOnFocus={true} placeholder='foo' />);

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.textContent).toBe('foo');

        element.handle_focus();

        expect(element.refs.placeholder.textContent).toBe('');
    });

    it('should fill in the placeholder on input blur if the the input is empty and `props.hidePlaceholderOnFocus` is true', () => {
        const element = render(<UITextualInput {...base_props} hidePlaceholderOnFocus={true} placeholder='foo' />);

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.textContent).toBe('foo');

        element.handle_focus();
        expect(element.refs.placeholder.textContent).toBe('');

        element.handle_blur();
        expect(element.refs.placeholder.textContent).toBe('foo');
    });

    describe('controlled mode', () => {
        // ignore React dev-time warning about not supplying props.onChange
        beforeEach(() => sandbox.stub(console, 'error'));

        it('should cause the placeholder to be filled in when the input is empty', () => {
            const element = render(<UITextualInput {...base_props} placeholder='foo' value='' />);

            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('should cause the placeholder to be empty when the input is non-empty', () => {
            const element = render(<UITextualInput {...base_props} placeholder='foo' value='x' />);

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('should properly manage placeholder visibility across many `props.value` changes', () => {
            let element;

            element = render(<UITextualInput {...base_props} placeholder='foo' value='x' />);
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(<UITextualInput {...base_props} placeholder='foo' value='' />);
            expect(element.refs.placeholder.textContent).toBe('foo');

            element = render(<UITextualInput {...base_props} placeholder='foo' value='x' />);
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(<UITextualInput {...base_props} placeholder='foo' value='xy' />);
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(<UITextualInput {...base_props} placeholder='foo' value='' />);
            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('should prevent a setState upon an input event', () => {
            const element = render(<UITextualInput {...base_props} placeholder='foo' value='x' />);

            sandbox.stub(element, 'setState');

            element.handle_input({target: {value: 'x'}});
            expect(element.setState.notCalled).toBe(true);
        });
    });

    describe('uncontrolled mode', () => {
        it('should cause the placeholder to be filled in when the input is empty', () => {
            const element = render(<UITextualInput {...base_props} placeholder='foo' />);

            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('should cause the placeholder to be empty when the input is non-empty', () => {
            const element = render(<UITextualInput {...base_props} placeholder='foo' />);

            element.handle_input({target: {value: 'x'}});

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('should properly manage placeholder visibility across many input changes', () => {
            const element = render(<UITextualInput {...base_props} placeholder='foo' />);

            expect(element.refs.placeholder.textContent).toBe('foo');

            element.handle_input({target: {value: 'x'}});
            expect(element.refs.placeholder.textContent).toBe('');

            element.handle_input({target: {value: 'xy'}});
            expect(element.refs.placeholder.textContent).toBe('');

            element.handle_input({target: {value: ''}});
            expect(element.refs.placeholder.textContent).toBe('foo');
        });
    });

    it('should proxy input events to `props.inputProps.onBlur` if provided', () => {
        const stub = sandbox.stub();
        const element = render(<UITextualInput {...base_props} inputProps={{onBlur: stub}} />);
        const faux_event = {persist: noop};

        element.handle_blur(faux_event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(faux_event)).toBe(true);
    });

    it('should proxy input events to `props.inputProps.onFocus` if provided', () => {
        const stub = sandbox.stub();
        const element = render(<UITextualInput {...base_props} inputProps={{onFocus: stub}} />);
        const faux_event = {persist: noop};

        element.handle_focus(faux_event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(faux_event)).toBe(true);
    });

    it('should proxy input events to `props.inputProps.onInput` if provided', () => {
        const stub = sandbox.stub();
        const element = render(<UITextualInput {...base_props} inputProps={{onInput: stub}} />);
        const faux_event = {persist: noop, target: {value: 'x'}};

        element.handle_input(faux_event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(faux_event)).toBe(true);
    });
});
